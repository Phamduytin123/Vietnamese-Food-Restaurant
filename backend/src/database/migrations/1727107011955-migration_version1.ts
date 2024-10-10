import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version11727107011955 implements MigrationInterface {
    name = 'Version11727107011955';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_vi\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'https://res.cloudinary.com/deei5izfg/image/upload/v1728210344/VietnameseFoodRestaurant/default_category.png', \`isFood\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`accountId\` int NOT NULL, \`itemId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL, \`comment\` varchar(1000) NULL, \`itemId\` int NOT NULL, \`accountId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_vi\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`discount\` int NOT NULL DEFAULT '0', \`carbohydrates\` int NULL DEFAULT 0, \`protein\` int NULL DEFAULT 0, \`cholesterol\` int NULL DEFAULT 0, \`sodium\` int NULL DEFAULT 0, \`fiber\` int NULL DEFAULT 0, \`description_vi\` varchar(255) NOT NULL, \`description_en\` varchar(255) NOT NULL, \`availability\` varchar(255) NOT NULL DEFAULT 'in stock', \`rating\` float NOT NULL DEFAULT '5', \`ingredients_vi\` varchar(1000) NOT NULL DEFAULT '[]', \`ingredients_en\` varchar(1000) NOT NULL DEFAULT '[]', \`unit_vi\` varchar(255) NOT NULL, \`unit_en\` varchar(255) NOT NULL, \`images\` varchar(1000) NOT NULL DEFAULT '[]', \`regional_vi\` varchar(255) NULL, \`regional_en\` varchar(255) NULL, \`isFood\` tinyint NOT NULL DEFAULT 1, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`categoryId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`voucher\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_vi\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`discount\` int NOT NULL, \`minPrice\` int NOT NULL, \`startAt\` datetime NOT NULL, \`endAt\` datetime NOT NULL, \`count\` int NOT NULL DEFAULT '0', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalPrice\` int NOT NULL, \`phoneNumber\` varchar(10) NOT NULL, \`receiver\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`paymentMethod\` varchar(255) NOT NULL DEFAULT 'cash', \`status\` varchar(255) NOT NULL DEFAULT 'wait', \`reasonCancel\` varchar(255) NOT NULL, \`note\` varchar(255) NOT NULL, \`accountId\` int NOT NULL, \`voucherId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`order_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`itemSizeId\` int NOT NULL, \`price\` int NOT NULL, \`quantity\` int NOT NULL, \`orderId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`item_size\` (\`id\` int NOT NULL AUTO_INCREMENT, \`size_vi\` varchar(255) NOT NULL, \`size_en\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`itemId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`cart\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`accountId\` int NOT NULL, \`itemSizeId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`displayName\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`tel\` varchar(10) NOT NULL, \`avatar\` varchar(255) NOT NULL DEFAULT 'https://res.cloudinary.com/deei5izfg/image/upload/f_auto,q_auto/v1/VietnameseFoodRestaurant/skohr4qgffuyanefqy91', \`gender\` varchar(255) NOT NULL DEFAULT 'male', \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'customer', \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `ALTER TABLE \`like\` ADD CONSTRAINT \`FK_cafda693c73f38e0095ced97d18\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`like\` ADD CONSTRAINT \`FK_dfd0339fdaff71a8fe7dc82178d\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1f06583aa670b50863c47174e46\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_cfe234d68b9ec0aac262881f2ca\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`item\` ADD CONSTRAINT \`FK_c0c8f47a702c974a77812169bc2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_8cb9cecbc8b09bf60c71f7a9680\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_cff8eff4c72e7c4cb5bf045447c\` FOREIGN KEY (\`voucherId\`) REFERENCES \`voucher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_88850b85b38a8a2ded17a1f5369\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_dd79927c8da33329fe702186e76\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`item_size\` ADD CONSTRAINT \`FK_bb2c9705deb889cd9f8407965d2\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_61fe7aa8bf77c2c1800793cf36e\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_e343dc9854285ee06eeb7333e94\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_e343dc9854285ee06eeb7333e94\``
        );
        await queryRunner.query(
            `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_61fe7aa8bf77c2c1800793cf36e\``
        );
        await queryRunner.query(
            `ALTER TABLE \`item_size\` DROP FOREIGN KEY \`FK_bb2c9705deb889cd9f8407965d2\``
        );
        await queryRunner.query(
            `ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_dd79927c8da33329fe702186e76\``
        );
        await queryRunner.query(
            `ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_88850b85b38a8a2ded17a1f5369\``
        );
        await queryRunner.query(
            `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_cff8eff4c72e7c4cb5bf045447c\``
        );
        await queryRunner.query(
            `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_8cb9cecbc8b09bf60c71f7a9680\``
        );
        await queryRunner.query(
            `ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_c0c8f47a702c974a77812169bc2\``
        );
        await queryRunner.query(
            `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_cfe234d68b9ec0aac262881f2ca\``
        );
        await queryRunner.query(
            `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1f06583aa670b50863c47174e46\``
        );
        await queryRunner.query(
            `ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_dfd0339fdaff71a8fe7dc82178d\``
        );
        await queryRunner.query(
            `ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_cafda693c73f38e0095ced97d18\``
        );
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP TABLE \`item_size\``);
        await queryRunner.query(`DROP TABLE \`order_detail\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`voucher\``);
        await queryRunner.query(`DROP TABLE \`item\``);
        await queryRunner.query(`DROP TABLE \`review\``);
        await queryRunner.query(`DROP TABLE \`like\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }
}
