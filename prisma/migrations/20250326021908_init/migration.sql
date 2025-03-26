-- CreateTable
CREATE TABLE "Salesperson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Salesperson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "approaches" INTEGER NOT NULL DEFAULT 0,
    "prospects" INTEGER NOT NULL DEFAULT 0,
    "meetings" INTEGER NOT NULL DEFAULT 0,
    "contracts" INTEGER NOT NULL DEFAULT 0,
    "salespersonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_date_salespersonId_key" ON "Activity"("date", "salespersonId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_salespersonId_fkey" FOREIGN KEY ("salespersonId") REFERENCES "Salesperson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
