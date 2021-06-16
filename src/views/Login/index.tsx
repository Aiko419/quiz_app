import LoginForm from './LoginForm/Login';
import PopupMessage from '../../components/popup-message/PopupMessage';
import { LOGGED_USER_WARNING } from '../../utils/constants';

import './styles.scss';

const LoginPage: any = () => {
  const loggedInUser = localStorage.getItem("token");
  if (loggedInUser) {
    return (<PopupMessage message={LOGGED_USER_WARNING}/>)
  };
  return (
    <>
      <div className='wrapper-login-page'>
        <LoginForm />     
      </div>
    </>
  )
}


export default LoginPage;