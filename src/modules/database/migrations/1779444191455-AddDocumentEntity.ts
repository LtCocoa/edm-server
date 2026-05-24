import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDocumentEntity1779444191455 implements MigrationInterface {
    name = 'AddDocumentEntity1779444191455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Document_type_enum" AS ENUM('vacation_request', 'resignation_request')`);
        await queryRunner.query(`CREATE TABLE "Document" ("document_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(20) NOT NULL, "type" "public"."Document_type_enum" NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7dbfd13817c393b7fea43dc6340" PRIMARY KEY ("document_id")); COMMENT ON COLUMN "Document"."user_id" IS 'Идентификатор'`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_7d7ba3f7344bde97dd5f2bd60ea" UNIQUE ("login")`);
        await queryRunner.query(`ALTER TABLE "Document" ADD CONSTRAINT "FK_728ac4466d558ccd5dce33a09a2" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Document" DROP CONSTRAINT "FK_728ac4466d558ccd5dce33a09a2"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_7d7ba3f7344bde97dd5f2bd60ea"`);
        await queryRunner.query(`DROP TABLE "Document"`);
        await queryRunner.query(`DROP TYPE "public"."Document_type_enum"`);
    }

}
