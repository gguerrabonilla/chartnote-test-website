import { NextResponse } from "next/server";

const aliases = {
  "/aiscribe": "/aiScribe",
  "/voicechart": "/voiceChart",
  "/privacypolicy": "/privacyPolicy",
  "/termsofuse": "/termsOfUse",
  "/fairuse": "/fairUse",
};

const legacyPages = new Set(["/demo", "/acp2026", "/playbook"]);

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  if (legacyPages.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/index.html`;
    return NextResponse.rewrite(url);
  }
  const destination = aliases[pathname];
  if (!destination || destination === pathname) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/aiscribe",
    "/voicechart",
    "/privacypolicy",
    "/termsofuse",
    "/fairuse",
    "/demo",
    "/acp2026",
    "/playbook",
  ],
};
