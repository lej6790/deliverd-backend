// dotenv 패키지를 사용해서 프로젝트 루트에 있는 .env 파일을 읽어 환경 변수로 등록
require('dotenv').config();

// Sequelize ORM을 호출
// DB 연결 및 쿼리를 ORM 방식으로 수행 가능하게 함
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 3306),
        dialect: process.env.DB_DIALECT || 'mariadb',
        logging: false,
        timezone: process.env.DB_TIMEZONE || '+09:00',
        pool: { max: 10, min: 0, acquire: 20000, idle: 10000 },
    }
);

module.exports = sequelize;