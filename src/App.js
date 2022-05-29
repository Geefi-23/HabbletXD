import { BrowserRouter as Router } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { Modal } from 'react-bootstrap';
import LinearProgress from '@mui/material/LinearProgress';

import Header from "./view/components/Header";
import Alert from "./view/components/Alert";
import Footer from "./view/components/Footer";

import './static/css/reset.css';
import './static/css/vars.css';
import './static/css/basic.css';
import './static/css/slider.css';
import Approutes from "./routes";

import api from "./static/js/api";

const AuthModal = (props) => {
  const [type, setType] = useState('login');
  const { setIsAuth, hideModal, sendAlert, showProgress, hideProgress } = props;

  const regex = {
    nick: /^[A-Za-z0-9 ]{5,40}$/,
    senha: /^[^ ]{6,16}$/,
  };

  const Login = () => {
    const sendLoginRequest = async () => {
      let user = {
        nick: document.querySelector('#loginForm #input-nick').value,
        senha: document.querySelector('#loginForm #input-senha').value
      };

      for (let key in regex){
        if (!regex[key].test(user[key])) {
          return sendAlert('danger', 'O nome de usuário ou a senha não foram digitados corretamente!');
        }
      }

      let init = {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include'
      };
      
      showProgress();
      let res = await api.user('login', init);
      hideProgress();

      if (res.error){
        sendAlert('danger', res.error);
      } else {
        sendAlert('success', res.success);
        localStorage.setItem('hxd-user-object', JSON.stringify(res.user));
        setIsAuth(true);
        hideModal();
      }
    };

    return (
      <>
        <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold" 
        style={{height: '50px'}}>
          CLUBE XD - LOGIN
        </div>
        <div className="d-flex flex-column gap-2 p-2">
          <div className="d-flex gap-2">
            <button className="hxd-bg-color hxd-border text-white w-50 rounded fw-bold"
            onClick={() => setType('register')}>Registrar-se</button>
            <button className="bg-white hxd-border hxd-primary-text w-50 rounded fw-bold" disabled>Login</button>
          </div>
          <small className="hxd-primary-text fw-bold text-center">Seja bem vindo novamente à Habblet XD!</small>
          <form id="loginForm" className="d-flex flex-column gap-4 mt-2" action="#" 
          onSubmit={evt => {evt.preventDefault(); sendLoginRequest()}}>
            <label className="w-100 hxd-input__wrapper">
              <input id="input-nick" className="hxd-input" placeholder=" " autoComplete="off"/>
              <span className="hxd-input__label">Nick</span>
            </label>
            <label className="w-100 hxd-input__wrapper">
              <input id="input-senha" className="hxd-input" placeholder=" " type="password" />
              <span className="hxd-input__label">Senha</span>
            </label>
            <button className="hxd-btn w-100" type="submit" style={{height: '45px'}}>Logar</button>
          </form>
          <button className="hxd-border hxd-secondary-text bg-white rounded">Esqueci minha senha</button>
        </div>
      </>
    );
  };

  const Register = () => {

    const sendRegisterRequest = useCallback(async () => {
      let user = {
        nick: document.querySelector('#registerForm #input-nick').value,
        senha: document.querySelector('#registerForm #input-senha').value,
        missao: document.querySelector('#registerForm #input-missao').value
      };
      
      for (let key in regex){
        if (!regex[key].test(user[key])) {
          return sendAlert('danger', 'O nome de usuário ou a senha não foram digitados corretamente!');
        }
      }
      
      let init = {
        method: 'POST',
        body: JSON.stringify(user)
      };
      showProgress();
      let res = await api.user('register', init);
      hideProgress();
      if (res.error){
        sendAlert('danger', res.error)
      } else {
        sendAlert('success', res.success)
      }
    }, []);

    return (
      <>
        <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold" 
        style={{height: '50px'}}>
          CLUBE XD - REGISTRO
        </div>
        <div className="d-flex flex-column gap-2 p-2">
          <div className="d-flex gap-2">
            <button className="bg-white hxd-border hxd-primary-text w-50 rounded fw-bold" disabled>Registrar-se</button>
            <button className="hxd-bg-color hxd-border text-white w-50 rounded fw-bold"
            onClick={() => setType('login')}>Login</button>
          </div>
          <small className="hxd-primary-text fw-bold text-center">Registre-se no site para interagir conosco!</small>
          <form id="registerForm" className="d-flex flex-column gap-4 mt-2" action="#" 
          onSubmit={evt => { evt.preventDefault(); sendRegisterRequest() }}>
            <label className="w-100 hxd-input__wrapper">
              <input id="input-nick" className="hxd-input" placeholder=" " autoComplete="off"/>
              <span className="hxd-input__label">Nick</span>
            </label>
            <label className="w-100 hxd-input__wrapper">
              <input id="input-senha" className="hxd-input" type="password" placeholder=" " />
              <span className="hxd-input__label">Senha</span>
            </label>
            <label className="w-100 hxd-input__wrapper">
              <input id="input-missao" className="hxd-input" />
              <span className="hxd-input__label">Código de missão</span>
            </label>
            <button className="hxd-btn w-100" style={{height: '45px'}} type="submit">Registrar-se</button>
          </form>
        </div>
      </>
    );
  };

  return (
    <>
      {
        type === 'login' ?
        <Login /> : type === 'register' ? <Register /> : null
      }
    </>
    
  );
};

const App = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [artModalIsShowing, setArtModalIsShowing] = useState(false);
  const [isProgressShowing, setIsProgressShowing] = useState(false);
  const [alert, setAlert] = useState({type: 'success', content: '', visible: false});
  const alertRef = useRef(null);

  const handleModalShow = () => setIsModalShowing(true);
  const handleModalHide = () => setIsModalShowing(false);

  const handleProgressShow = () => setIsProgressShowing(true);
  const handleProgressHide = () => setIsProgressShowing(false);
  
  const sendAlert = useCallback((type, content) => {
    setAlert({type, content, visible: true});
    setTimeout(() => {
      setAlert({visible: false});
    }, 5000);
  }, [setAlert]);
  
  return (
    <Router>
      <div style={{
        backgroundColor: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1061
      }}>
        <LinearProgress sx={{
          visibility: isProgressShowing ? 'visible' : 'hidden'
        }} />
      </div>
      
      <Alert type={alert.type} content={alert.content} visible={alert.visible} />
      <Modal show={isModalShowing} backdrop={true}>
        <AuthModal
          setIsAuth={setIsAuth} sendAlert={sendAlert} hideModal={handleModalHide}
          alertRef={alertRef} showProgress={handleProgressShow} 
          hideProgress={handleProgressHide}
        />
      </Modal>
      <Header 
        isAuth={isAuth} setIsAuth={setIsAuth} showModal={handleModalShow} 
        sendAlert={sendAlert} 
        showProgress={handleProgressShow} 
        hideProgress={handleProgressHide} 
        artModalIsShowing={artModalIsShowing}
        setArtModalIsShowing={setArtModalIsShowing}
      />
        
      <Approutes 
        isAuth={isAuth} 
        sendAlert={sendAlert} 
        showProgress={handleProgressShow} 
        hideProgress={handleProgressHide} 
        
      />
      <Footer />
    </Router>
  );
};

export default App;