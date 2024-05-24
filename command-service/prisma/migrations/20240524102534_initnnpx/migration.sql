/*
  Warnings:

  - Added the required column `addressId` to the `Commande` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Commande` DROP FOREIGN KEY `Commande_deliveryAddressId_fkey`;

-- AlterTable
ALTER TABLE `Commande` ADD COLUMN `addressId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
