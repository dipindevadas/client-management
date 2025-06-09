export type client ={
    id: number,
    name: string,
    email: string,
    password: string,
    job?: string,
    rate?: number,
    isactive: boolean,
    created_at?: Date,
    updated_at?: Date
}