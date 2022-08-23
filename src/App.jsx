import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUpForm from './components/login/SignUpForm';
import SignInForm from './components/login/SignInForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const url = 'http://localhost:5000/';

  const [auth, setAuth] = useState(false);
  const [sign_up, setSignUp] = useState(true);

  const getAuth = () => {
    const token = localStorage.getItem('access-token');

    axios({
      method: 'get',
      url: url + 'auth',
      headers: {
        'access-token': token
      }
    }).then(res => {
      if (res.data.auth) return setAuth(true);
      setAuth(false);
    }).catch(err => {
      console.log(err);
    });
  };

  const changePage = (value) => {
    setSignUp(value);
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ 
          auth ? <Home setAuth={ setAuth } /> : 
          <Login 
            form={ sign_up ? <SignUpForm setAuth={ setAuth } /> : <SignInForm setAuth={ setAuth } /> }
            sign_up={ sign_up }
            changePage={ changePage } />
         } />
        <Route path='chat/:public_id' element={ <Home /> } />
        <Route path='new' element={ <Home /> } />
      </Routes>
    </div>
  );
}

export default App;
