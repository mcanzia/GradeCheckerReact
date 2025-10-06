"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
class UserRepository {
    async getAllUsers() {
        try {
        }
        catch (error) {
            throw error;
        }
    }
    async getUserById(id) {
        try {
            const user = await (0, db_1.query)(`SELECT * FROM users WHERE id = $1`, [id]);
        }
        catch (error) {
            throw error;
        }
    }
    async saveUser(user) {
        try {
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(user) {
        try {
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UserRepository;
