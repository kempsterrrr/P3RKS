export const Header = () => {
  return (
    <div className='flex justify-between'>
      <h1 className='text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl'>
        <a href="/">
          B3NZ
        </a>
      </h1>
      <button className="inline-flex items-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:border-2 hover:border-black hover:bg-white hover:text-black focus:outline-black focus:ring-2 focus:ring-black focus:ring-offset-2">Become a partner</button>
    </div>
  )
}