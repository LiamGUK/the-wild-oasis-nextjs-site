// Every Next.js app needs to have 1 global route layout file (called root layout)
// If no layout.js file is detected inside app folder Next.js will auto create it on next render cycle
// All route endpoints will be rendered as a child to the root layout file

// Alias importing using @ supported in Next.js - defined in jsonconfig.json file
import Header from "@/app/_components/Header";
import { ReservationProvider } from "@/app/_components/ReservationContext";

// Add Google fonts to app via Next.js fonts package (part of next) - add in google font name wanting to use in {} add _ for spaces
import { Josefin_Sans } from "next/font/google";

// Assign font to a variable and pass in object of options for font
const josefin = Josefin_Sans({
  subsets: ["latin"], // Sets the font version to use latin variant
  display: "swap", // Adds swap option so text will be rendered first and then swapped with font type after load
  // weight: ["300", "400", "600", "800"],
});

// Logging the font function call will display the set className for font - need to add this class to JSX in order to use font type
// console.log(josefin);

// import global CSS styles in the layout.js file as where all components are rendered
import "@/app/_styles/globals.css";

// Can specify values to render inside html head element using the metadata variable which should store an object of values.
// Text values should never be added to html head element directly in component below, should always be added to metadata object
export const metadata = {
  //title: "The Wild Oasis", // defines the title tag value
  // If wanting to attach a string value to all pages title text can pass an object and supply a template value - %s is a placeholder and will replace with whatever title value is on each page
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  // Meta description text
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",

  // Fav icons are set by adding an img file directly inside the app folder and named as icon
};

// layout.js needs to return a component (usually called RootLayout) which will return the html elements and nest body tag to render React components into
function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Add font className to body element to use Google font in entire app */}
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        {/* Global Header to share header logo and navigation component on all pages in app */}
        <Header />
        {/* The children prop will auto load the page.js file on whichever route is trying to be loaded - e.g. root page '/' will load the page.js file directly in app folder */}
        <div className="flex-1 px-8 py-12 grid">
          <main className="w-full max-w-7xl mx-auto">
            {/* As wrapping a client component around the children prop, server components will already have been rendered through importing process so what be affected by the parent being a client component */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
