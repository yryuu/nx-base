import {MigrationInterface, QueryRunner} from "typeorm";

export class photo1616922360915 implements MigrationInterface {
    name = 'photo1616922360915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `photo` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(500) NOT NULL, `description` text NOT NULL, `filename` varchar(255) NOT NULL, `views` int NOT NULL, `isPublished` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `photo`");
    }

}
