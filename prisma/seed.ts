import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting idempotent seed...');

  // Create or update a dummy organization
  const org = await prisma.institution.upsert({
    where: { name: 'NanoTech Global Institute' },
    update: {},
    create: {
      name: 'NanoTech Global Institute',
      slug: 'nanotech-global-institute',
      type: 'RESEARCH_INSTITUTE',
      description: 'A leading demo institution for nanotechnology.',
    },
  });

  const company = await prisma.company.upsert({
    where: { name: 'NanoCorp Technologies' },
    update: {},
    create: {
      name: 'NanoCorp Technologies',
      slug: 'nanocorp-tech',
      description: 'Enterprise company specializing in nanomaterials.',
      type: 'large_corp',
    },
  });

  // Create demo researcher
  const researcher = await prisma.researcher.upsert({
    where: { slug: 'alan-smith' },
    update: {},
    create: {
      name: 'Alan Smith',
      slug: 'alan-smith',
      email: 'dr.smith@nano-demo.org',
      title: 'Senior Principal Investigator',
      bio: 'Expert in 2D materials.',
      institutionId: org.id,
    },
  });

  // Create demo research category
  const category = await prisma.researchCategory.upsert({
    where: { name: '2D Materials' },
    update: {},
    create: {
      name: '2D Materials',
      slug: '2d-materials',
      description: 'Graphene, MXenes, and other 2D structures.',
    },
  });

  // Create demo research
  await prisma.research.upsert({
    where: { doi: '10.demo/nano.2026.001' },
    update: {},
    create: {
      title: 'Novel Applications of 2D Materials in Flexible Electronics',
      slug: 'novel-applications-2d-materials-flexible-electronics',
      abstract: 'This paper demonstrates the usage of 2D materials for advanced flexible displays and sensors.',
      doi: '10.demo/nano.2026.001',
      publishedAt: new Date('2026-01-15'),
      publicationYear: 2026,
      documentType: 'RESEARCH_ARTICLE',
      status: 'PUBLISHED',
      categoryId: category.id,
      institutionId: org.id,
    },
  });

  const existingJob = await prisma.jobOpportunity.findFirst({ where: { title: 'Postdoctoral Researcher in Nanophotonics' }});
  if (!existingJob) {
    await prisma.jobOpportunity.create({
      data: {
        title: 'Postdoctoral Researcher in Nanophotonics',
        slug: 'postdoctoral-researcher-in-nanophotonics',
        description: 'Join our team to work on advanced nanophotonics applications.',
        opportunityType: 'FULL_TIME',
        careerLevel: 'EARLY_CAREER',
        location: 'Boston, MA',
        deadline: new Date('2026-12-31'),
        status: 'PUBLISHED',
        companyId: company.id,
      }
    });
  }

  // Funding
  const fundingOrg = await prisma.fundingOrganization.upsert({
    where: { name: 'European Nano Foundation' },
    update: {},
    create: {
      name: 'European Nano Foundation',
      slug: 'european-nano-foundation',
      description: 'A major government funding body for nanotechnology.',
    },
  });

  const existingFunding = await prisma.fundingOpportunity.findFirst({ where: { title: 'Horizon Nano 2026' }});
  if (!existingFunding) {
    await prisma.fundingOpportunity.create({
      data: {
        title: 'Horizon Nano 2026',
        slug: 'horizon-nano-2026',
        description: 'Major funding for scalable nanotechnology.',
        amountMin: 50000,
        amountMax: 2000000,
        amountCurrency: 'EUR',
        deadline: new Date('2026-11-01'),
        status: 'PUBLISHED',
        organizationId: fundingOrg.id,
      }
    });
  }

  // Create DEMO Users
  const bcrypt = require('bcryptjs');
  const passwordHash = await bcrypt.hash('demo123', 10);

  await prisma.user.upsert({
    where: { email: 'user@nanohelp.demo' },
    update: {},
    create: {
      email: 'user@nanohelp.demo',
      name: 'Demo User',
      passwordHash,
      role: 'USER',
      isActive: true,
    }
  });

  await prisma.user.upsert({
    where: { email: 'admin@nanohelp.demo' },
    update: {},
    create: {
      email: 'admin@nanohelp.demo',
      name: 'Demo Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
      isActive: true,
    }
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
