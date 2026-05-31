import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1780045378354 implements MigrationInterface {
    name = 'UpdateEntities1780045378354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('documents', 'created_by', 'author_id');
        await queryRunner.renameColumn('documents', 'reviewed_by', 'reviewer_id');
        await queryRunner.renameColumn('users', 'name', 'first_name');
        await queryRunner.query(`ALTER TABLE "documents" ADD "start_date" TIMESTAMP NOT NULL DEFAULT '"2026-05-29T09:02:59.769Z"'`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "end_date" TIMESTAMP NOT NULL DEFAULT '"2026-05-29T09:02:59.769Z"'`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "created_at" TIMESTAMP NOT NULL DEFAULT '"2026-05-29T09:02:59.769Z"'`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "reviewed_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "comment" character varying(100)`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."first_name" IS 'Имя'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying(20) NOT NULL DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."last_name" IS 'Фамилия'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "middle_name" character varying(20) NOT NULL DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."middle_name" IS 'Отчество'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "position_name" character varying(20) NOT NULL DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."position_name" IS 'Название должности'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('documents', 'author_id', 'created_by');
        await queryRunner.renameColumn('documents', 'reviewer_id', 'reviewed_by');
        await queryRunner.renameColumn('users', 'first_name', 'name');
        await queryRunner.query(`COMMENT ON COLUMN "users"."position_name" IS 'Название должности'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "middle_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "reviewed_at"`);
    }

}
