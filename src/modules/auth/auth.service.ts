
import { Request } from "express";
import { auth } from "../../lib/auth"

const register = async (data: any) => {
    return auth.api.signUpEmail(data);
}

const login = async (data: any) => {
    return auth.api.signInEmail(data);
}

const me = async (req: Request) => {
    return auth.api.getSession({
        headers: req.headers as any
    });
}

export const authService = {
    register,
    login,
    me
}