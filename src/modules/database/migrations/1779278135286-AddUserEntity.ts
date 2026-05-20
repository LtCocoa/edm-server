import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntity1779278135286 implements MigrationInterface {
    name = 'AddUserEntity1779278135286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "login" character varying(20) NOT NULL, "password" character varying(20) NOT NULL, "passwordHash" character varying NOT NULL, "passwordSalt" character varying NOT NULL, CONSTRAINT "PK_af4be3eb77a4bdbafac6f808ff3" PRIMARY KEY ("user_id")); COMMENT ON COLUMN "User"."user_id" IS 'Идентификатор'; COMMENT ON COLUMN "User"."name" IS 'Имя'; COMMENT ON COLUMN "User"."login" IS 'Логин'; COMMENT ON COLUMN "User"."password" IS 'Пароль'; COMMENT ON COLUMN "User"."passwordHash" IS 'Хеш пароля'; COMMENT ON COLUMN "User"."passwordSalt" IS 'Соль пароля'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
