import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">

        {/* Badge */}
        <div className="mb-6 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted">
          Software · Drivers · Technology
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover the software
          <span className="block">
            you need.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Find software, drivers, tutorials and useful technology
          resources in one place.
        </p>
        <SearchBar />

      </div>
    </section>
  );
}