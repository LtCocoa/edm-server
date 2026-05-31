import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateRolesTable1780244312668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO roles (name, key) VALUES ('Admin', 'admin'), ('Manager', 'manager'), ('Employee', 'employee');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM roles WHERE key IN ('admin', 'manager', 'employee')`);
    }

}
