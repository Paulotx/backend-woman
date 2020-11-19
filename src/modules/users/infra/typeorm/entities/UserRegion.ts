import {
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity('user_regions_region')
class UserRegion {
    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    region_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserRegion;
