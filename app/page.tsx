import FeaturedSoftware from "@/components/home/FeaturedSoftware";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main  className="w-full flex-1">
      <Hero />

      <FeaturedSoftware />
    </main>
  );
}