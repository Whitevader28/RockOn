import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Pedigree, Trait, Vibe } from '@prisma/client';
import { randomUUID } from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import streamifier from 'streamifier';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private static readonly MIN_ROCK_AGE = 1_000_000;
  private static readonly MAX_ROCK_AGE = 2_000_000_000;

  private pickRandom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private configureCloudinary() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new InternalServerErrorException(
        'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  private uploadBufferToCloudinary(buffer: Buffer, publicId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'rockon/profile-pictures',
          public_id: publicId,
          overwrite: true,
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            reject(
              new InternalServerErrorException(
                error?.message || 'Cloudinary upload failed',
              ),
            );
            return;
          }

          resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  private randomRockAge(): number {
    const { MIN_ROCK_AGE, MAX_ROCK_AGE } = AuthService;
    return Math.floor(Math.random() * (MAX_ROCK_AGE - MIN_ROCK_AGE + 1)) + MIN_ROCK_AGE;
  }

  private pickRandomTraits(): Trait[] {
    const allTraits = Object.values(Trait);
    const count = Math.floor(Math.random() * 3) + 1;
    const selected = new Set<Trait>();

    while (selected.size < count) {
      selected.add(this.pickRandom(allTraits));
    }

    return [...selected];
  }

  async registerRock() {
    const uniqueName = randomUUID();

    const rock = await this.prisma.rock.create({
      data: {
        uniqueName,
        name: `Rock-${uniqueName.slice(0, 8)}`,
        age: this.randomRockAge(),
        pedigree: this.pickRandom(Object.values(Pedigree)),
        vibe: this.pickRandom(Object.values(Vibe)),
        traits: this.pickRandomTraits(),
        isRegistered: false,
      },
    });

    return {
      message: 'Rock created successfully',
      rock,
    };
  }

  async authenticate(createAuthDto: CreateAuthDto) {
    const rock = await this.prisma.rock.findUnique({
      where: { uniqueName: createAuthDto.uniqueName },
    });

    if (!rock) {
      throw new NotFoundException('Rock not found');
    }

    const newAccessToken = randomUUID();

    const updatedRock = await this.prisma.rock.update({
      where: { uniqueName: createAuthDto.uniqueName },
      data: {
        isRegistered: rock.isRegistered ? rock.isRegistered : true,
        description: rock.isRegistered
          ? rock.description
          : rock.description ?? 'Newly registered rock.',
        age: rock.isRegistered ? rock.age : rock.age > 0 ? rock.age : this.randomRockAge(),
        lastActiveAt: new Date(),
        accessToken: newAccessToken,
      },
    });

    return {
      message: 'Rock logged in successfully',
      firstRegistrationCompleted: !rock.isRegistered,
      accessToken: newAccessToken,
      rock: updatedRock,
    };
  }

  async validateToken(validateTokenDto: ValidateTokenDto) {
    const rock = await this.prisma.rock.findUnique({
      where: { uniqueName: validateTokenDto.uniqueName },
      select: {
        id: true,
        uniqueName: true,
        accessToken: true,
        isRegistered: true,
      },
    });

    if (!rock) {
      throw new NotFoundException('Rock not found');
    }

    if (!rock.accessToken || rock.accessToken !== validateTokenDto.accessToken) {
      throw new UnauthorizedException(
        'Token expired or invalid. Re-enter UUID to login again.',
      );
    }

    return {
      valid: true,
      message: 'Token is valid',
      rock,
    };
  }

  async getRockProfile(rockId: string) {
    const rock = await this.prisma.rock.findUnique({
      where: { uniqueName: rockId },
    });

    if (!rock) {
      throw new NotFoundException('Rock not found');
    }

    return {
      message: 'Rock profile fetched successfully',
      rock,
    };
  }

  async uploadProfilePicture(rockId: string, file: any) {
    if (!file?.buffer) {
      throw new BadRequestException('Image file is required');
    }

    const rock = await this.prisma.rock.findUnique({
      where: { id: rockId },
      select: {
        id: true,
        uniqueName: true,
      },
    });

    if (!rock) {
      throw new NotFoundException('Rock not found');
    }

    this.configureCloudinary();

    // Compress and normalize upload payload before sending to Cloudinary.
    const compressedImage = await sharp(file.buffer)
      .rotate()
      .resize({
        width: 1024,
        height: 1024,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 72, mozjpeg: true })
      .toBuffer();

    const publicId = `${rock.uniqueName}-${Date.now()}`;
    const uploadedUrl = await this.uploadBufferToCloudinary(compressedImage, publicId);

    const updatedRock = await this.prisma.rock.update({
      where: { id: rock.id },
      data: {
        profilePictureUrl: uploadedUrl,
      },
    });

    return {
      message: 'Profile picture uploaded successfully',
      profilePictureUrl: updatedRock.profilePictureUrl,
      rock: updatedRock,
    };
  }

  profileInfo() {
    return { message: 'This is the profile information.' };
  }
}
