import { Link } from 'react-router-dom';
import { ButtonLogin } from './Buttons';


export default function Navigation() {
  return (
    <>
      <div className='bg-green-400'>navigation</div>
      <div className="bg-red-400"><Link to="Login"><button>Login</button></Link></div>
      <div><Link to="Signup"><button>Sign Up</button></Link></div>
      <ButtonLogin>logintest</ButtonLogin>
    </>
  )
}
