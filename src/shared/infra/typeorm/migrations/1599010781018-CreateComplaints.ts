import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateComplaints1599010781018
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'complaints',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'victim',
                        type: 'varchar',
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                    },
                    {
                        name: 'number',
                        type: 'integer',
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'uf',
                        type: 'varchar(2)',
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                    },
                    {
                        name: 'subject',
                        type: 'varchar',
                    },
                    {
                        name: 'attacker',
                        type: 'varchar',
                    },
                    {
                        name: 'identification',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'report',
                        type: 'varchar',
                    },
                    {
                        name: 'note',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('complaints');
    }
}
