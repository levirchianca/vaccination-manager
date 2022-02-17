import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePaciente1644982479479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'patients',
            columns: [
                {
                    name: 'id',
                    type: 'INTEGER',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true,
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'sobrenome',
                    type: 'varchar'
                },
                {
                    name: 'cpf',
                    type: 'varchar'
                },
                {
                    name: 'rg',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'telefone',
                    type: 'varchar'
                },
                {
                    name: 'endereco_id',
                    type: 'INTEGER'
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['endereco_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'adresss',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patients');
    }

}
