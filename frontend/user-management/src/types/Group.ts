import { User } from "@/types/User";

export interface Group {
    id: string;
    name: string;
    users: User[];
}