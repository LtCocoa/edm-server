import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusEntity1779744046452 implements MigrationInterface {
    name = 'AddStatusEntity1779744046452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "key" character varying(20) NOT NULL, CONSTRAINT "UQ_6368960dda916c035651312d35b" UNIQUE ("key"), CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "statuses" (name, key) VALUES ('Pending', 'pending'), ('Approved', 'approved'), ('Rejected', 'rejected');`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "status_id" integer`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_ce203df932da7668d9d41196e5a" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`UPDATE "documents" SET "status_id" = (SELECT "id" FROM "statuses" WHERE "statuses"."key" = 'pending') WHERE "status_id" IS NULL;`);
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "status_id" SET NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_ce203df932da7668d9d41196e5a"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "status_id"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
    }

}
