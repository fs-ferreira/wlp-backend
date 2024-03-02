-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_order_id_fkey`;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
