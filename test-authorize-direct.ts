import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function test() { 
  const email = 'admin@nanohelp.demo';
  const password = 'demo123';
  
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
      isActive: true,
      passwordHash: true,
    },
  });
  
  console.log("User:", !!user);
  if (!user) return;
  console.log("Active:", user.isActive);
  
  const isValid = await bcrypt.compare(password, user.passwordHash as string);
  console.log("Valid:", isValid);
} 

test().finally(() => prisma.$disconnect());
