import './Login.css';
import WelcomeSvg from './../assets/welcome-svg.svg';
import SignUpSvg from './../assets/sign-up-svg.svg';

function SignUp(props) {

  const sign_up_footer = (
    <>
      <span className='text-to-login-page'>Do you have an account?</span>
      <span className='link-to-login-page' onClick={ () => props.changePage(!props.sign_up) }>Log In</span>
    </>
  );

  const log_in_footer = (
    <>
      <span className='text-to-login-page'>Don't have an account?</span>
      <span className='link-to-login-page' onClick={ () => props.changePage(!props.sign_up) }>Sign Up</span>
    </>
  );

  const log_in_information = (
    <>
      <div className='sign-up-right-img-container'>
        <img className='login-main-img' src={ WelcomeSvg } />
      </div>
      <div className='sign-up-right-info-container'>
        <h1>Welcome Back!</h1>
        <p>Log in to start chating<br /> and connect with your people.</p>
      </div>
    </>
  );

  const sign_up_information = (
    <>
      <h1>Welcome to Chatea</h1>
      <div className='sign-up-right-img-container'>
        <img className='login-main-img' src={ SignUpSvg } />
      </div>
      <div className='sign-up-right-info-container'>
        <p>Sign up to start chating and connect with your people thanks to the real time messages.</p>
      </div>
    </>
  );

  const sign_up_form_information = (
    <>
      <h2>Sign Up</h2>
      <p>Sign up in <span style={ {fontWeight: 'bold'} }>Chate</span> to start chating with your friends and family.</p>
    </>
  );

  const log_in_form_information = (
    <>
      <h2>Log in</h2>
      <p>Log in in <span style={ {fontWeight: 'bold'} }>Chate</span> to start chating with your friends and family.</p>
    </>
  );


  return (
    <div className='sign-up-main-container'>
      <div className='left-main'>
        <div className='left-side-part'>
          { props.sign_up ? sign_up_information : log_in_information }
        </div>
      </div>
      <div className='right-main'>
        <div className='right-side-part'>
          <div className='sign-up-right-info-container'>
            { props.sign_up ? sign_up_form_information : log_in_form_information }
          </div>
          { props.form }
          <div className='login-footer'>
            { props.sign_up ? sign_up_footer : log_in_footer }
          </div>
        </div>
      </div>
      
    </div>
    
  );
}

export default SignUp;
