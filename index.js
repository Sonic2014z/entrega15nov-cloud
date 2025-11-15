import mysql2 from 'mysql2/promise';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

app.get('/', async (req, res) => {
    try {
        const connection = await mysql2.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM integrantes");
        await connection.end();

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener integrantes');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});