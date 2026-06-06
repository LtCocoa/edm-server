import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameDocumentType1780522616092 implements MigrationInterface {
    name = 'RenameDocumentType1780522616092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."documents_type_enum" RENAME TO "documents_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."documents_type_enum" AS ENUM('vacation_request', 'dismissal_request')`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "type" TYPE "public"."documents_type_enum" USING "type"::"text"::"public"."documents_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."documents_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."documents_type_enum_old" AS ENUM('vacation_request', 'resignation_request')`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "type" TYPE "public"."documents_type_enum_old" USING "type"::"text"::"public"."documents_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."documents_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."documents_type_enum_old" RENAME TO "documents_type_enum"`);
    }

}
