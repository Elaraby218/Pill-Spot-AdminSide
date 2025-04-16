import {z} from 'zod' ;

export const signUpSchema = z.object({
    firstName: z.string().trim().min(3,{message:"First name should be at least 3 chars"}),
    lastName : z.string().trim().min(3,{message:"Last name should be at least 3 chars"}),
    email : z.string().trim().min(10,{message:"Email is required"}).email({message:"Invalid Email"}), 
    password : z.string().trim().min(8,{message:"Password should be at least 8 chars"})
})