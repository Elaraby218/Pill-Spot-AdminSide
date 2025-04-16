import {z} from 'zod'

export const loginSchema = z.object({
    userName : z.string().trim().min(3,{message : "User name must be at least 3 characters"}) ,
    password : z.string().trim().min(1,{message:"Password cannot be empty!"})
})