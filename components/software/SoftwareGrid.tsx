import { softwareList } from "@/data/software";
import SoftwareCard from "./SoftwareCard";

export default function SoftwareGrid() {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {softwareList.map((software) => (
        <SoftwareCard
          key={software.id}
          software={software}
        />
      ))}
    </div>
  );
}