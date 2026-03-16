import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials) {

        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin" };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
};