import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // Need to include callbacks key with an authorized function included - authorized function will return either true or false
  // Next.JS will call authorized function each time middleware.js function runs on matched route
  callbacks: {
    authorized({ auth, request }) {
      // !! converts a value to a boolean in JS
      return !!auth?.user;
      // If user is not logged in (not authorized) middleware.js function will auto redirect to log in page
    },
    // signIn function here will execute after login credentials have been provided but before the user is logged in
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch (err) {
        return false;
      }
    },
    // session callback function will run directly after the above signIn callback and each time session has checked out
    async session({ session, user }) {
      // callback allows to grab user id value from DB and store to session object used in auth.js
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      // return the updated session object so it can be used in any component in app that needs it
      return session;
    },
  },
  // Add pages key to config object to specify which route should be rendered in Next.js app under certain situations
  pages: {
    // When authorized function returns false to redirect to sign in page can instead specify a set route to redirect to
    signIn: "/login", // will redirect to login page route in app
  },
};

export const {
  // auth variable extracted from NextAuth function can be used and imported into any server component and will provide info logged in user
  auth,
  // Can export the signIn and signOut functions to attach to custom JSX elements in any page.js file
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
