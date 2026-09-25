import MapBoard from './components/Map/MapBoard'

function App() {
  return (
    <main className="min-h-screen bg-[#11100d] px-4 py-10 text-[#e8dfc8]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center">
        <header className="mb-8 px-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#9c8b68]">
            The Lost Cartographer
          </p>

          <h1 className="mt-3 font-serif text-4xl tracking-wide md:text-5xl">
            Map Reconstruction
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#938a78]">
            Restore a fragment of the expedition map by observing its terrain,
            placing it correctly, and aligning the route.
          </p>
        </header>

        <MapBoard />
      </div>
    </main>
  )
}

export default App