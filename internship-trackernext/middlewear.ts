import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|static|.*\\..*).*)', // Basic exclusion for static files and Next.js internals
    '/(api|trpc)(.*)', // Always run for API routes
  ],
};