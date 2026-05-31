import {NextResponse} from "next/server";

const AUTH_COOKIE_NAME = "furns_session";

export function middleware(request) {
    if (request.cookies.has(AUTH_COOKIE_NAME)) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", `${request.nextUrl.pathname}${request.nextUrl.search}`);

    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        "/admin",
        "/admin/orders/:path*",
        "/admin/products/:path*",
        "/admin/audit-logs",
        "/account/orders/:path*",
        "/checkout",
    ],
};
