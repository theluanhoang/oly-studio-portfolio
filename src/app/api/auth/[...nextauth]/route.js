import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';
import { checkRateLimit, recordFailedLogin, recordSuccessfulLogin } from '@/lib/rateLimit';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET must be set in environment variables');
}

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in environment variables');
}

const baseAuthHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.username === adminUsername &&
          credentials?.password === adminPassword
        ) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@oly-studio.com',
            role: 'admin',
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  events: {
    async signIn({ user, account, profile }) {
      if (user) {
        console.log(`[AUTH] Successful login: ${user.email || user.name}`);
      }
    },
    async signOut({ session, token }) {
      console.log('[AUTH] User signed out');
    },
  },
});

async function GET(req, context) {
  return baseAuthHandler(req, context);
}

async function POST(req, context) {
  const url = req.nextUrl;
  
  if (url.pathname.includes('/callback/credentials')) {
    const rateLimitCheck = checkRateLimit(req);
    
    if (!rateLimitCheck.allowed) {
      const errorUrl = new URL('/admin/login', req.url);
      errorUrl.searchParams.set('error', 'CredentialsSignin');
      errorUrl.searchParams.set('error_description', encodeURIComponent(rateLimitCheck.message));
      return NextResponse.redirect(errorUrl);
    }
  }

  try {
    const response = await baseAuthHandler(req, context);
    
    if (response instanceof Response && url.pathname.includes('/callback/credentials')) {
      const location = response.headers.get('location') || '';
      
      if (location.includes('error') || location.includes('signin')) {
        recordFailedLogin(req);
      } else if (location && !location.includes('signin') && !location.includes('error')) {
        recordSuccessfulLogin(req);
      }
    }
    
    return response;
  } catch (error) {
    if (url.pathname.includes('/callback/credentials')) {
      recordFailedLogin(req);
    }
    throw error;
  }
}

export { GET, POST };

