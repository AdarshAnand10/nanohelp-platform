import { prisma } from './src/lib/db/prisma';

async function test() { 
  const email = 'admin@nanohelp.demo';
  const user = await prisma.user.findUnique({
    where: { email },
  });
  console.log("User:", !!user);
} 

test().finally();
