import {Client, Messaging, Storage, TablesDB, Users} from "node-appwrite";

export const {
    PROJECT_ID, API_KEY, DATABASE_ID, PATIENT_TABLE_ID, DOCTOR_TABLE_ID, APPOINTMENT_TABLE_ID,
    NEXT_PUBLIC_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env;

const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!)

export const tablesDB = new TablesDB(client)
export const storage = new Storage(client)
export const messaging = new Messaging(client)
export const users = new Users(client)
