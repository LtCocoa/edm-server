import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReviewedByColumn1779837386717 implements MigrationInterface {
    name = 'AddReviewedByColumn1779837386717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_c7481daf5059307842edef74d73"`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "reviewed_by" uuid`);
        await queryRunner.query(`COMMENT ON COLUMN "documents"."created_by" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_14371caaff44d0801b59b284166" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_1a55d9fa0929f418bcbcb964181" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_1a55d9fa0929f418bcbcb964181"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_14371caaff44d0801b59b284166"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."id" IS 'Идентификатор'`);
        await queryRunner.query(`COMMENT ON COLUMN "documents"."created_by" IS 'Идентификатор'`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "reviewed_by"`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_c7481daf5059307842edef74d73" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
