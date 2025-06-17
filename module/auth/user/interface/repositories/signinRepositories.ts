import { UserSignup } from "../../domain/userSignup"

export interface SigninRepo{
    findUser(email:string):Promise<UserSignup| null>;
}