import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateStatusesTable1780244062195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "statuses" (name, key) VALUES ('Pending', 'pending'), ('Approved', 'approved'), ('Rejected', 'rejected');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM statuses WHERE key IN ('pending', 'approved', 'rejected')`);
    }

}
