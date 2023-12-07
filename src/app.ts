import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors'
import { getUserByUsername, insertUser } from './db/user';
import { generateAccessToken, generateRefreshToken } from './jwt';

const app = express();
app.use(express.json());
app.use(cors())

app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Retrieve user from the database
    const user = await getUserByUsername(username); // Replace with your database retrieval logic
    if (!user) {
        return res.status(401).send('User not found');
    }

    // Compare provided password with stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send('Invalid password');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Respond with tokens
    res.json({ accessToken, refreshToken });
});


app.post('/register', async (req: Request, res: Response) => {
    try {
        // Extract user details from request body
        const { username, email, password, firstName, lastName, dateOfBirth } = req.body;
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Call the function to insert the new user
        await insertUser({ username, email, password: hashedPassword, firstName, lastName, dateOfBirth });
        // Respond with success message
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Error registering the user');
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));