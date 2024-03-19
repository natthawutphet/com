// pages/api/delete.js
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body; // สมมติว่าใช้ id เป็น key ในการลบ
    try {
      const query = 'DELETE FROM post WHERE id = ?';
      const [result] = await connection.query(query, [id]);
      res.status(200).json({ message: 'Data deleted', result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting data' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
