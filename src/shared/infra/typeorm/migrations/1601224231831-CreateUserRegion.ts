import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserRegion1601224231831
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_regions_region',
                columns: [
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'region_id',
                        type: 'varchar',
                        isPrimary: true,
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
                        name: 'User',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
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
        await queryRunner.dropTable('user_regions_region');
    }
}
