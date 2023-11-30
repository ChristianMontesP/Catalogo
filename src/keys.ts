export default {

    database: {
        dialec: process.env.DIALECT,
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: Boolean(process.env.SSL)
    }

}
