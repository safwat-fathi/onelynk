import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1754745217760 implements MigrationInterface {
  name = 'Init1754745217760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "links" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "portfolio" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "deleted_at"`);
  }
}
