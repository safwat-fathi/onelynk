import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeImageUrlOptional1755326480334 implements MigrationInterface {
    name = 'MakeImageUrlOptional1755326480334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "image_url" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "image_url" SET NOT NULL`);
    }

}
