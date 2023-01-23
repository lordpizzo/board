import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import firesotreDB from '../../../services/firebaseConnection'
import { collection, addDoc, doc, getDoc, query, getDocs, orderBy, where, deleteDoc, updateDoc } from "firebase/firestore";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUT_CLIENT_ID!,
			clientSecret: process.env.GITHUT_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.accessToken = token.accessToken
			session.user.id = token.id

			const usersCollection = collection(firesotreDB, "users")
			const userDocRef = doc(usersCollection, session.user.email)
			const lastDonate = await getDoc(userDocRef).then(doc => {
				return doc.data()?.lastDonate.toDate()
			}).catch(error => {
				return null
			})

			session.vip = lastDonate !== null ? true : false
			session.lastDonate = lastDonate
			return session
		},

		async signIn({ user, account, profile, email, credentials }) {
			const isAllowedToSignIn = true
			if (isAllowedToSignIn) {
				return true
			} else {
				// Return false to display a default error message
				return false
				// Or you can return a URL to redirect to:
				// return '/unauthorized'
			}
		}
	}
}

export default NextAuth(authOptions)
