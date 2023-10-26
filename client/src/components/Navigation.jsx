import { Link } from 'react-router-dom';
import { Button } from './Buttons';


export default function Navigation() {
  return (
    <div className='absolute flex'>
      <div className="transparent text-white p-1 mx-2"><Link to="Login"><button>Login</button></Link></div>
      <div className='transparent text-white p-1 mx-2'><Link to="Signup"><button>Sign Up</button></Link></div>
    </div>
  )
}
