import { authOptions } from './src/lib/auth/auth'; 
import { z } from 'zod';
import { prisma } from './src/lib/db/prisma';

async function test() { 
  try {
    const provider = authOptions.providers[0] as any;
    console.log('Provider authorize exists:', !!provider.authorize);
    const result = await provider.authorize({ email: 'admin@nanohelp.demo', password: 'demo123' }, null);
    console.log('Final result:', result);
  } catch(e) {
    console.error('Error:', e);
  } finally {
    console.log('Done');
    process.exit(0);
  }
} 
test();
