import Link from "next/link";
import Image from "next/image";

// Importing the image file into js file will allow to add extra properties to Image component e.g. quality prop
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* In Next.js projects can easily point to public folder when adding src links and select image file stored inside */}
      {/* Use the Image component from next to auto add image optimisation features - will auto define srcset values and add lazy loading attribute and convert to webp format for modern browsers etc */}
      {/* Need to add the height and width inline values in-order for the component to set the srcset values */}
      <Image
        src={logo}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        quality={100}
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
