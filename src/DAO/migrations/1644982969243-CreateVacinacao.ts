import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVacinacao1644982969243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'vaccinations',
            columns: [
                {
                    name: 'id',
                    type: 'INTEGER',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true,
                },
                {
                    name: 'data_aplicacao',
                    type: 'text'
                },
                {
                    name: 'local',
                    type: 'text'
                },
                {
                    name: 'vacina_id',
                    type: 'INTEGER'
                },
                {
                    name: 'paciente_id',
                    type: 'INTEGER'
                },
                {
                    name: 'profissionaldesaude_id',
                    type: 'INTEGER'
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['vacina_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'vaccine_manufacturers'
                },
                {
                    columnNames: ['paciente_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'patients'
                },
                {
                    columnNames: ['profissionaldesaude_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'health_professionals'
                }
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vaccinations');
    }

}
