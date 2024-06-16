-- CreateTable
CREATE TABLE "receivers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pix_key_type" TEXT NOT NULL,
    "pix_key" TEXT NOT NULL,
    "email" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "receivers_email_key" ON "receivers"("email");
