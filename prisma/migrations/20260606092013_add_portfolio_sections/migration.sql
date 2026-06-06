-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "liveUrl" TEXT;

-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "aboutBio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "aboutFocus" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "aboutImage" TEXT,
ADD COLUMN     "aboutPersonalTouch" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "contactGitHub" TEXT NOT NULL DEFAULT 'https://github.com/vindypratama',
ADD COLUMN     "heroName" TEXT NOT NULL DEFAULT 'Vindy Pratama',
ADD COLUMN     "showAbout" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showContact" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showExperience" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showHero" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showProjects" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showTechStack" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);
