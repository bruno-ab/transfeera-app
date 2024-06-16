/*
  Warnings:

  - Added the required column `bank` to the `receivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_account` to the `receivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_agency` to the `receivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `receivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `receivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `receivers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receivers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "bank_agency" TEXT NOT NULL,
    "bank_account" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "pix_key_type" TEXT NOT NULL,
    "pix_key" TEXT NOT NULL,
    "email" TEXT
);
INSERT INTO "new_receivers" ("email", "id", "pix_key", "pix_key_type") SELECT "email", "id", "pix_key", "pix_key_type" FROM "receivers";
DROP TABLE "receivers";
ALTER TABLE "new_receivers" RENAME TO "receivers";
CREATE UNIQUE INDEX "receivers_email_key" ON "receivers"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
