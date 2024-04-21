import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import users from '../data/users.json';

const prisma = new PrismaClient();
const saltRounds = 10;

async function seedUsers() {
  for (const user of users) {
    bcrypt.hash(user.password, saltRounds, async (err, hash) => {
      await prisma.user.create({
        data: {
          ...user,
          password: hash,
        },
      });
    })
  }
}

async function main() {
  await seedUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
