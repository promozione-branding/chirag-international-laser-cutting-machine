import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container-x flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl font-extrabold text-[#0b1b4d]">Product not found</h1>
      <p className="mt-3 max-w-md text-sm text-[#687792]">
        We couldn&apos;t find the machine you&apos;re looking for. It may have been
        moved or is no longer listed.
      </p>
      <Link href="/products" className="btn-primary mt-6">
        Browse all products
      </Link>
    </div>
  );
}
