"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = migrate;
const db_1 = require("./db");
async function migrate() {
    await (0, db_1.query)(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    // Create roles table
    await (0, db_1.query)(`
    CREATE TABLE IF NOT EXISTS roles (
      id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL UNIQUE
    );
  `);
    // Create groups table
    await (0, db_1.query)(`
    CREATE TABLE IF NOT EXISTS groups (
      id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL UNIQUE
    );
  `);
    // Create users table
    await (0, db_1.query)(`
    CREATE TABLE IF NOT EXISTS users (
      id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name     TEXT NOT NULL,
      email    TEXT NOT NULL UNIQUE,
      role_id  UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
      group_id UUID REFERENCES groups(id) ON DELETE SET NULL
    );
  `);
}
