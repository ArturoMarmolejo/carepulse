"use server"

import {AppwriteException, ID, Query} from "node-appwrite";
import {users} from "@/lib/appwrite.config";
import {parseStringify} from "@/lib/utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create({
            userId: ID.unique(),
            email: user.email,
            phone: user.phone,
            name: user.name
        })
        return parseStringify(newUser)
    } catch (error) {
        // 409 = a user with this email or phone already exists => return that user instead
        if(error instanceof AppwriteException && error.code === 409) {
            const existing  = await users.list({
               queries: [Query.equal('email', [user.email])]
            })

            return parseStringify(existing.users[0])
        }
        console.error("createUser failed: ", error)
        throw error
    }
}