import { query } from "../database/db";
import Role from "../models/Role";

export default class RoleRepository {
    async getAllRoles(): Promise<Role[]> {
        try {
            const result = await query(`SELECT id, name FROM roles ORDER BY name`);
            return result.rows.map((row: any) => new Role(row.id, row.name));
        } catch (error) {
            throw error;
        }
    }

    async getRoleById(id: string): Promise<Role | null> {
        try {
            const result: any = await query(
                `SELECT id, name FROM roles WHERE id = $1`,
                [id]
            );

            if (result.rows.length === 0) return null;
            const row = result.rows[0];
            return new Role(row.id, row.name);
        } catch (error) {
            throw error;
        }
    }

    async saveRole(name: string): Promise<Role> {
        try {
            const result: any = await query(
                `INSERT INTO roles (name)
         VALUES ($1)
         RETURNING id, name`,
                [name]
            );

            const row = result.rows[0];
            return new Role(row.id, row.name);
        } catch (error) {
            throw error;
        }
    }

    async deleteRole(id: string): Promise<void> {
        try {
            await query(`DELETE FROM roles WHERE id = $1`, [id]);
        } catch (error) {
            throw error;
        }
    }
}
