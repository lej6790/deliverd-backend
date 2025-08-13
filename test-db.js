require('dotenv').config();
const sequelize = require('./config/database');

(async () => {
  try {
    await sequelize.authenticate();
    const [rows] = await sequelize.query('SELECT 1 AS ok;');
    console.log('DB OK:', rows);
    process.exit(0);
  } catch (e) {
    console.error('DB ERROR:', e.message);
    process.exit(1);
  }
})();