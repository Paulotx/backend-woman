import { getRepository, Repository } from 'typeorm';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import UserTokens from '../entities/UserTokens';

class UserTokensRepository implements IUserTokenRepository {
    private ormRepository: Repository<UserTokens>;

    constructor() {
        this.ormRepository = getRepository(UserTokens);
    }

    public async findByToken(token: string): Promise<UserTokens | undefined> {
        const userTokens = await this.ormRepository.findOne({
            where: { token },
        });

        return userTokens;
    }

    public async generate(user_id: string): Promise<UserTokens> {
        const userToken = this.ormRepository.create({
            user_id,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
