import { Star } from "lucide-react";

export function AvatarStack() {
  const initials = ["AK", "BM", "CL", "DR", "EH"];
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {initials.map((init, i) => (
          <div
            key={i}
            className="w-11 h-11 rounded-full border-2 border-stone-50 bg-stone-300 flex items-center justify-center text-xs font-semibold text-stone-700 ring-1 ring-stone-400"
            style={{ zIndex: initials.length - i }}
          >
            {init}
          </div>
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
