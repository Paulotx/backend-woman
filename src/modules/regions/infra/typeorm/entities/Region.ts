import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    // ManyToMany,
    // JoinTable,
} from 'typeorm';

import Complaint from '@modules/complaints/infra/typeorm/entities/Complaint';
// import User from '@modules/users/infra/typeorm/entities/User';

@Entity('regions')
class Region {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    responsible: string;

    @OneToMany(() => Complaint, complaints => complaints.region)
    complaints: Complaint[];

    // @ManyToMany(() => User, user => user.regions)
    // @JoinTable({ name: 'users' })
    // users: User[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Region;
