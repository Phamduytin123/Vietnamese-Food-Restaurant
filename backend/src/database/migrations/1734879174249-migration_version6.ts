import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationVersion61734879174249 implements MigrationInterface {
    name = 'MigrationVersion61734879174249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1f06583aa670b50863c47174e46\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_e343dc9854285ee06eeb7333e94\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_61fe7aa8bf77c2c1800793cf36e\``);
        await queryRunner.query(`ALTER TABLE \`item_size\` DROP FOREIGN KEY \`FK_bb2c9705deb889cd9f8407965d2\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_dd79927c8da33329fe702186e76\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_88850b85b38a8a2ded17a1f5369\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_cff8eff4c72e7c4cb5bf045447c\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_8cb9cecbc8b09bf60c71f7a9680\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_cfe234d68b9ec0aac262881f2ca\``);
        await queryRunner.query(`ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_c0c8f47a702c974a77812169bc2\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_dfd0339fdaff71a8fe7dc82178d\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_cafda693c73f38e0095ced97d18\``);
        
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`itemId\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`itemSizeId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`orderId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`voucher\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`name_vi\` \`name_vi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`name_en\` \`name_en\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`like\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`like\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`name_vi\` \`name_vi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`name_en\` \`name_en\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`calories\` \`calories\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`fat\` \`fat\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`carbohydrates\` \`carbohydrates\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`protein\` \`protein\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`cholesterol\` \`cholesterol\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`sodium\` \`sodium\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`fiber\` \`fiber\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`description_vi\` \`description_vi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`description_en\` \`description_en\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`ingredients_vi\` \`ingredients_vi\` varchar(1000) NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`ingredients_en\` \`ingredients_en\` varchar(1000) NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`unit_vi\` \`unit_vi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`unit_en\` \`unit_en\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`images\` \`images\` varchar(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`regional_vi\` \`regional_vi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`regional_en\` \`regional_en\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`voucher\` CHANGE \`name_vi\` \`name_vi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`voucher\` CHANGE \`name_en\` \`name_en\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`voucher\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`voucher\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`comment\` \`comment\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`itemSizeId\` \`itemSizeId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`orderId\` \`orderId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`reasonCancel\` \`reasonCancel\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`note\` \`note\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`paymentCode\` \`paymentCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`voucherId\` \`voucherId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`item_size\` CHANGE \`size_vi\` \`size_vi\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item_size\` CHANGE \`size_en\` \`size_en\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`displayName\` \`displayName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`tel\` \`tel\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_cafda693c73f38e0095ced97d18\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_dfd0339fdaff71a8fe7dc82178d\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`item\` ADD CONSTRAINT \`FK_c0c8f47a702c974a77812169bc2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_b1b8a22335f85d2b3bc42976401\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_31db76b2d6dfe81d69e27b66c20\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_cfe234d68b9ec0aac262881f2ca\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_8cb9cecbc8b09bf60c71f7a9680\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_cff8eff4c72e7c4cb5bf045447c\` FOREIGN KEY (\`voucherId\`) REFERENCES \`voucher\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_88850b85b38a8a2ded17a1f5369\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_dd79927c8da33329fe702186e76\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`item_size\` ADD CONSTRAINT \`FK_bb2c9705deb889cd9f8407965d2\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_61fe7aa8bf77c2c1800793cf36e\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_e343dc9854285ee06eeb7333e94\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_e343dc9854285ee06eeb7333e94\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_61fe7aa8bf77c2c1800793cf36e\``);
        await queryRunner.query(`ALTER TABLE \`item_size\` DROP FOREIGN KEY \`FK_bb2c9705deb889cd9f8407965d2\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_dd79927c8da33329fe702186e76\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_88850b85b38a8a2ded17a1f5369\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_cff8eff4c72e7c4cb5bf045447c\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_8cb9cecbc8b09bf60c71f7a9680\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_cfe234d68b9ec0aac262881f2ca\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_31db76b2d6dfe81d69e27b66c20\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_b1b8a22335f85d2b3bc42976401\``);
        await queryRunner.query(`ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_c0c8f47a702c974a77812169bc2\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_dfd0339fdaff71a8fe7dc82178d\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_cafda693c73f38e0095ced97d18\``);
        
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`orderId\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`itemSizeId\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`itemId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1f06583aa670b50863c47174e46\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);

        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`tel\` \`tel\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`displayName\` \`displayName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`item_size\` CHANGE \`size_en\` \`size_en\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item_size\` CHANGE \`size_vi\` \`size_vi\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`voucherId\` \`voucherId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`paymentCode\` \`paymentCode\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`note\` \`note\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`reasonCancel\` \`reasonCancel\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`itemSizeId\` \`itemSizeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`comment\` \`comment\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`voucher\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`voucher\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`voucher\` CHANGE \`name_en\` \`name_en\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`voucher\` CHANGE \`name_vi\` \`name_vi\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`regional_en\` \`regional_en\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`regional_vi\` \`regional_vi\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`images\` \`images\` varchar(1000) NOT NULL DEFAULT ''[]''`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`unit_en\` \`unit_en\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`unit_vi\` \`unit_vi\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`ingredients_en\` \`ingredients_en\` varchar(1000) NOT NULL DEFAULT ''[]''`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`ingredients_vi\` \`ingredients_vi\` varchar(1000) NOT NULL DEFAULT ''[]''`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`description_en\` \`description_en\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`description_vi\` \`description_vi\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`fiber\` \`fiber\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`sodium\` \`sodium\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`cholesterol\` \`cholesterol\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`protein\` \`protein\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`carbohydrates\` \`carbohydrates\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`fat\` \`fat\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`calories\` \`calories\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`name_en\` \`name_en\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`name_vi\` \`name_vi\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`like\` CHANGE \`updatedAt\` \`updatedAt\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`like\` CHANGE \`createdAt\` \`createdAt\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`name_en\` \`name_en\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`name_vi\` \`name_vi\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`isDeleted\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_e343dc9854285ee06eeb7333e94\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_61fe7aa8bf77c2c1800793cf36e\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_size\` ADD CONSTRAINT \`FK_bb2c9705deb889cd9f8407965d2\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_dd79927c8da33329fe702186e76\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_88850b85b38a8a2ded17a1f5369\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_cff8eff4c72e7c4cb5bf045447c\` FOREIGN KEY (\`voucherId\`) REFERENCES \`voucher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_8cb9cecbc8b09bf60c71f7a9680\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_cfe234d68b9ec0aac262881f2ca\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_b1b8a22335f85d2b3bc42976401\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_31db76b2d6dfe81d69e27b66c20\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item\` ADD CONSTRAINT \`FK_c0c8f47a702c974a77812169bc2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_dfd0339fdaff71a8fe7dc82178d\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_cafda693c73f38e0095ced97d18\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
