import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes to be protected
const isProtectedRoute = createRouteMatcher([
    "/settings(.*)",
    "/" // Just as the settings page, the home page is also protected, to allow the page to be visible only after the user logs in
]);

export default clerkMiddleware((auth, req) => {
    // Check the user Auth status and the user request | If the route is protected and hte use ris not authenticated, then prevent access
    if(isProtectedRoute(req)) auth().protect(); // Un authenticated  users would be redirected to the login page
    
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};