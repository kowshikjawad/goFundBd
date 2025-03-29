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
