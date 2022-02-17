import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEndereco1644981553548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'adresss',
            columns: [
                {
                    name: 'id',
                    type: 'INTEGER',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true,
                },
                {
                    name: 'rua',
                    type: 'varchar'
                },
                {
                    name: 'cidade',
                    type: 'varchar'
                },
                {
                    name: 'estado',
                    type: 'varchar'
                },
                {
                    name: 'cep',
                    type: 'varchar'
                },
                {
                    name: 'comentario',
                    type: 'text'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('adresss');
    }

}
