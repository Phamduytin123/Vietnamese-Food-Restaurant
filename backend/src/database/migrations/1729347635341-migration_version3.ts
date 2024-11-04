import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationVersion31729347635341 implements MigrationInterface {
  name = 'MigrationVersion31729347635341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`voucher\` ADD \`code\` varchar(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`isPaid\` tinyint NOT NULL DEFAULT 0`
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`paymentCode\` varchar(255) NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP COLUMN \`paymentCode\``
    );
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`isPaid\``);
    await queryRunner.query(`ALTER TABLE \`voucher\` DROP COLUMN \`code\``);
  }
}
