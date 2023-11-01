import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000", "https://vaibhavshindevs333.wordpress.com"],
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));
app.use(express.static(path.join(__dirname, "public/assets")));
// Serve the React build files
app.use(express.static(path.join(__dirname, 'build')));

/* ROUTES */
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/auth/register", authRoutes);
app.use("/auth/login", authRoutes);
app.use("/users", userRoutes);
app.use("/users/:id", userRoutes);

app.use("/users/getAllUser", userRoutes);

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
  // You can add custom error handling or logging here
});

// Access environment variables
const mongoUrl = process.env.MONGODB_URL;

// Set your database connection string
app.set('mongoUrl' || 'MONGODB_URL');

// Access these settings later in your application
app.get('mongoUrl');

// Use these values as needed in your application
console.log(`DB Connection String: ${mongoUrl}`);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));

  // Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});
  
const client = new MongoClient(mongoUrl);
const dbName = "account"

const connectToMongoDB = async () => {
    try {
      // Connect to the MongoDB server
      await client.connect();
      // Get the list of database names
      const databaseslist = await client.db(dbName).admin().listDatabases();
      // Extract and log the database names
      console.log('Databases list:');
      databaseslist.databases.forEach((db) => {console.log(`- ${db.name}`)});
      console.log(`Connected to Database: ${dbName}`);
    } catch (error) {
      console.error(`Error connecting to MongoDB: `, error);
    }
  }
  // Call the function to retrieve database names
  connectToMongoDB();
