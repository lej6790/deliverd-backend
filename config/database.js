const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 3306),
        dialect: process.env.DB_DIALECT || 'mariadb',
        dialectModule: require('mysql2'),
        logging: false,
        timezone: process.env.DB_TIMEZONE || '+09:00',
        pool: { max: 10, min: 0, acquire: 20000, idle: 10000 },
        dialectOptions: { dateStrings: true, typeCast: true },
        define: { timestamps: true, freezeTableName: false }
    }
);

module.exports = sequelize;