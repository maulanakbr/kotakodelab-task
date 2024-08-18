export default function Footer() {
  return (
    <footer className='mt-4 inline-flex h-12 w-full items-center text-[16px]'>
      <nav className='w-full'>
        <ul className='flex w-full justify-between text-right font-bold'>
          <li>&copy; {new Date().getFullYear()}</li>
          <li>Contact Us | Privacy Policy</li>
        </ul>
      </nav>
    </footer>
  )
}
