export default function LocationMap({
  address = "Second Floor Right Portion, B-132, Satguru Ram Singh Marg, Mayapuri Industrial Area Phase 1, Bagga, Brothers New Delhi - 110064, Delhi, India",
  title = "Chirag Internarional",
  zoom = 15,
  height = 450,
}) {
  const query = encodeURIComponent(address)
  const src = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3502.101163980137!2d77.1244950755007!3d28.62672997566771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM3JzM2LjIiTiA3N8KwMDcnMzcuNSJF!5e0!3m2!1sen!2sin!4v1794978873773!5m2!1sen!2sin`
  const viewUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section className="mx-auto w-[100%] py-12">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Find us</h2>
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 underline-offset-4 transition hover:text-blue-700 hover:underline"
          >
            {address}
          </a>
        </div>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Get directions
        </a>
      </div>

      <div className="w-full overflow-hidden rounded-3xl">
        <iframe
          title={title}
          src={src}
          width="100%"
          height={height}
          style={{ border: 0, display: "block" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}