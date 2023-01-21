import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUT_CLIENT_ID!,
      clientSecret: process.env.GITHUT_CLIENT_SECRET!,
    }),
  ],
}

export default NextAuth(authOptions)
