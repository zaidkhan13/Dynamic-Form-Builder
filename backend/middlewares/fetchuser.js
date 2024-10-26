import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();
const secret = process.env.JWT_SECRET;

// Middleware function to authenticate users using a JWT
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token"); // Retrieve the token from the 'auth-token' header of the request

  // If no token is found in the request header, return an error response with status 401 (Unauthorized)
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token!" });
  }

  try {
    const data = jwt.verify(token, secret); // Verify the token using the secret key; if valid, decode the token and get the user data
    req.user = data.user; // Attach the user data to the request object (so other middleware or routes can access the user info)
    next(); // Call next() to pass control to the next middleware or route handler
  } catch (error) {
    // If the token is invalid or verification fails, return an error response with status 401 (Unauthorized)
    res.status(401).send({ error: "Please authenticate using valid token!" });
  }
};

export default fetchUser;
