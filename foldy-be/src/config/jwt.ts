// Import the jsonwebtoken module
import jwt from 'jsonwebtoken';

// Load JWT secret and expiration time from environment variables
const jwtSecret = process.env.JWT_SECRET || 'default_secret'; // Secret key for signing tokens
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d'; // Expiration time for tokens

// Function to sign a JWT with a payload
const signToken = (payload: object) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn }); // Sign and return the token
};

// Function to verify a JWT token
const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret); // Verify and return the decoded token
  } catch (error) {
    throw new Error('Invalid token'); // Throw an error if the token is invalid
  }
};

// Export the signing and verification functions
export { signToken, verifyToken };
