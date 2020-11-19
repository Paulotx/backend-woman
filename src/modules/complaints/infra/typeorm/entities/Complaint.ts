import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Region from '@modules/regions/infra/typeorm/entities/Region';

@Entity('complaints')
class Complaint {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: string;

    @Column()
    victim: string;

    @Column()
    cpf: string;

    @Column()
    birth: Date;

    @Column()
    race: string;

    @Column()
    phone: string;

    @Column()
    cep: string;

    @Column()
    address: string;

    @Column('int')
    number: number;

    @Column()
    complement: string;

    @Column()
    uf: string;

    @Column()
    neighborhood: string;

    @Column()
    city: string;

    @Column()
    subject: string;

    @Column()
    attacker: string;

    @Column()
    identification: string;

    @Column()
    attacker_sex: string;

    @Column()
    relation: string;

    @Column()
    report: string;

    @Column()
    note: string;

    @Column()
    status: string;

    @ManyToOne(() => Region)
    @JoinColumn({ name: 'region_id' })
    region: Region;

    @Column()
    region_id: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Complaint;
