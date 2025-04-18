import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";




export type CustomerSession = {
    user?: CustomerUser,
    expires: ISODateString
}
export type CustomerUser = {
    id?: string | null,
    name?: string | null,
    email?: string | null,
    image?: string | null,
    provider?: string | null,
    token?: string | null,
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: '/',

    },

    callbacks: {
        async signIn({
             user, 
             account 
            }) {
            console.log("The User", user)
            console.log("The Account", account)
            return true
        },
        // async redirect({ url, baseUrl }) {
        //     return baseUrl
        // },
        async session({
            session,
            user,
            token
        }: {
            session: CustomerSession,
            user: CustomerUser,
            token: JWT
        }) {
            session.user = token.user as CustomerUser
            return session
        },
        async jwt({
            token,
            user
        }) {
            if (user) {
                token.user = user
            }
            return token
        }

    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

    ]
}