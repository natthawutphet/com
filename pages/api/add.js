import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // สมมติว่าคุณส่งข้อมูลเป็น JSON ใน body ของ request
    const { title, headline, img, youtube, content } = req.body;
    
    try {
      const query = `
        INSERT INTO post (title, headline, img, youtube, content) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await connection.query(query, [title, headline, img, youtube, content]);
      res.status(200).json({ message: 'Data added successfully', id: result.insertId });
    } catch (err) {
      console.error('Error while inserting data', err);
      res.status(500).json({ message: 'Error adding data to the database' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
