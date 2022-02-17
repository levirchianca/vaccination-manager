import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFabricanteVacina1644981827588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'vaccine_manufacturers',
            columns: [
                {
                    name: 'id',
                    type: 'INTEGER',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true,
                },
                {
                    name: 'descricao',
                    type: 'text'
                },
                {
                    name: 'lote',
                    type: 'varchar'
                },
                {
                    name: 'validade',
                    type: 'text'
                },
                {
                    name: 'quantidade',
                    type: 'INTEGER'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vaccine_manufacturers');
    }

}
