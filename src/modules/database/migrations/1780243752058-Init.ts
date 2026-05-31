import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1780243752058 implements MigrationInterface {
    name = 'Init1780243752058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "key" character varying(20) NOT NULL, CONSTRAINT "UQ_6368960dda916c035651312d35b" UNIQUE ("key"), CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."documents_type_enum" AS ENUM('vacation_request', 'resignation_request')`);
        await queryRunner.query(`CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(20) NOT NULL, "type" "public"."documents_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2026-05-31T16:09:13.358Z"', "start_date" TIMESTAMP NOT NULL DEFAULT '"2026-05-31T16:09:13.358Z"', "end_date" TIMESTAMP NOT NULL DEFAULT '"2026-05-31T16:09:13.358Z"', "reviewed_at" TIMESTAMP, "comment" character varying(100), "author_id" uuid NOT NULL, "status_id" integer NOT NULL, "reviewer_id" uuid NOT NULL, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "key" character varying(20) NOT NULL, CONSTRAINT "UQ_a87cf0659c3ac379b339acf36a2" UNIQUE ("key"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(20) NOT NULL, "last_name" character varying(20) NOT NULL, "middle_name" character varying(20) NOT NULL, "position_name" character varying(20) NOT NULL, "login" character varying(20) NOT NULL, "password" character varying(20) NOT NULL, "password_hash" character varying NOT NULL, "password_salt" character varying NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."first_name" IS 'Имя'; COMMENT ON COLUMN "users"."last_name" IS 'Фамилия'; COMMENT ON COLUMN "users"."middle_name" IS 'Отчество'; COMMENT ON COLUMN "users"."position_name" IS 'Название должности'; COMMENT ON COLUMN "users"."login" IS 'Логин'; COMMENT ON COLUMN "users"."password" IS 'Пароль'; COMMENT ON COLUMN "users"."password_hash" IS 'Хеш пароля'; COMMENT ON COLUMN "users"."password_salt" IS 'Соль пароля'`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_85d4e65f38815d121b87e9ed7aa" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_ce203df932da7668d9d41196e5a" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_c8ce21678535e1de88dc0137d0a" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_c8ce21678535e1de88dc0137d0a"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_ce203df932da7668d9d41196e5a"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_85d4e65f38815d121b87e9ed7aa"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "documents"`);
        await queryRunner.query(`DROP TYPE "public"."documents_type_enum"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
    }

}
