import Link from 'next/link'

export default function Header() {
  return (
    <header className='mb-8 inline-flex h-12 w-full items-center text-[16px]'>
      <nav className='w-full'>
        <ul className='flex w-full justify-between font-bold'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/'>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
