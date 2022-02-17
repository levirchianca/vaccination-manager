import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProfissionalDeSaude1644982024728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'health_professionals',
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
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'telefone',
                    type: 'varchar'
                },
                {
                    name: 'profissao',
                    type: 'varchar'
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('health_professionals');
    }

}
