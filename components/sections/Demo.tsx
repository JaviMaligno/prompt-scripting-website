export function Demo() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-10 text-center">See it run</h2>
        <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-xl shadow-indigo-100 ring-1 ring-gray-200">
          <iframe
            className="w-full h-full"
            src="https://www.loom.com/embed/c4b78d43ce0441c5ab72b32870005078?hide_owner=true&hide_share=true&hideEmbedTopBar=true&hide_title=true&autoplay=1&t=25"
            title="Prompt Scripter Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}


