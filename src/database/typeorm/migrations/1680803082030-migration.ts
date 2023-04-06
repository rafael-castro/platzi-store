import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1680803082030 implements MigrationInterface {
    name = 'migration1680803082030';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" text NOT NULL, "price" numeric(6,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
