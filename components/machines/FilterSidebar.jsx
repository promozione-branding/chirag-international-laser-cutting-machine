import Link from "next/link";
import { ArrowRight, Grid2X2, Headset, SlidersHorizontal } from "lucide-react";
import { categories, featureFilters, products } from "@/lib/products";

export default function FilterSidebar({
  activeCategory,
  selectedFeatures,
  onCategoryChange,
  onToggleFeature,
  onClear,
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-[15px] border border-[#dce6f2] bg-white p-4 shadow-[0_5px_20px_rgba(20,55,100,0.035)]">
        <h2 className="mb-4 flex items-center gap-3 text-[15px] font-extrabold text-[#14264b]">
          <Grid2X2 className="text-[#0866f5]" size={20} /> Product Categories
        </h2>
        <div className="space-y-1">
          {categories.map((category) => {
            const count =
              category.id === "all"
                ? products.length
                : products.filter((product) => product.category === category.id)
                    .length;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex w-full items-center justify-between rounded-[9px] px-3 py-2.5 text-left text-[12px] font-semibold transition-colors ${
                  activeCategory === category.id
                    ? "bg-[#e7f0ff] text-[#075bd5]"
                    : "text-[#34435d] hover:bg-[#f4f7fc] hover:text-[#075bd5]"
                }`}
              >
                <span>{category.label}</span>
                <span className="text-[11px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[15px] border border-[#dce6f2] bg-white p-4 shadow-[0_5px_20px_rgba(20,55,100,0.035)]">
        <h2 className="mb-4 flex items-center gap-3 text-[15px] font-extrabold text-[#14264b]">
          <SlidersHorizontal className="text-[#0866f5]" size={20} /> Key
          Features
        </h2>
        <div className="space-y-3">
          {featureFilters.map((feature) => (
            <label
              key={feature}
              className="flex cursor-pointer items-center gap-3 text-[12px] font-medium text-[#34435d]"
            >
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => onToggleFeature(feature)}
                className="h-[16px] w-[16px] rounded border-[#bdcbe0] accent-[#0866f5]"
              />
              {feature}
            </label>
          ))}
        </div>
        {(selectedFeatures.length > 0 || activeCategory !== "all") && (
          <button
            onClick={onClear}
            className="mt-4 text-[11px] font-bold text-[#0866f5] hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div className="relative overflow-hidden rounded-[16px] border border-[#dce9fb] bg-[linear-gradient(145deg,#f1f7ff,#e5efff)] p-5">
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full border border-[#c6dcff]" />
        <div className="relative">
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-[#0866f5] shadow-sm">
            <Headset size={24} />
          </div>
          <h3 className="text-[20px] font-extrabold leading-[1.2] tracking-tight text-[#102044]">
            Need Help Finding the Right Machine?
          </h3>
          <p className="mt-3 text-[12px] leading-[1.7] text-[#61718d]">
            Our team can help you choose the right laser solution for your
            application.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[9px] bg-[#0866f5] px-4 py-3 text-[12px] font-bold text-white transition-colors hover:bg-[#0754d2]"
          >
            Talk to an Expert <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
