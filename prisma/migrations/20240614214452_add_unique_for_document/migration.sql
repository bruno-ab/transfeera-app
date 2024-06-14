/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `receivers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "receivers_document_key" ON "receivers"("document");
