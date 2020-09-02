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
                        isNullable: false,
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'number',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'uf',
                        type: 'varchar(2)',
                        isNullable: false,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'subject',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'attacker',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'identification',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'report',
                        type: 'varchar',
                        isNullable: false,
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
                    // {
                    //     name: 'created_at',
                    //     type: 'timestamp',
                    // },
                    // {
                    //     name: 'updated_at',
                    //     type: 'timestamp',
                    // },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('complaints');
    }
}
