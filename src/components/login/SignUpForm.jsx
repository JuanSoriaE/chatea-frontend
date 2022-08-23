import './SignUpForm.css';
import axios from 'axios';

function SignUpForm({ setAuth }) {

  const url = 'http://localhost:5000/';

  const signUp = async () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;

    let data = {
      email,
      password,
      username
    };

    // Request to sign up user
    axios({
      method: 'post',
      url: url + 'user',
      data
    }).then(res => {
      signUpSuccess(res.data.token);
    }).catch(err => {
      console.log(err.response.data.message);
    });
  };

  const signUpSuccess = token => {
    localStorage.setItem('access-token', token);
    setAuth(true);
  };

  return (
    <div className='sign-up-right-form-container'>
      <form>
        <div className='form-input-container'>
          <input type='text' name='email' id='email' className='sign-up-input' required></input>
          <label htmlFor='email' className='sign-up-input-label'>Email</label>
        </div>
        <div className='form-input-container'>
          <input type='password' name='password' id='password' className='sign-up-input' required></input>
          <label htmlFor='password' className='sign-up-input-label'>Password</label>
        </div>
        <div className='form-input-container'>
          <input type='text' name='username' id='username' className='sign-up-input' required></input>
          <label htmlFor='username' className='sign-up-input-label'>Username</label>
        </div>
        <div className='form-input-container'>
          <input type='button' value='Sign Up' className='main-button sign-up-submit-button' onClick={ signUp } />
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
