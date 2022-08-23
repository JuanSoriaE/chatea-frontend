import './SignInForm.css';
import axios from 'axios';

function SignInForm({ setAuth }) {

  const url = 'http://localhost:5000/';

  const login = () => {
    let user_identifier = document.getElementById('user_identifier').value;
    let password = document.getElementById('password').value;

    let data = {
      user_identifier,
      password
    };

    axios({
      method: 'post',
      url: url + 'login',
      data
    }).then(res => {
      console.log(res);
      loginSuccess(res.data);
    }).catch(err => {
      console.log(err);
    });
  };

  const loginSuccess = (data) => {
    localStorage.setItem('access-token', data.token);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('friends', JSON.stringify(data.user.friends));
    setAuth(true);
  };

  return (
    <div className='sign-up-right-form-container'>
      <form>
        <div className='form-input-container'>
          <input type='text' name='user_identifier' className='sign-up-input' id='user_identifier' required></input>
          <label htmlFor='user_identifier' className='sign-up-input-label'>Username / Email</label>
        </div>
        <div className='form-input-container'>
          <input type='password' name='password' className='sign-up-input' id='password' required></input>
          <label htmlFor='password' className='sign-up-input-label'>Password</label>
        </div>
        <div className='form-input-container'>
          <input type='button' value='Log In' className='main-button sign-up-submit-button' onClick={ login } />
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
