import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    // ManyToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
// import Region from '@modules/regions/infra/typeorm/entities/Region';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    perfil: string;

    @Column()
    @Exclude()
    password: string;

    // @ManyToMany(() => Region, region => region.users)
    // regions: Region[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
