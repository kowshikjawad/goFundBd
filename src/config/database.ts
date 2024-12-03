// src/config/database.ts
// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT) || 5432,
// });

// export default pool;

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

// Create a new PostgreSQL pool
const pool = new Pool({ connectionString });

// Specify the PostgreSQL schema
const adapter = new PrismaPg(pool, {
  schema: "myschema", // Replace 'myPostgresSchema' with your desired schema name
});

// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
