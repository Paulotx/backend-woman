import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateComplaints1601220947511
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
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false,
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
                        name: 'birth',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        name: 'race',
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
                        name: 'neighborhood',
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
                        name: 'attacker_sex',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'relation',
                        type: 'varchar',
                        isNullable: false,
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
                    {
                        name: 'region_id',
                        type: 'varchar',
                        isNullable: false,
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
                foreignKeys: [
                    {
                        name: 'Region',
                        referencedTableName: 'regions',
                        referencedColumnNames: ['id'],
                        columnNames: ['region_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('complaints');
    }
}
