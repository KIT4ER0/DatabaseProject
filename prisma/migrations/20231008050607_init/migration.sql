/*
  Warnings:

  - You are about to drop the column `amount_paid` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `booking_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_date` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[card_number]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `card_number` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvv` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiry_date` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_booking_id_fkey`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `amount_paid`,
    DROP COLUMN `booking_id`,
    DROP COLUMN `payment_date`,
    ADD COLUMN `card_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `cvv` VARCHAR(191) NOT NULL,
    ADD COLUMN `expiry_date` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Payment_card_number_key` ON `Payment`(`card_number`);
