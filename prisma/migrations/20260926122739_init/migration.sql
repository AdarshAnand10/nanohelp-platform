-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MODERATOR', 'EDITOR', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'UPCOMING', 'ACTIVE', 'EXPIRED', 'ARCHIVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('RESEARCH_ARTICLE', 'REVIEW', 'PREPRINT', 'PATENT', 'DATASET', 'PROJECT', 'BOOK_CHAPTER', 'CONFERENCE_PAPER', 'THESIS');

-- CreateEnum
CREATE TYPE "OpportunityType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'PHD', 'POSTDOC', 'ACADEMIC', 'INDUSTRY');

-- CreateEnum
CREATE TYPE "CareerLevel" AS ENUM ('STUDENT', 'EARLY_CAREER', 'MID_CAREER', 'SENIOR', 'PROFESSOR', 'DIRECTOR');

-- CreateEnum
CREATE TYPE "FundingType" AS ENUM ('RESEARCH_GRANT', 'FELLOWSHIP', 'PHD_FUNDING', 'STARTUP_GRANT', 'INNOVATION_GRANT', 'MOBILITY_GRANT', 'INDUSTRY_FUNDING', 'EU_FUNDING', 'NATIONAL_FUNDING');

-- CreateEnum
CREATE TYPE "ApplicantType" AS ENUM ('RESEARCHER', 'PHD_STUDENT', 'POSTDOC', 'UNIVERSITY', 'COMPANY_SME', 'STARTUP', 'INSTITUTION', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH', 'ARCHIVE', 'RESTORE', 'EXPIRE', 'CANCEL', 'LOGIN', 'LOGOUT', 'APPROVE', 'REJECT', 'ROLE_CHANGE', 'DELETE_USER', 'SYSTEM_ACTION');

-- CreateEnum
CREATE TYPE "EmploymentMode" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "passwordHash" TEXT,
    "name" TEXT,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT,
    "country" TEXT,
    "city" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "description" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "researchers" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "title" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "country" TEXT,
    "city" TEXT,
    "researchAreas" TEXT[],
    "hIndex" INTEGER,
    "totalCitations" INTEGER,
    "publicationCount" INTEGER,
    "orcidId" TEXT,
    "isSpotlighted" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "institutionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "researchers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "iconName" TEXT,
    "color" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "research_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_materials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "research_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_material_mappings" (
    "id" TEXT NOT NULL,
    "researchId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,

    CONSTRAINT "research_material_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_applications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "research_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_application_mappings" (
    "id" TEXT NOT NULL,
    "researchId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "research_application_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publisher" TEXT,
    "issn" TEXT,
    "impactFactor" DOUBLE PRECISION,
    "url" TEXT,

    CONSTRAINT "journals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT,
    "keywords" TEXT,
    "documentType" "DocumentType" NOT NULL DEFAULT 'RESEARCH_ARTICLE',
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "publicationYear" INTEGER,
    "doi" TEXT,
    "url" TEXT,
    "thumbnailUrl" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "citations" INTEGER NOT NULL DEFAULT 0,
    "bookmarkCount" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT,
    "institutionId" TEXT,
    "journalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "research_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_authors" (
    "id" TEXT NOT NULL,
    "researchId" TEXT NOT NULL,
    "researcherId" TEXT,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT,
    "affiliation" TEXT,
    "isCorresponding" BOOLEAN NOT NULL DEFAULT false,
    "authorOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "research_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_tags" (
    "id" TEXT NOT NULL,
    "researchId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "research_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "country" TEXT,
    "city" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "type" TEXT,
    "foundedYear" INTEGER,
    "employeeCount" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "iconName" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "career_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_fields" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "parentId" TEXT,

    CONSTRAINT "research_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_opportunities" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "requirements" TEXT,
    "opportunityType" "OpportunityType" NOT NULL DEFAULT 'FULL_TIME',
    "employmentMode" "EmploymentMode" NOT NULL DEFAULT 'ONSITE',
    "careerLevel" "CareerLevel",
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "location" TEXT,
    "country" TEXT,
    "city" TEXT,
    "salaryMin" DOUBLE PRECISION,
    "salaryMax" DOUBLE PRECISION,
    "salaryCurrency" TEXT DEFAULT 'EUR',
    "applicationUrl" TEXT,
    "applicationEmail" TEXT,
    "deadline" TIMESTAMP(3),
    "postedAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "views" INTEGER NOT NULL DEFAULT 0,
    "bookmarkCount" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "companyId" TEXT,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "job_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_tags" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "job_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_research_fields" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "researchFieldId" TEXT NOT NULL,

    CONSTRAINT "job_research_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "region" TEXT,
    "flagUrl" TEXT,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_countries" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "company_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "acronym" TEXT,
    "region" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "description" TEXT,
    "countryId" TEXT,

    CONSTRAINT "funding_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "iconName" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "funding_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_opportunities" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "eligibility" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "fundingType" "FundingType" NOT NULL DEFAULT 'RESEARCH_GRANT',
    "amountMin" DOUBLE PRECISION,
    "amountMax" DOUBLE PRECISION,
    "amountCurrency" TEXT DEFAULT 'EUR',
    "region" TEXT,
    "applicationUrl" TEXT,
    "deadline" TIMESTAMP(3),
    "openDate" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "views" INTEGER NOT NULL DEFAULT 0,
    "bookmarkCount" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "organizationId" TEXT,
    "categoryId" TEXT,
    "countryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "funding_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_applicant_types" (
    "id" TEXT NOT NULL,
    "fundingId" TEXT NOT NULL,
    "applicantType" "ApplicantType" NOT NULL,

    CONSTRAINT "funding_applicant_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_research_fields" (
    "id" TEXT NOT NULL,
    "fundingId" TEXT NOT NULL,
    "researchFieldId" TEXT NOT NULL,

    CONSTRAINT "funding_research_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_tags" (
    "id" TEXT NOT NULL,
    "fundingId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "funding_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laboratories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "country" TEXT,
    "city" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "researchAreas" TEXT[],
    "equipment" TEXT[],
    "capabilities" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "institutionId" TEXT,

    CONSTRAINT "laboratories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technologies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "maturityLevel" TEXT,
    "applications" TEXT[],
    "relatedFields" TEXT[],
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conferences" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "acronym" TEXT,
    "country" TEXT,
    "city" TEXT,
    "venue" TEXT,
    "website" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "submissionDeadline" TIMESTAMP(3),
    "registrationUrl" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "isUpcoming" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "conferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conference_tags" (
    "id" TEXT NOT NULL,
    "conferenceId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "conference_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_bookmarks" (
    "userId" TEXT NOT NULL,
    "researchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "research_bookmarks_pkey" PRIMARY KEY ("userId","researchId")
);

-- CreateTable
CREATE TABLE "job_bookmarks" (
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_bookmarks_pkey" PRIMARY KEY ("userId","jobId")
);

-- CreateTable
CREATE TABLE "funding_bookmarks" (
    "userId" TEXT NOT NULL,
    "fundingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "funding_bookmarks_pkey" PRIMARY KEY ("userId","fundingId")
);

-- CreateTable
CREATE TABLE "saved_searches" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "filters" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_searches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_alerts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "researchFields" TEXT[],
    "countries" TEXT[],
    "fundingTypes" TEXT[],
    "amountMin" DOUBLE PRECISION,
    "amountMax" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funding_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funding_alert_matches" (
    "id" TEXT NOT NULL,
    "alertId" TEXT NOT NULL,
    "fundingId" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "funding_alert_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" "AuditAction" NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_name_key" ON "institutions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_slug_key" ON "institutions"("slug");

-- CreateIndex
CREATE INDEX "institutions_country_idx" ON "institutions"("country");

-- CreateIndex
CREATE INDEX "institutions_type_idx" ON "institutions"("type");

-- CreateIndex
CREATE UNIQUE INDEX "researchers_slug_key" ON "researchers"("slug");

-- CreateIndex
CREATE INDEX "researchers_institutionId_idx" ON "researchers"("institutionId");

-- CreateIndex
CREATE INDEX "researchers_isSpotlighted_idx" ON "researchers"("isSpotlighted");

-- CreateIndex
CREATE INDEX "researchers_country_idx" ON "researchers"("country");

-- CreateIndex
CREATE INDEX "researchers_status_idx" ON "researchers"("status");

-- CreateIndex
CREATE UNIQUE INDEX "research_categories_name_key" ON "research_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "research_categories_slug_key" ON "research_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "research_materials_name_key" ON "research_materials"("name");

-- CreateIndex
CREATE UNIQUE INDEX "research_materials_slug_key" ON "research_materials"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "research_material_mappings_researchId_materialId_key" ON "research_material_mappings"("researchId", "materialId");

-- CreateIndex
CREATE UNIQUE INDEX "research_applications_name_key" ON "research_applications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "research_applications_slug_key" ON "research_applications"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "research_application_mappings_researchId_applicationId_key" ON "research_application_mappings"("researchId", "applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "journals_name_key" ON "journals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "research_slug_key" ON "research"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "research_doi_key" ON "research"("doi");

-- CreateIndex
CREATE INDEX "research_status_idx" ON "research"("status");

-- CreateIndex
CREATE INDEX "research_documentType_idx" ON "research"("documentType");

-- CreateIndex
CREATE INDEX "research_publicationYear_idx" ON "research"("publicationYear");

-- CreateIndex
CREATE INDEX "research_categoryId_idx" ON "research"("categoryId");

-- CreateIndex
CREATE INDEX "research_institutionId_idx" ON "research"("institutionId");

-- CreateIndex
CREATE INDEX "research_views_idx" ON "research"("views");

-- CreateIndex
CREATE INDEX "research_authors_researchId_idx" ON "research_authors"("researchId");

-- CreateIndex
CREATE INDEX "research_authors_researcherId_idx" ON "research_authors"("researcherId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "research_tags_researchId_tagId_key" ON "research_tags"("researchId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE INDEX "companies_country_idx" ON "companies"("country");

-- CreateIndex
CREATE INDEX "companies_isFeatured_idx" ON "companies"("isFeatured");

-- CreateIndex
CREATE INDEX "companies_type_idx" ON "companies"("type");

-- CreateIndex
CREATE UNIQUE INDEX "career_categories_name_key" ON "career_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "career_categories_slug_key" ON "career_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "research_fields_name_key" ON "research_fields"("name");

-- CreateIndex
CREATE UNIQUE INDEX "research_fields_slug_key" ON "research_fields"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "job_opportunities_slug_key" ON "job_opportunities"("slug");

-- CreateIndex
CREATE INDEX "job_opportunities_status_idx" ON "job_opportunities"("status");

-- CreateIndex
CREATE INDEX "job_opportunities_opportunityType_idx" ON "job_opportunities"("opportunityType");

-- CreateIndex
CREATE INDEX "job_opportunities_country_idx" ON "job_opportunities"("country");

-- CreateIndex
CREATE INDEX "job_opportunities_careerLevel_idx" ON "job_opportunities"("careerLevel");

-- CreateIndex
CREATE INDEX "job_opportunities_deadline_idx" ON "job_opportunities"("deadline");

-- CreateIndex
CREATE INDEX "job_opportunities_companyId_idx" ON "job_opportunities"("companyId");

-- CreateIndex
CREATE INDEX "job_opportunities_isFeatured_idx" ON "job_opportunities"("isFeatured");

-- CreateIndex
CREATE UNIQUE INDEX "job_tags_jobId_tagId_key" ON "job_tags"("jobId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "job_research_fields_jobId_researchFieldId_key" ON "job_research_fields"("jobId", "researchFieldId");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "company_countries_companyId_countryId_key" ON "company_countries"("companyId", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "funding_organizations_name_key" ON "funding_organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "funding_organizations_slug_key" ON "funding_organizations"("slug");

-- CreateIndex
CREATE INDEX "funding_organizations_countryId_idx" ON "funding_organizations"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "funding_categories_name_key" ON "funding_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "funding_categories_slug_key" ON "funding_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "funding_opportunities_slug_key" ON "funding_opportunities"("slug");

-- CreateIndex
CREATE INDEX "funding_opportunities_status_idx" ON "funding_opportunities"("status");

-- CreateIndex
CREATE INDEX "funding_opportunities_fundingType_idx" ON "funding_opportunities"("fundingType");

-- CreateIndex
CREATE INDEX "funding_opportunities_countryId_idx" ON "funding_opportunities"("countryId");

-- CreateIndex
CREATE INDEX "funding_opportunities_deadline_idx" ON "funding_opportunities"("deadline");

-- CreateIndex
CREATE INDEX "funding_opportunities_organizationId_idx" ON "funding_opportunities"("organizationId");

-- CreateIndex
CREATE INDEX "funding_opportunities_isFeatured_idx" ON "funding_opportunities"("isFeatured");

-- CreateIndex
CREATE UNIQUE INDEX "funding_applicant_types_fundingId_applicantType_key" ON "funding_applicant_types"("fundingId", "applicantType");

-- CreateIndex
CREATE UNIQUE INDEX "funding_research_fields_fundingId_researchFieldId_key" ON "funding_research_fields"("fundingId", "researchFieldId");

-- CreateIndex
CREATE UNIQUE INDEX "funding_tags_fundingId_tagId_key" ON "funding_tags"("fundingId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "laboratories_slug_key" ON "laboratories"("slug");

-- CreateIndex
CREATE INDEX "laboratories_country_idx" ON "laboratories"("country");

-- CreateIndex
CREATE INDEX "laboratories_institutionId_idx" ON "laboratories"("institutionId");

-- CreateIndex
CREATE INDEX "laboratories_status_idx" ON "laboratories"("status");

-- CreateIndex
CREATE UNIQUE INDEX "technologies_slug_key" ON "technologies"("slug");

-- CreateIndex
CREATE INDEX "technologies_category_idx" ON "technologies"("category");

-- CreateIndex
CREATE INDEX "technologies_status_idx" ON "technologies"("status");

-- CreateIndex
CREATE UNIQUE INDEX "conferences_slug_key" ON "conferences"("slug");

-- CreateIndex
CREATE INDEX "conferences_startDate_idx" ON "conferences"("startDate");

-- CreateIndex
CREATE INDEX "conferences_status_idx" ON "conferences"("status");

-- CreateIndex
CREATE INDEX "conferences_country_idx" ON "conferences"("country");

-- CreateIndex
CREATE INDEX "conferences_isUpcoming_idx" ON "conferences"("isUpcoming");

-- CreateIndex
CREATE UNIQUE INDEX "conference_tags_conferenceId_tagId_key" ON "conference_tags"("conferenceId", "tagId");

-- CreateIndex
CREATE INDEX "research_bookmarks_researchId_idx" ON "research_bookmarks"("researchId");

-- CreateIndex
CREATE INDEX "job_bookmarks_jobId_idx" ON "job_bookmarks"("jobId");

-- CreateIndex
CREATE INDEX "funding_bookmarks_fundingId_idx" ON "funding_bookmarks"("fundingId");

-- CreateIndex
CREATE INDEX "saved_searches_userId_idx" ON "saved_searches"("userId");

-- CreateIndex
CREATE INDEX "funding_alerts_userId_idx" ON "funding_alerts"("userId");

-- CreateIndex
CREATE INDEX "funding_alert_matches_alertId_idx" ON "funding_alert_matches"("alertId");

-- CreateIndex
CREATE INDEX "funding_alert_matches_fundingId_idx" ON "funding_alert_matches"("fundingId");

-- CreateIndex
CREATE UNIQUE INDEX "funding_alert_matches_alertId_fundingId_key" ON "funding_alert_matches"("alertId", "fundingId");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscribers_email_key" ON "newsletter_subscribers"("email");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_entityId_idx" ON "audit_logs"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "researchers" ADD CONSTRAINT "researchers_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_material_mappings" ADD CONSTRAINT "research_material_mappings_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_material_mappings" ADD CONSTRAINT "research_material_mappings_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "research_materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_application_mappings" ADD CONSTRAINT "research_application_mappings_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_application_mappings" ADD CONSTRAINT "research_application_mappings_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "research_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research" ADD CONSTRAINT "research_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "research_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research" ADD CONSTRAINT "research_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research" ADD CONSTRAINT "research_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "journals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_authors" ADD CONSTRAINT "research_authors_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_authors" ADD CONSTRAINT "research_authors_researcherId_fkey" FOREIGN KEY ("researcherId") REFERENCES "researchers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_tags" ADD CONSTRAINT "research_tags_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_tags" ADD CONSTRAINT "research_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_fields" ADD CONSTRAINT "research_fields_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "research_fields"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_opportunities" ADD CONSTRAINT "job_opportunities_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_opportunities" ADD CONSTRAINT "job_opportunities_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "career_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_tags" ADD CONSTRAINT "job_tags_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_tags" ADD CONSTRAINT "job_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_research_fields" ADD CONSTRAINT "job_research_fields_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_research_fields" ADD CONSTRAINT "job_research_fields_researchFieldId_fkey" FOREIGN KEY ("researchFieldId") REFERENCES "research_fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_countries" ADD CONSTRAINT "company_countries_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_countries" ADD CONSTRAINT "company_countries_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_organizations" ADD CONSTRAINT "funding_organizations_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_opportunities" ADD CONSTRAINT "funding_opportunities_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "funding_organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_opportunities" ADD CONSTRAINT "funding_opportunities_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "funding_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_opportunities" ADD CONSTRAINT "funding_opportunities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_applicant_types" ADD CONSTRAINT "funding_applicant_types_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_research_fields" ADD CONSTRAINT "funding_research_fields_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_research_fields" ADD CONSTRAINT "funding_research_fields_researchFieldId_fkey" FOREIGN KEY ("researchFieldId") REFERENCES "research_fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_tags" ADD CONSTRAINT "funding_tags_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_tags" ADD CONSTRAINT "funding_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratories" ADD CONSTRAINT "laboratories_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conference_tags" ADD CONSTRAINT "conference_tags_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "conferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conference_tags" ADD CONSTRAINT "conference_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_bookmarks" ADD CONSTRAINT "research_bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_bookmarks" ADD CONSTRAINT "research_bookmarks_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_bookmarks" ADD CONSTRAINT "job_bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_bookmarks" ADD CONSTRAINT "job_bookmarks_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_bookmarks" ADD CONSTRAINT "funding_bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_bookmarks" ADD CONSTRAINT "funding_bookmarks_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding_opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_searches" ADD CONSTRAINT "saved_searches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_alerts" ADD CONSTRAINT "funding_alerts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_alert_matches" ADD CONSTRAINT "funding_alert_matches_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "funding_alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding_alert_matches" ADD CONSTRAINT "funding_alert_matches_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding_opportunities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
