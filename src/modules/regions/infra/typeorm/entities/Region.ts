import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';

import Complaint from '@modules/complaints/infra/typeorm/entities/Complaint';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('regions')
class Region {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    region: string;

    @Column()
    city: string;

    @Column()
    uf: string;

    @OneToMany(() => Complaint, complaints => complaints.region)
    complaints: Complaint[];

    @ManyToMany(() => User)
    @JoinTable()
    users: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Region;
