export type TODO = {
    id: string;
    title: string;
    body: string | null;
    completed: boolean;
    createdAt?: Date;
    userId?: string
}