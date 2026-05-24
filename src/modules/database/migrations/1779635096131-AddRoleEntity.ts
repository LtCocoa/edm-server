import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleEntity1779635096131 implements MigrationInterface {
    name = 'AddRoleEntity1779635096131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Role" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "key" character varying(20) NOT NULL, CONSTRAINT "UQ_d80f547d4fb9fc2bf8ee43e00e7" UNIQUE ("key"), CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "User" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_775147058c769ea57efe923d288" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_775147058c769ea57efe923d288"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "role_id"`);
        await queryRunner.query(`DROP TABLE "Role"`);
    }

}
