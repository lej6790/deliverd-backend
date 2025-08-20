// .env 파일을 불러와 process.env에 환경 변수를 세팅
require('dotenv').config();

// 서버 생성
const express = require('express');
// 보안 헤더 설정
const helmet = require('helmet');
// 프론트엔드와의 교차 출처 요청 허용
const cors = require('cors');
// 쿠키 파싱
const cookieParser = require('cookie-parser');
// config/database.js에서 만든 Sequelize 인스턴스 (MariaDB 연결용)
const sequelize = require('./config/database');

// Express 애플리케이션 인스턴스 생성
const app = express();

// 보안 헤더 추가
app.use(helmet());
// JSON 바디 파싱
app.use(express.json());
// 쿠키 사용 가능하게 설정
app.use(cookieParser());
// CORS_ORIGIN 환경 변수를 쉼표 구분으로 받아 여러 도메인을 허용 가능.
app.use(cors({
  origin: (process.env.CORS_ORIGIN || '').split(',').filter(Boolean).length
    ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) : true,
  credentials: true
}));

// Health check
// 서버 상태 확인용 API.
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// const authRouter = require('./routes/auth');
// app.use('/api/auth', authRouter);

// DB 연결 확인 로그를 찍어서 DB 연결 정상 여부를 체크.
sequelize.authenticate()
  .then(() => console.log('MariaDB connection success'))
  .catch((err) => console.log('MariaDB connection failure:', err.message));

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
