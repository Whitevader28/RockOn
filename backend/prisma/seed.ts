import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'rocks_data.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  let rocks = JSON.parse(rawData);

  // THE FIX: Cap the age at 2 billion so it fits inside PostgreSQL's INT4 limit
  rocks = rocks.map((rock: any) => ({
    ...rock,
    age: Math.min(rock.age, 2000000000)
  }));

  console.log('Clearing existing rocks...');
  await prisma.rock.deleteMany({});

  console.log(`Seeding ${rocks.length} rocks...`);
  
  await prisma.rock.createMany({
    data: rocks,
    skipDuplicates: true,
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });