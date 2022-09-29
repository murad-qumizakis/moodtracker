import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
   
    user: "root",
    database: "moodtracker",
    password: "Murad19112001!"
}).promise();

// process.env.MYSQL_HOST,
// process.env.MYSQL_USER,
// process.env.MYSQL_DATABASE,
// process.env.MYSQL_PASSWORD,

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
