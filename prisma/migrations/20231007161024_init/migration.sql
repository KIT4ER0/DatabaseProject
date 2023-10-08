/*
  Warnings:

  - You are about to drop the column `agent_id` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the column `agent_id` on the `concert` table. All the data in the column will be lost.
  - You are about to drop the `agent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artist_id` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `artist` DROP FOREIGN KEY `Artist_agent_id_fkey`;

-- DropForeignKey
ALTER TABLE `concert` DROP FOREIGN KEY `Concert_agent_id_fkey`;

-- AlterTable
ALTER TABLE `artist` DROP COLUMN `agent_id`;

-- AlterTable
ALTER TABLE `concert` DROP COLUMN `agent_id`,
    ADD COLUMN `artist_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `agent`;

-- AddForeignKey
ALTER TABLE `Concert` ADD CONSTRAINT `Concert_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `Artist`(`artist_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
