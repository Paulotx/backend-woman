interface IMailConfig {
    driver: 'ethereal' | 'smtp';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'contato@projetobertha.com.br',
            name: 'Projeto Bertha',
        },
    },
} as IMailConfig;
