/*
  Warnings:

  - You are about to drop the column `description` on the `concert` table. All the data in the column will be lost.
  - Added the required column `details` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `concert` DROP COLUMN `description`,
    ADD COLUMN `details` VARCHAR(191) NOT NULL;
