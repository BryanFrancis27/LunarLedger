function Container({ children }) {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-6 pt-56 md:px-6 md:pb-8 md:pt-32 lg:pt-28">
      {children}
    </main>
  )
}

export default Container
