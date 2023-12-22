import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ["isihaqabdullahi01@gmail.com"];

export const authOptions = {
  secret: "AIzaSyC7u52oqCUeQLBd7m6WrWF9wtBBsISJLkE",
  providers: [
    GoogleProvider({
      clientId:
        "613376763309-aaejp6psih593ojik5uiqth5mok4qf5b.apps.googleusercontent.com",
      // process.env.GOOGLE_ID,
      clientSecret: "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",
      // api Key: "AIzaSyC7u52oqCUeQLBd7m6WrWF9wtBBsISJLkE",
      // process.env.GOOGLE_SECRET,
    }),
  ],
  // mfhjloaeznxnohqa
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}
