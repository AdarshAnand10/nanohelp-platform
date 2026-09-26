import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('demo123', 10);

  // Idempotent upsert for Admin
  await prisma.user.upsert({
    where: { email: 'admin@nanohelp.demo' },
    update: { passwordHash, role: Role.SUPER_ADMIN },
    create: {
      email: 'admin@nanohelp.demo',
      name: 'Admin User',
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  // Idempotent upsert for User
  await prisma.user.upsert({
    where: { email: 'user@nanohelp.demo' },
    update: { passwordHash, role: Role.USER },
    create: {
      email: 'user@nanohelp.demo',
      name: 'Demo User',
      passwordHash,
      role: Role.USER,
    },
  });

  console.log('Successfully seeded/updated demo users with correct passwords.');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
