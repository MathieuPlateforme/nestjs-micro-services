-- DropIndex
DROP INDEX `Commande_clientId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `Commande_deliveryAddressId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `LigneCommande_commandeId_fkey` ON `lignecommande`;

-- DropIndex
DROP INDEX `LigneCommande_productId_fkey` ON `lignecommande`;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_deliveryAddressId_fkey` FOREIGN KEY (`deliveryAddressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LigneCommande` ADD CONSTRAINT `LigneCommande_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `Commande`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LigneCommande` ADD CONSTRAINT `LigneCommande_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Produit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
