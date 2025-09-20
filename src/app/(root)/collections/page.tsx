import Image from "next/image";

export default function CollectionsPage() {
  return (
    <div>
      <div className="mb-12">
        <Image
          src="/contact-hero.png"
          alt="Collections Hero Image"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Our Collections
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover our exclusive collections, curated just for you.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div className="group relative">
            <div className="relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <Image
                src="/shoes/causual-theme.avif"
                alt="Casual Collection"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-300 group-hover:bg-black/50">
                <button className="bg-black text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full px-6 py-3">
                  View Collection
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-gray-500">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    Casual
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Effortless style for everyday comfort.
                </p>
              </div>
            </div>
          </div>
          <div className="group relative">
            <div className="relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <Image
                src="/shoes/sneaker-theme.avif"
                alt="Sneaker Collection"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-300 group-hover:bg-black/50">
                <button className="bg-black text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full px-6 py-3">
                  View Collection
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-gray-500">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    Sneaker
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Iconic designs for the street and beyond.
                </p>
              </div>
            </div>
          </div>
          <div className="group relative">
            <div className="relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <Image
                src="/shoes/sports-theme.avif"
                alt="Sports Collection"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-300 group-hover:bg-black/50">
                <button className="bg-black text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full px-6 py-3">
                  View Collection
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-gray-500">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    Sports
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Performance-driven gear for the athlete in you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
