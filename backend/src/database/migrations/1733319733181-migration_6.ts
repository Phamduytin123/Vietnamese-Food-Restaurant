import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration61733319733181 implements MigrationInterface {
  name = 'Migration61733319733181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1f06583aa670b50863c47174e46\``
    );
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`itemId\``);
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`calories\` \`calories\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`fat\` \`fat\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`carbohydrates\` \`carbohydrates\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`protein\` \`protein\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`cholesterol\` \`cholesterol\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`sodium\` \`sodium\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`fiber\` \`fiber\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`regional_vi\` \`regional_vi\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`regional_en\` \`regional_en\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`reasonCancel\` \`reasonCancel\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`note\` \`note\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`paymentCode\` \`paymentCode\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`voucherId\` \`voucherId\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`displayName\` \`displayName\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`address\` \`address\` varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`tel\` \`tel\` varchar(10) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD \`itemSizeId\` int NULL`
    );
    await queryRunner.query(`ALTER TABLE \`review\` ADD \`orderId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_b1b8a22335f85d2b3bc42976401\` FOREIGN KEY (\`itemSizeId\`) REFERENCES \`item_size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_31db76b2d6dfe81d69e27b66c20\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_cff8eff4c72e7c4cb5bf045447c\` FOREIGN KEY (\`voucherId\`) REFERENCES \`voucher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_cff8eff4c72e7c4cb5bf045447c\``
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_31db76b2d6dfe81d69e27b66c20\``
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_b1b8a22335f85d2b3bc42976401\``
    );
    await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`orderId\``);
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP COLUMN \`itemSizeId\``
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`tel\` \`tel\` varchar(10) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`displayName\` \`displayName\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`voucherId\` \`voucherId\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`paymentCode\` \`paymentCode\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`note\` \`note\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`reasonCancel\` \`reasonCancel\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`regional_en\` \`regional_en\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`regional_vi\` \`regional_vi\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`fiber\` \`fiber\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`sodium\` \`sodium\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`cholesterol\` \`cholesterol\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`protein\` \`protein\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`carbohydrates\` \`carbohydrates\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`fat\` \`fat\` int NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`calories\` \`calories\` int NULL DEFAULT 'NULL'`
    );
  }
}
