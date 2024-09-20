import Image from "next/image";
import imgOne from "@/public/about-1.jpg";
import { getCabins } from "../_lib/data-service";
// import imgTwo from "@/public/about-2.jpg";

export const metadata = {
  title: "About", // Will set the page title as About
};

// Changes page component to be dynamic - will re-cache data on each refresh
// export const dynamic = "force-dynamic";

// Sets the page component to to keep stored cache for 24 hours, will then refetch after this
export const revalidate = 86400; // 24 hours in secs

export default async function Page() {
  const cabins = await getCabins();
  const numCabins = cabins.length;

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {numCabins} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={imgOne}
          placeholder="blur"
          alt="Family sitting around a fire pit in front of cabin"
          quality={80}
        />
      </div>

      {/* For images which are dynamically added to component (not imported to file) can set aspect-ratio of parent holding image to fill the space and then use fill prop to set image to fill entire space - don't need to set width and height as will be unknown when component first mounts */}
      <div className="relative aspect-square col-span-2">
        <Image
          src="/about-2.jpg"
          fill
          // placeholder="blur" - can't use placeholder with static src images (need to import image into file first)
          className="object-cover"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}