import { Star } from "lucide-react";

export function AvatarStack() {
  const initials = ["test1", "test2", "test3", "test4", "test5"];
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {initials.map((i) => (
          <picture key={i} className="lg:h-12 h-8 w-8 lg:w-12">
            <img
              src={`/${i}.jpg`}
              className="w-full h-full object-cover rounded-full border-2 border-stone-50 bg-stone-300 flex items-center justify-center text-xs font-semibold text-stone-700 ring-1 ring-stone-400"
              alt={`Avatar for ${i}`}
            />
          </picture>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-yellow-500 text-yellow-500"
            />
          ))}
        </div>
        <span className="text-sm text-stone-700 font-medium mt-0.5">
          50+ Happy Clients
        </span>
      </div>
    </div>
  );
}
