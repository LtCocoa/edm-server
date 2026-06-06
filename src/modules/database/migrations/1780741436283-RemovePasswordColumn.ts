import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePasswordColumn1780741436283 implements MigrationInterface {
    name = 'RemovePasswordColumn1780741436283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(20) NOT NULL`);
    }

}
