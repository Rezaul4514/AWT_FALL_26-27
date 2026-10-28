import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAntiqo1793021063112 implements MigrationInterface {
    name = 'InitAntiqo1793021063112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "buyer_id" uuid NOT NULL, "rating" integer NOT NULL, "comment" text NOT NULL, "moderation_status" character varying NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shop_id" uuid NOT NULL, "title" character varying(150) NOT NULL, "category" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', "condition" character varying(30) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seller_id" uuid NOT NULL, "name" character varying(100) NOT NULL, "description" text, "approval_status" character varying NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_9482e9567d8dcc2bc615981ef44" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9e952e93f369f16e27dd786c33f" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9e952e93f369f16e27dd786c33f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_9482e9567d8dcc2bc615981ef44"`);
        await queryRunner.query(`DROP TABLE "shops"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
