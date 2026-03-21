import Database from "pocketbase";

const database = process.env.NEXT_PUBLIC_DATABASE_API!;

export const db = new Database(database);
