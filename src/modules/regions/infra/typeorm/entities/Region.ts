import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import Complaint from '@modules/complaints/infra/typeorm/entities/Complaint';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Region;
