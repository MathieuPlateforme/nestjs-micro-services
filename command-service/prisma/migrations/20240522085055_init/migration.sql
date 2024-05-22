-- CreateTable
CREATE TABLE `Client` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commande` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `deliveryAddressId` VARCHAR(191) NOT NULL,
    `addressId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LigneCommande` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `commandeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LigneCommande` ADD CONSTRAINT `LigneCommande_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `Commande`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LigneCommande` ADD CONSTRAINT `LigneCommande_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Produit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
