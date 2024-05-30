import NextAuth from 'next-auth';
import Auth0Provider from "next-auth/providers/auth0";
console.log(NextAuth)
export const authOptions = {
  debug: true,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    }
  },
}
const handler = NextAuth(authOptions);
export default handler

export { handler as GET, handler as POST };