import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('complaints')
class Complaint {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    victim: string;

    @Column()
    cpf: string;

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
    city: string;

    @Column()
    subject: string;

    @Column()
    attacker: string;

    @Column()
    identification: string | undefined;

    @Column()
    report: string;

    @Column()
    note: string | undefined;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Complaint;