import User from "./User";

export default class Group {
    id: string;
    name: string;
    users: User[]

    constructor(id: string, name: string, users: User[]) {
        this.id = id;
        this.name = name;
        this.users = users;
    }
}