namespace DefaultNamespace;

import { NextRequest, NextResponse } from "next/server";

const API_BASE =
process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5012";

export async function middleware(request: NextRequest) {
const { pathname } = request.nextUrl;

if (!pathname.startsWith("/admin")) {
return NextResponse.next();
}

const res = await fetch(`${API_BASE}/api/user/isadmin`, {
    headers: {
        cookie: request.headers.get("cookie") || "",
    },
});

if (!res.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
}

const isAdmin = await res.json();

if (!isAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
}

return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};