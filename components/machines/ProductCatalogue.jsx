"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { categories, products } from "@/lib/products";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

export default function ProductCatalogue() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        `${product.name} ${product.description} ${product.categoryLabel} ${product.specs.join(" ")}`
          .toLowerCase()
          .includes(term);
      const matchesFeatures =
        selectedFeatures.length === 0 ||
        selectedFeatures.every((feature) => product.tags.includes(feature));
      return matchesCategory && matchesSearch && matchesFeatures;
    });

    if (sortBy === "name")
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "price-low")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high")
      result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, searchTerm, sortBy, selectedFeatures]);

  const toggleFeature = (feature) => {
    setSelectedFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature],
    );
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchTerm("");
    setSelectedFeatures([]);
    setSortBy("featured");
  };

  const sidebar = (
    <FilterSidebar
      activeCategory={activeCategory}
      selectedFeatures={selectedFeatures}
      onCategoryChange={setActiveCategory}
      onToggleFeature={toggleFeature}
      onClear={clearFilters}
    />
  );

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-8">
        {/*
          Desktop sidebar. `sticky` only works when no ancestor clips overflow,
          so keep overflow-hidden/auto off the wrappers above this element.
          top-24 = 68px sticky header + breathing room. data-lenis-prevent lets
          the sidebar scroll internally on short screens without Lenis hijacking it.
        */}
        <aside
          data-lenis-prevent
          className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain"
        >
          {sidebar}
        </aside>

        <div className="min-w-0">
          <div className="mb-5 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((open) => !open)}
              aria-expanded={mobileFiltersOpen}
              className="inline-flex h-[44px] items-center gap-2 rounded-[10px] border border-[#d7e2f0] bg-white px-4 text-[12px] font-bold text-[#263754]"
            >
              <SlidersHorizontal size={16} className="text-[#0866f5]" />
              Filters
              {selectedFeatures.length + (activeCategory !== "all" ? 1 : 0) >
                0 && (
                <span className="rounded-full bg-[#0866f5] px-2 py-0.5 text-[10px] text-white">
                  {selectedFeatures.length + (activeCategory !== "all" ? 1 : 0)}
                </span>
              )}
            </button>
            {mobileFiltersOpen && <div className="mt-3">{sidebar}</div>}
          </div>

          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-[26px] font-extrabold tracking-[-0.035em] text-[#102044] sm:text-[30px]">
                  All Products
                </h2>
                <span className="text-[13px] font-semibold text-[#7a89a2]">
                  ({filteredProducts.length})
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#8491a6]">
                Explore our laser machine range
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 sm:w-[270px]">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8795aa]"
                />
                <input
                  id="product-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search products..."
                  className="h-[44px] w-full rounded-[10px] border border-[#d7e2f0] bg-white pl-10 pr-4 text-[12px] font-medium text-[#17294b] outline-none transition-all placeholder:text-[#9aa6b8] focus:border-[#6da4f5] focus:ring-4 focus:ring-[#0866f5]/[0.08]"
                />
              </div>
              <div className="relative sm:w-[175px]">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-[44px] w-full appearance-none rounded-[10px] border border-[#d7e2f0] bg-white px-4 pr-10 text-[12px] font-semibold text-[#263754] outline-none focus:border-[#6da4f5]"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="name">Name: A to Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#52627e]"
                />
              </div>
            </div>
          </div>

          {(activeCategory !== "all" ||
            selectedFeatures.length > 0 ||
            searchTerm) && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#77859b]">
                Active filters:
              </span>
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="rounded-full bg-[#eaf2ff] px-3 py-1.5 text-[10px] font-bold text-[#075bd5]"
                >
                  {categories.find((item) => item.id === activeCategory)?.label}{" "}
                  ×
                </button>
              )}
              {selectedFeatures.map((feature) => (
                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className="rounded-full bg-[#eaf2ff] px-3 py-1.5 text-[10px] font-bold text-[#075bd5]"
                >
                  {feature} ×
                </button>
              ))}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="rounded-full bg-[#eaf2ff] px-3 py-1.5 text-[10px] font-bold text-[#075bd5]"
                >
                  Search: {searchTerm} ×
                </button>
              )}
              <button
                onClick={clearFilters}
                className="ml-1 text-[10px] font-bold text-[#687792] underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[18px] border border-dashed border-[#cbd9eb] bg-white px-6 text-center">
              <Search size={32} className="text-[#9aabc2]" />
              <h3 className="mt-4 text-lg font-extrabold text-[#17294b]">
                No products found
              </h3>
              <p className="mt-2 max-w-sm text-sm text-[#71809a]">
                Try changing your search or removing one of the selected
                filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-[#0866f5] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0754d2]"
              >
                Reset filters
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#e4ebf4] pt-6 sm:flex-row">
            <p className="text-[11px] text-[#8793a7]">
              Showing {filteredProducts.length} of {products.length} listed
              products
            </p>
            <p className="text-[11px] text-[#8793a7]">
              Need a custom configuration?{" "}
              <Link
                href="/contact"
                className="font-bold text-[#0866f5] hover:underline"
              >
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
