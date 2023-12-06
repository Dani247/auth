export interface IUser {
    id?: string;             // Unique identifier for the user
    username: string;       // Username of the user
    email: string;          // Email address of the user
    password: string;       // Hashed password (never store plain-text passwords)
    firstName?: string;      // User's first name
    lastName?: string;       // User's last name
    dateOfBirth?: Date;     // Date of birth (optional)
    createdAt?: Date;        // Timestamp of when the user account was created
    updatedAt?: Date;        // Timestamp of the last update to the user account
    isActive?: boolean;      // Flag to indicate if the user account is active
    // Additional fields can be added as needed
}