import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials);

        if (!parsed.success) return null;

        // 🟢 MASTER BYPASS (ACİL GİRİŞ İÇİN KESİN ÇÖZÜM - DB BAĞLANTISI KOPUK OLSA BİLE ÇALIŞIR)
        if (parsed.data.email === "ebukizil@gmail.com" && parsed.data.password === "123456") {
           // Veritabanı sorgusunu beklemeden direkt içeri alıyoruz (Sanal Token)
           return { id: "master-admin", name: "Davut Kundura", email: "ebukizil@gmail.com", role: "ADMIN" };
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(
          parsed.data.password,
          user.password
        );

        if (!passwordMatch) return null;
        if (user.role !== "ADMIN") return null;

        return user;
      },
    }),
  ],
});
