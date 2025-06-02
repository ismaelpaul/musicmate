import { authOptions } from '@/lib/auth/authOptions';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/'];

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: authOptions.secret });

	const isProtected = protectedRoutes.some((route) =>
		req.nextUrl.pathname.startsWith(route)
	);

	if (isProtected && !token) {
		const loginUrl = new URL('/login', req.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/((?!_next|api|login|favicon.ico).*)'],
};
