import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
    token?: string;
    name?: string;
    email?: string;
}

interface AuthUser {
    id: string;
    token: string;
    name: string;
    email: string;
}

export interface CustomSession extends Session {
    user: {
        id?: string;
        token?: string | null;
        name?: string | null;
        email?: string | null;
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo tuempresa@dominio.com", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials.email) {
                    console.log('Credenciales nulas');
                    return null;
                }

                const loginRequest: ILoginRequest = {
                    email: credentials.email,
                    password: credentials.password,
                };

                try {
                    const authService = new AuthService();
                    const response = await authService.login(loginRequest);

                    const idString = response.data.user.id.toString();

                    

                    return {
                        id: idString,
                        token: response.data.access_token,
                        name: response.data.user.email,
                        email: response.data.user.email,
                    } as AuthUser;

                    

                } catch (error) {
                    console.log(error);
                    return Promise.reject(new Error(JSON.stringify(error)));
                }
            }
        }),
        
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.token = authUser.token;
                token.name = authUser.name;
            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            customSession.user.token = (token as AuthToken).token;
            customSession.user.name = (token as AuthToken).name;

            return customSession;
        },
    },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);