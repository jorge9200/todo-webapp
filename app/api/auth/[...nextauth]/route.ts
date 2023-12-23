import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { promises as fs } from "fs";
import { User } from "@/types/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const jsonData = await fs.readFile(
            process.cwd() + "/app/data.json",
            "utf8"
          );
          const objectData = JSON.parse(jsonData);
          const user = objectData.users.filter(
            (user: User) =>
              user.email === credentials.email &&
              user.password === credentials.password
          );
          // Bypass regular login to allow all logins to work (Exercise requirements)
          return {
            email: "alwaysLogged@mail.com",
            password: "ImAlwaysLogged",
          };
          return user[0];
        } catch (error) {
          console.error("Failed to fetch user:", error);
          throw new Error("Failed to fetch user.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
