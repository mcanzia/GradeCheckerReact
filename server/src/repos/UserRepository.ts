import { query } from "../database/db";
import User from "../models/User";
import Role from "../models/Role";

export default class UserRepository {
    async getAllUsers(): Promise<User[]> {
        try {
            const result = await query(
                `SELECT u.id, u.name, u.email, u.group_id,
                r.id as role_id, r.name as role_name
         FROM users u
         LEFT JOIN roles r ON u.role_id = r.id`
            );

            return result.rows.map(
                (row: any) =>
                    new User(
                        row.id,
                        row.name,
                        row.email,
                        new Role(row.role_id, row.role_name),
                        row.group_id
                    )
            );
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            const result = await query(
                `SELECT u.id, u.name, u.email, u.group_id,
                r.id as role_id, r.name as role_name
         FROM users u
         LEFT JOIN roles r ON u.role_id = r.id
         WHERE u.id = $1`,
                [id]
            );

            if (result.rows.length === 0) return null;

            const row: any = result.rows[0];
            return new User(
                row.id,
                row.name,
                row.email,
                new Role(row.role_id, row.role_name),
                row.group_id
            );
        } catch (error) {
            throw error;
        }
    }

    async saveUser(user: User): Promise<User> {
        try {
            const result = await query(
                `INSERT INTO users (name, email, role_id, group_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, role_id, group_id`,
                [user.name, user.email, user.role.id, user.groupId]
            );

            const row: any = result.rows[0];
            return new User(row.id, row.name, row.email, user.role, row.group_id);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(user: User): Promise<void> {
        try {
            await query(`DELETE FROM users WHERE id = $1`, [user.id]);
        } catch (error) {
            throw error;
        }
    }
}
