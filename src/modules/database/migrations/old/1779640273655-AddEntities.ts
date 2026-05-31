import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntities1779640273655 implements MigrationInterface {
    name = 'AddEntities1779640273655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."documents_type_enum" AS ENUM('vacation_request', 'resignation_request')`);
        await queryRunner.query(`CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(20) NOT NULL, "type" "public"."documents_type_enum" NOT NULL, "created_by" uuid NOT NULL, CONSTRAINT "PK_bec3c89789f76e330bbe1766b2c" PRIMARY KEY ("id")); COMMENT ON COLUMN "documents"."created_by" IS 'Идентификатор'`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "key" character varying(20) NOT NULL, CONSTRAINT "UQ_a87cf0659c3ac379b339acf36a2" UNIQUE ("key"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "roles" (key, name) VALUES ('admin', 'Admin'), ('manager', 'Manager'), ('employee', 'Employee');`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "login" character varying(20) NOT NULL, "password" character varying(20) NOT NULL, "password_hash" character varying NOT NULL, "password_salt" character varying NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'Идентификатор'; COMMENT ON COLUMN "users"."name" IS 'Имя'; COMMENT ON COLUMN "users"."login" IS 'Логин'; COMMENT ON COLUMN "users"."password" IS 'Пароль'; COMMENT ON COLUMN "users"."password_hash" IS 'Хеш пароля'; COMMENT ON COLUMN "users"."password_salt" IS 'Соль пароля'`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_c7481daf5059307842edef74d73" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_c7481daf5059307842edef74d73"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "documents"`);
        await queryRunner.query(`DROP TYPE "public"."documents_type_enum"`);
    }

}
