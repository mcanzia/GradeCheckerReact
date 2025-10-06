import { query } from "../database/db";
import Group from "../models/Group";
import User from "../models/User";
import Role from "../models/Role";

export default class GroupRepository {
    async getAllGroups(): Promise<Group[]> {
        try {
            const result = await query(`
        SELECT g.id as group_id, g.name as group_name,
               u.id as user_id, u.name as user_name, u.email as user_email,
               r.id as role_id, r.name as role_name
        FROM groups g
        LEFT JOIN users u ON g.id = u.group_id
        LEFT JOIN roles r ON u.role_id = r.id
        ORDER BY g.name, u.name
      `);

            const groupMap = new Map<string, Group>();

            result.rows.forEach((row: any) => {
                if (!groupMap.has(row.group_id)) {
                    groupMap.set(row.group_id, new Group(row.group_id, row.group_name, []));
                }

                if (row.user_id) {
                    const user = new User(
                        row.user_id,
                        row.user_name,
                        row.user_email,
                        new Role(row.role_id, row.role_name),
                        row.group_id
                    );
                    groupMap.get(row.group_id)!.users.push(user);
                }
            });

            return Array.from(groupMap.values());
        } catch (error) {
            throw error;
        }
    }

    async getGroupById(id: string): Promise<Group | null> {
        try {
            const result: any = await query(
                `
        SELECT g.id as group_id, g.name as group_name,
               u.id as user_id, u.name as user_name, u.email as user_email,
               r.id as role_id, r.name as role_name
        FROM groups g
        LEFT JOIN users u ON g.id = u.group_id
        LEFT JOIN roles r ON u.role_id = r.id
        WHERE g.id = $1
        `,
                [id]
            );

            if (result.rows.length === 0) return null;

            const group = new Group(result.rows[0].group_id, result.rows[0].group_name, []);

            result.rows.forEach((row: any) => {
                if (row.user_id) {
                    group.users.push(
                        new User(
                            row.user_id,
                            row.user_name,
                            row.user_email,
                            new Role(row.role_id, row.role_name),
                            row.group_id
                        )
                    );
                }
            });

            return group;
        } catch (error) {
            throw error;
        }
    }

    async addUserToGroup(groupId: string, userId: string): Promise<void> {
        try {
            await query(
                `UPDATE users
         SET group_id = $1
         WHERE id = $2`,
                [groupId, userId]
            );
        } catch (error) {
            throw error;
        }
    }

    async removeUserFromGroup(userId: string): Promise<void> {
        try {
            await query(
                `UPDATE users
         SET group_id = NULL
         WHERE id = $1`,
                [userId]
            );
        } catch (error) {
            throw error;
        }
    }

    async saveGroup(name: string): Promise<Group> {
        try {
            const result: any = await query(
                `INSERT INTO groups (name) VALUES ($1)
         RETURNING id, name`,
                [name]
            );

            const row = result.rows[0];
            return new Group(row.id, row.name, []);
        } catch (error) {
            throw error;
        }
    }

    async deleteGroup(id: string): Promise<void> {
        try {
            await query(`DELETE FROM groups WHERE id = $1`, [id]);
        } catch (error) {
            throw error;
        }
    }
}
