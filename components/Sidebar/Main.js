import Navigation from '../Sidebar/Navigation'
import Link from 'next/link'

export default ()=>{
  return (
    <div className='d-block mb-30'>
      <div><Link href='/'><a className="navbar navbar-brand">Guds</a></Link></div>
      <div><Navigation /></div>
      <div>for Explorer</div>
      <div>for sidebar footer</div>

    </div>

  )

}
