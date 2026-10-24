export default function PackagesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="h-4 w-40 rounded-full bg-[rgba(11,42,58,0.08)]" />
        <div className="flex flex-col gap-3">
          <div className="h-4 w-32 rounded-full bg-[rgba(200,161,90,0.3)]" />
          <div className="h-10 w-2/3 rounded-full bg-[rgba(11,42,58,0.08)]" />
          <div className="h-5 w-3/4 rounded-full bg-[rgba(11,42,58,0.06)]" />
        </div>
        <div className="h-24 w-full rounded-3xl bg-white shadow-soft" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[420px] rounded-3xl bg-white shadow-soft" />
          ))}
        </div>
      </div>
    </div>
  );
}
