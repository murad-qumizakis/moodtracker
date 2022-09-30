import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    database: process.env.MYSQLDATABASE,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT
}).promise();


export async function getMoods() {
    const [result] =  await pool.query("SELECT * FROM moods");
    return result
}

export async function deleteMood(id) {
    const [result] = await pool.query("DELETE FROM moods WHERE id = ?", [id]);
    return result
}

export async function addMood(mood, rating) {
    const [result] = await pool.query("INSERT INTO moods (note, rating) VALUES (?, ?)", [mood, rating]);
    return result
}

export async function editMood(id, mood, rating) {
    const [result] = await pool.query("UPDATE moods SET note = ?, rating = ? WHERE id = ?", [mood, rating, id]);
    return result
}
