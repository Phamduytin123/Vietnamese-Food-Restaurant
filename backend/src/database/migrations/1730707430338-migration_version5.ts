import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationVersion51730707430338 implements MigrationInterface {
    name = 'MigrationVersion51730707430338';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`isActive\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`isActive\``);
    }
}
