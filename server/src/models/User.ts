import Role from "./Role";

export default class User {
    id: string;
    name: string;
    email: string;
    role: Role;
    groupId: string;

    constructor(id: string, name: string, email: string, role: Role, groupId: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.groupId = groupId;
    }
}