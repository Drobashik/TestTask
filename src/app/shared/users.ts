export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    position?: string;
    position_id: number;
    registration_timestamp?: number;
    photo: File;
    user_id: number
}

export interface ILink {
    success: boolean;
    total_pages: number;
    count: number;
    page: number;
    links: {
        next_url: string;
        prev_url?: string
    };
    users: IUser[]
    user: IUser
}

export interface IToken {
    success: boolean;
    token: string;
}