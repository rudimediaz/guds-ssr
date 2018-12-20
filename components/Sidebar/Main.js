import Navigation from '../Sidebar/Navigation'
import Link from 'next/link'

export default ()=>{
  return (
    <div className='d-flex flex-column mb-30'>
      <div><Link href='/'><a className="navbar-brand">Guds</a></Link></div>
      <div><Navigation /></div>

    </div>

  )

}
