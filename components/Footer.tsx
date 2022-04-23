import { FaTwitter } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className='flex h-20 justify-between'>
      <p>benz</p>
      <a
        href="https://twitter.com/getb3nz"
        className="text-gray-400 hover:text-gray-500"
        target="_blank"
      >
        <span className="sr-only">Twitter</span>
        <FaTwitter className="h-6 w-6" aria-hidden="true" />
      </a>
    </footer>
  )
}