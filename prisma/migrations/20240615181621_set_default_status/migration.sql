-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receivers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "bank_agency" TEXT NOT NULL,
    "bank_account" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'RASCUNHO',
    "pix_key_type" TEXT NOT NULL,
    "pix_key" TEXT NOT NULL,
    "email" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_receivers" ("bank", "bank_account", "bank_agency", "created_at", "document", "email", "id", "name", "pix_key", "pix_key_type", "status", "updated_at") SELECT "bank", "bank_account", "bank_agency", "created_at", "document", "email", "id", "name", "pix_key", "pix_key_type", "status", "updated_at" FROM "receivers";
DROP TABLE "receivers";
ALTER TABLE "new_receivers" RENAME TO "receivers";
CREATE UNIQUE INDEX "receivers_email_key" ON "receivers"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
