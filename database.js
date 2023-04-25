import mysql from 'mysql2'

import  dotenv from 'dotenv'
dotenv.config()

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//export default pool


export async function getProfile(id) {
    const [rows] = await pool.query(`
    SELECT * FROM profiles WHERE userID = ?`, [id])
    return rows[0]
}


export async function getProfiles() {
    constant [rows] = await pool.query ("SELECT * FROM profiles")
    return rows
}