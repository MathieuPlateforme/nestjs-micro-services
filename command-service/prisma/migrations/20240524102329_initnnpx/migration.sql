/*
  Warnings:

  - You are about to drop the column `addressId` on the `Commande` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Commande` DROP FOREIGN KEY `Commande_addressId_fkey`;

-- AlterTable
ALTER TABLE `Commande` DROP COLUMN `addressId`;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_deliveryAddressId_fkey` FOREIGN KEY (`deliveryAddressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
