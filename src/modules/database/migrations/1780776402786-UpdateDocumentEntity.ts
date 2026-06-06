import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDocumentEntity1780776402786 implements MigrationInterface {
    name = 'UpdateDocumentEntity1780776402786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "start_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "end_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "end_date" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "end_date" SET DEFAULT '2026-05-31 16:09:13.358'`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "end_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "start_date" SET DEFAULT '2026-05-31 16:09:13.358'`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "created_at" SET DEFAULT '2026-05-31 16:09:13.358'`);
    }

}
