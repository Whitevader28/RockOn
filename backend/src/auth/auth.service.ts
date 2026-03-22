import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedigree, Trait, Vibe } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private static readonly MIN_ROCK_AGE = 1_000_000;
  private static readonly MAX_ROCK_AGE = 2_000_000_000;

  private pickRandom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
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

    const updatedRock = await this.prisma.rock.update({
      where: { uniqueName: createAuthDto.uniqueName },
      data: {
        isRegistered: rock.isRegistered ? rock.isRegistered : true,
        description: rock.isRegistered
          ? rock.description
          : rock.description ?? 'Newly registered rock.',
        age: rock.isRegistered ? rock.age : rock.age > 0 ? rock.age : this.randomRockAge(),
        lastActiveAt: new Date(),
      },
    });

    return {
      message: 'Rock logged in successfully',
      firstRegistrationCompleted: !rock.isRegistered,
      rock: updatedRock,
    };
  }

  profileInfo() {
    return { message: 'This is the profile information.' };
  }
}
