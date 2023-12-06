import { v4 } from 'uuid'
import { IUser } from "../models/user";
import { pool } from "./pool";

export async function getUserByUsername(username: string) {
    const query = `
        SELECT * FROM public.users
        WHERE username = $1  
    `;

    const values = [username];

    try {
        const result = await pool.query(query, values);
        if (result.rows.length) {
            return result.rows[0] as IUser;
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error inserting user:', err);
        throw err;
    }
}

export async function insertUser(user: IUser): Promise<void> {
    const { username, email, password, firstName, lastName, dateOfBirth, isActive = true } = user;

    const query = `
        INSERT INTO public.users (id, username, email, password, is_active)
        VALUES ($1, $2, $3, $4, $5)
    `;

    const id = v4();

    const values = [id, username, email, password, true];

    try {
        await pool.query(query, values);
        console.log('User inserted successfully');
    } catch (err) {
        console.error('Error inserting user:', err);
        throw err;
    }
}