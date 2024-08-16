import Link from 'next/link'

export default function Header() {
  return (
    <header className='mb-4 inline-flex h-12 w-full items-center text-[16px]'>
      <nav className='w-full'>
        <ul className='w-full text-right font-bold'>
          <li>
            <Link href='/'>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
