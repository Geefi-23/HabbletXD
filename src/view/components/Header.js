import { useEffect, useCallback, useState, useRef } from 'react';
//import Glide from '@glidejs/glide'
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Dropdown } from 'react-bootstrap';

import ArtUploadModal from './ArtUploadModal';

import '@glidejs/glide/dist/css/glide.core.css';
import slider from '../../static/js/slider';

import '../../static/css/header.css';
import api from '../../static/js/api';

const Header = (props) => {
  
  const { isAuth, setIsAuth, showProgress, hideProgress, sendAlert, artModalIsShowing, setArtModalIsShowing } = props;

  /**
   * 
   * @param {string} rgbString 
   * @returns An hexadecimal color string
   */
  const rgbToHex = (rgbString) => {
    let values = rgbString.replaceAll(',', '').split(' ');

    if (values.length !== 3) return;
    
    const componentToHex = (x) => {
      var hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return componentToHex(values[0]) + componentToHex(values[1]) + componentToHex(values[2]);
  };

  const checkAuthentication = useCallback(async () => {
    let res = await api.user('authenticate', {credentials: 'include'});
    setIsAuth(res.authenticated);
  }, [setIsAuth]);
  
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const UserArea = () => {

    return (
      !isAuth ? 
      <>
        <Dropdown className="d-flex align-items-center">
          <Dropdown.Toggle
          className="dropdown-toggle caret-off hxd-bg-colorDark p-0 px-4 fw-bold text-white border-0 rounded">
            CLUBE XD
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="dropdown-item hxd-active">
              <button type="button" className="bg-transparent border-0 w-100" 
              onClick={props.showModal}>
                Entrar
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </> : <>
        {/* MODAL ART UPLOAD */}
        <button className="bg-transparent h-100 border-0"
          onClick={() => setArtModalIsShowing(true)}>
          <img src={`https://img.icons8.com/ios-filled/24/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/drawing.png`}/>
        </button>
        <ArtUploadModal 
          showProgress={showProgress} 
          hideProgress={hideProgress} 
          sendAlert={sendAlert} 
          artModalIsShowing={artModalIsShowing}
          setArtModalIsShowing={setArtModalIsShowing}
        />
        <Link to="/meuperfil" onClick={() => showProgress()} className="d-flex align-items-center bg-transparent h-100 border-0">
          <img 
            src={`https://avatar.blet.in/${JSON.parse(localStorage.getItem('hxd-user-object'))?.info.usuario}&action=std&size=b&head_direction=3&direction=4&gesture=sml&headonly=0`} 
            alt=""
            style={{
              height: '100%',
              width: '64px',
              objectFit: 'none',
              objectPosition: '0 -15px'
            }}
          />
        </Link>
        <Dropdown className="d-flex align-items-center">
          <Dropdown.Toggle className="dropdown-caret-off bs-btn-shadow-off bg-transparent h-100 border-0 p-0" style={{ width: '24px'}}>
            <img 
            src={`https://img.icons8.com/material-sharp/24/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/appointment-reminders--v1.png`} alt=""/>
          </Dropdown.Toggle>

          <Dropdown.Menu className="hxd-border">
            <Dropdown.Item className="dropdown-item hxd-active">
              
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button className="bg-transparent h-100 border-0" 
          onClick={() => {
            localStorage.removeItem('hxd-user-object');
            api.user('logout', {credentials: 'include'});
            setIsAuth(false);
            window.location.href = '/';
          }}
        >
          <img src={`https://img.icons8.com/material-sharp/24/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/exit.png`} alt=""/>
        </button>
      </>
    );
  };

  const FastMenu = () => {
    const handleFastMenu = () => {
      let items = document.querySelectorAll('.fast-menu .fast-menu__item');

      items.forEach((item) => {
        item.onclick = function() {
          items.forEach((item) => item.classList.remove('active'));
          this.classList.add('active');
        };
      });
    };
    
    useEffect(() => {
      handleFastMenu();
    }, []);
    return (
      <>
        <div className="fast-menu d-flex flex-column mt-3">
          <span className="text-white text-center h4 m-0" style={{height: '29px'}}>MENU RÁPIDO</span>
          <div className="d-flex flex-row justify-content-evenly p-2">
            <Link to="search" className="fast-menu__item">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"viewBox="0 0 24 24" fill="currentColor">
                <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
              </svg>
            </Link>
            <ScrollLink 
            to="noticias-section"
            smooth={true}
            offset={-70}
            className="fast-menu__item active">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 3 C 2.895 3 2 3.895 2 5 L 2 18 C 2 19.657 3.343 21 5 21 L 19 21 C 20.64497 21 22 19.64497 22 18 L 22 8 A 1.0001 1.0001 0 0 0 20.984375 6.9863281 A 1.0001 1.0001 0 0 0 20 8 L 20 18 C 20 18.56503 19.56503 19 19 19 C 18.448 19 18 18.551 18 18 L 18 5 C 18 3.895 17.105 3 16 3 L 4 3 z M 7 6 L 13 6 C 13.552 6 14 6.448 14 7 L 14 8 C 14 8.552 13.552 9 13 9 L 7 9 C 6.448 9 6 8.552 6 8 L 6 7 C 6 6.448 6.448 6 7 6 z M 7 12 L 13 12 C 13.552 12 14 12.448 14 13 C 14 13.552 13.552 14 13 14 L 7 14 C 6.448 14 6 13.552 6 13 C 6 12.448 6.448 12 7 12 z M 7 16 L 13 16 C 13.552 16 14 16.448 14 17 C 14 17.552 13.552 18 13 18 L 7 18 C 6.448 18 6 17.552 6 17 C 6 16.448 6.448 16 7 16 z"/>
              </svg>
            </ScrollLink>
            <ScrollLink 
            to="timeline-section" 
            smooth={true}
            offset={-70}
            className="fast-menu__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" fill="currentColor">
                <g>
                  <path d="M 2.664062 3.574219 C 1.945312 4.296875 1.894531 5.089844 1.96875 11.6875 C 2.039062 17.6875 2.039062 17.734375 2.617188 18.335938 C 3.121094 18.863281 3.40625 18.960938 4.609375 18.960938 L 6 18.960938 L 6 22.921875 L 9.960938 18.960938 L 20.808594 18.960938 L 21.382812 18.335938 C 21.960938 17.710938 21.960938 17.710938 22.03125 11.449219 C 22.078125 7.992188 22.03125 4.921875 21.960938 4.609375 C 21.886719 4.320312 21.625 3.863281 21.359375 3.601562 C 20.902344 3.144531 20.519531 3.121094 12 3.121094 C 3.527344 3.121094 3.097656 3.144531 2.664062 3.574219 Z M 2.664062 3.574219 "/>
                </g>
              </svg>
            </ScrollLink>
            <ScrollLink 
            to="artes-section" 
            smooth={true}
            offset={-70}
            className="fast-menu__item">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                  <path d="M71 206 c-59 -33 -67 -102 -16 -153 45 -45 87 -44 95 2 4 24 11 31 35 35 46 8 47 50 2 95 -38 38 -74 44 -116 21z m49 -21 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7 15 15 15 8 0 15 -7 15 -15z m50 -10 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7 15 15 15 8 0 15 -7 15 -15z m-90 -20 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7 15 15 15 8 0 15 -7 15 -15z m120 -30 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7 15 15 15 8 0 15 -7 15 -15z m-130 -20 c0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 8 7 15 15 15 8 0 15 -7 15 -15z m56 -36 c10 -17 -13 -36 -27 -22 -12 12 -4 33 11 33 5 0 12 -5 16 -11z"/>
                </g>
              </svg>
            </ScrollLink>
            <ScrollLink 
            to="loja-section" 
            smooth={true}
            offset={-70}
            className="fast-menu__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" fill="currentColor">
                <g>
                  <path d="M 4.246094 3.289062 C 3.984375 3.550781 4.054688 4.441406 4.367188 4.753906 C 4.585938 4.96875 6.625 5.039062 12.023438 5.039062 C 19.945312 5.039062 20.0625 5.015625 19.871094 3.792969 L 19.800781 3.238281 L 12.097656 3.167969 C 7.871094 3.144531 4.34375 3.191406 4.246094 3.289062 Z M 4.246094 3.289062 "/>
                  <path d="M 4.105469 7.296875 C 3.769531 7.703125 1.921875 13.128906 1.921875 13.726562 C 1.921875 13.96875 2.136719 14.375 2.375 14.617188 C 2.761719 15 2.855469 15.503906 2.929688 17.734375 C 2.976562 19.488281 3.097656 20.472656 3.3125 20.6875 C 3.71875 21.097656 11.328125 21.265625 12.3125 20.902344 L 12.960938 20.640625 L 12.960938 15.121094 L 18.9375 15.121094 L 19.007812 17.785156 C 19.078125 20.183594 19.128906 20.496094 19.585938 20.785156 C 19.992188 21.070312 20.136719 21.070312 20.542969 20.785156 C 20.929688 20.496094 21 20.089844 21.070312 17.761719 C 21.144531 15.503906 21.238281 15 21.625 14.617188 C 21.863281 14.375 22.078125 13.96875 22.078125 13.726562 C 22.078125 13.128906 20.230469 7.703125 19.894531 7.296875 C 19.488281 6.792969 4.511719 6.792969 4.105469 7.296875 Z M 11.039062 17.039062 L 11.039062 18.960938 L 5.039062 18.960938 L 5.039062 15.121094 L 11.039062 15.121094 Z M 11.039062 17.039062 "/>
                </g>
              </svg>
            </ScrollLink>
          </div>
        </div>
      </>
    );
  };

  const RadioPlayer = (props) => {
    const [isPaused, setIsPaused] = useState(false);
    const [streamVolume, setStreamVolume] = useState(1);
    const stream = useRef(null);

    const handleStreamPP = () => {
      setIsPaused(!isPaused);
      if (!isPaused) stream.current.play();
      else stream.current.pause();
    };

    const handleStreamVolume = (newVol) => {
      setStreamVolume(newVol);
      stream.current.volume = newVol;
    };

    return (
      <div id="radio-player">
        <audio preload="auto" className="d-none" ref={stream}>
          <source src="http://192.95.30.147/8180/stream" type="audio/mpeg" />
        </audio>
        <div className="d-flex flex-row hxd-bg-color w-100 mt-2 rounded overflow-hidden" 
        style={{height: '60px'}}>
          <div className="h-100 w-25"></div>
          <div className="d-flex flex-column justify-content-center h-100 text-white" style={{width: '55%'}}>
            <div className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
              </svg>
              <span className="ps-2 fw-bold">Locutor</span>
            </div>
            <div className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-music-note-beamed" viewBox="0 0 16 16">
                <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
              </svg>
              <span className="ps-2 fw-bold">A melhor</span>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center gap-1 h-100 text-white" style={{width: '20%'}}>
            <button className="d-flex flex-row align-items-center justify-content-center btn btn-success w-100 shadow-none" style={{height: '25px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
              </svg>
              <span className="ps-1">100</span>
            </button>
            <button className="d-flex flex-row align-items-center justify-content-center btn btn-danger w-100 shadow-none" style={{height: '25px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="d-flex flex-row w-100" style={{height: '30px'}}>
          <div className="w-50 h-100 rounded bg-white">
            <button className="bg-transparent border-0"
            onClick={() => handleStreamPP()}>
              <img 
                src={
                  isPaused ?
                  `https://img.icons8.com/ios-glyphs/15/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/pause--v1.png`
                  :
                  `https://img.icons8.com/ios-glyphs/15/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/play--v1.png`
                } 
                alt=""
              />
            </button>
            <button className="bg-transparent border-0">
              <img 
                src={
                  `https://img.icons8.com/ios-filled/15/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/room-sound.png`
                }  
                alt=""
              />
            </button>
            <input className="volume-handler" defaultValue={1} onChange={evt => handleStreamVolume(evt.target.value)} type="range" min="0" max="1" step=".01" />
            <button className="bg-transparent border-0">
              <img 
                src={
                `https://img.icons8.com/android/15/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/paper-plane.png`
                } 
                style={{transform: 'rotateZ(-45deg)'}}  
                alt=""
              />
            </button>
            <button className="bg-transparent border-0">
              <img 
                src={
                  `https://img.icons8.com/ios-glyphs/15/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/filled-star.png`
                }
                alt=""
              />
            </button>
            
          </div>
          <div className="w-50 h-100 ps-2 text-white">
            <span className="fw-bold">100</span>
            <small> estão ouvindo a rádio</small>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-evenly w-100 py-2 text-white" style={{height: '50px'}}>
          <div className="next-schedule__card opacity-100">
            <div style={{width: '45px', height: '34px'}}></div>
            <div style={{lineHeight: 1.1}}>
              <small className="d-block text-white fw-bold opacity-75">Depois</small>
              <span className="text-white fw-bold">Próximo</span>
            </div>
          </div>
          <div className="next-schedule__card opacity-75">
            <div style={{width: '45px', height: '34px'}}></div>
            <div style={{lineHeight: 1.1}}>
              <small className="d-block text-white fw-bold opacity-75">às 00:00</small>
              <span className="text-white fw-bold">Próximo</span>
            </div>
          </div>
          <div className="next-schedule__card opacity-50">
            <div style={{width: '45px', height: '34px'}}></div>
            <div style={{lineHeight: 1.1}}>
              <small className="d-block text-white fw-bold opacity-75">às 00:00</small>
              <span className="text-white fw-bold">Próximo</span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn shadow-none hxd-bg-color w-75 text-white rounded">
            Visitar área de horários
          </button>
        </div>
      </div>
    );
  };

  const BasicPortal = () => {

    const handleCarousel = () => {
      
      let carousel = document.querySelector('.carousel');
      let track = carousel.querySelector('.carousel__track');

      var cellCount = 5;
      var selectedIndex = 0;
      
      setInterval(() => {
        var angle = selectedIndex / cellCount * -360;
        selectedIndex++;
        track.style.transform = 'translateZ(-371px) rotateY(' + angle + 'deg)';
      }, 4000)
    };

    useEffect(() => {
      slider.create({slider: '#valores-slider', slidesToShow: 7, gap: 8});
      handleCarousel();
    }, [])

    return (
      <div id="basic-portal">
        <div className="row gx-0">
          <div className="col p-1">
            <div className="top-card d-flex flex-row hxd-bg-color h-100 w-100 p-1 rounded">
              <div className="w-25 bg-dark rounded"></div>
              <div className="w-75 text-white px-1">
                <div className=''>Último evento</div>
                <span className="mb-0">Evento de inauguração</span>
                <small className="d-block text-truncate">Hoje inauguramos bla bla blaaaaaaaaa</small>
                <small className="d-block text-end fw-bold">00/00 às 00:00</small>
              </div>
            </div>
          </div>
          <div className="col p-1">
            <div className="top-card d-flex flex-row h-100 w-100 p-1 rounded" style={{backgroundColor: 'white'}}>
            <div className="w-25 bg-dark rounded"></div>
              <div className="w-75 px-1">
                <div className='hxd-secondary-text'>Notícia destaque</div>
                <span className="mb-0 hxd-primary-text">Agora fudeu!</span>
                <small className="d-block hxd-secondary-text text-truncate">O bagulho fico lokooooooo</small>
                <small className="d-block hxd-secondary-text text-end fw-bold">00/00 às 00:00</small>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100">
          <strong className="text-white">Valores</strong>
          <div id="valores-slider" className="slider mt-1">
            <button className="slider__arrow slider__arrow--left">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </button>
            <div className="slider__track">
              <div className="slider__item">
                <div className="slider__item-popup">hhhhhhhhhh</div>
              </div>
              <div className="slider__item">
                <div className="slider__item-popup">hhhhhhhhhh</div>
              </div>
              <div className="slider__item">
                <div className="slider__item-popup">hhhhhhhhhh</div>
              </div>
              <div className="slider__item">
                <div className="slider__item-popup">hhhhhhhhhh</div>
              </div>
              <div className="slider__item">
                <div className="slider__item-popup">hhhhhhhhhh</div>
              </div>
              <div className="slider__item">
                <div className="slider__item-popup">hhhhhhhhhh</div>
              </div>
              <div className="slider__item">
                <div className="slider__item-popup">hhhhhhhhhh</div>
              </div>
              <div className="slider__item">
                <div className="slider__item-popup">hhhhhhhhhh</div>
              </div>

            </div>
            <button className="slider__arrow slider__arrow--right">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="carousel ">
          <div className="carousel__track">
            <div className="glide__slide carousel__item">1</div>
            <div className="glide__slide carousel__item">2</div>
            <div className="glide__slide carousel__item">3</div>
            <div className="glide__slide carousel__item">4</div>
            <div className="glide__slide carousel__item">5</div>
          </div>
        </div>
      </div>
    );
  };

  const handleNavbarMenu = useCallback(() => {
    let items = document.querySelectorAll('#hxd-header .navbar-menu__item:not(.especial)');

    items.forEach((item) => {
      item.onclick = function() {
        items.forEach((item) => item.classList.remove('active'))
        this.classList.add('active')
      };
    });
  }, []);

  const changeThemeColor = (themeId) => {
    let root = document.querySelector(':root');

    const PURPLE_THEME = {
      'theme-color': '48, 51, 107',
      'theme-colorLight': '83, 86, 134',
      'theme-colorDark': '19, 13, 63',
      'theme-icon-color': '42, 42, 90',
      'theme-iconHover-color': '55, 55, 114',
      'theme-text-color': '58, 60, 102',
      'theme-text-secondaryColor': '89, 92, 137',
      'color-gray': '200, 200, 215'
    };
    const PINK_THEME = {
      'theme-color': '#be2edd',
      'theme-colorDark': '#9a27b3'
      
    };
    const CYAN_THEME = {
      'theme-color': '34, 166, 179',
      'theme-colorDark': '16, 82, 88',
      'theme-colorLight': '67, 200, 213',
      'theme-icon-color': '30, 121, 131',
      'theme-iconHover-color': '36, 141, 153',
      'theme-text-color': '28, 108, 116',
      'theme-text-secondaryColor': '86, 147, 153'
    };

    const THEMES = [PURPLE_THEME, PINK_THEME, CYAN_THEME];

    for (let key in THEMES[themeId]){
      root.style.setProperty('--hxd-'+key, THEMES[themeId][key]);
    }
    localStorage.setItem('hxd-ColorTheme', themeId);
  };

  const handleThemeMenu = useCallback(() => {
    let options = document.querySelectorAll('#theme-menu .theme-option');

    options.forEach((option) => {
      option.onclick = function() {
        options.forEach((option) => option.classList.remove('active'))
        this.classList.add('active');
        changeThemeColor(this.value);
      };
    });
  }, []);

  useEffect(() => {
    changeThemeColor(localStorage.getItem('hxd-ColorTheme') || 0);
    handleNavbarMenu();
    handleThemeMenu();
  }, [handleNavbarMenu, handleThemeMenu]);

  return (
    <>
      <header id="hxd-header">
        <div className="toolbar">
          <div style={{width: '10%'}}>
            <div id="theme-menu" className="d-flex flex-row align-items-center justify-content-center gap-2 h-100 w-100 text-white">
              <button className="theme-option active" style={{backgroundColor: '#30336b'}} value="0">
                <div className="brushIcon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-brush-fill" viewBox="0 0 16 16">
                    <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z"/>
                  </svg>
                </div>
              </button>
              <button className="theme-option" style={{backgroundColor: '#be2edd'}} value="1">
                <div className="brushIcon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-brush-fill" viewBox="0 0 16 16">
                    <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z"/>
                  </svg>
                </div>
              </button>
              <button className="theme-option" style={{backgroundColor: '#22a6b3'}} value="2">
                <div className="brushIcon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-brush-fill" viewBox="0 0 16 16">
                    <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="h-100 w-50">
            <nav className="h-100">
              <ul className="horizontal-navbar-menu h-100 list-unstyled">
                <li className="navbar-menu__item active">
                  <Link to="/">INICIO</Link>
                </li>
                <li className="navbar-menu__item especial">
                  <button className="bg-transparent border-0">HABBLET XD</button>
                  <div className="navbar-menu__item__popover">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/equipe">Equipe</Link>
                      </li>
                      <li>
                        <Link to="/timeline/historia">Historia</Link>
                      </li>
                      <li>
                        <Link to="/timeline/seja-da-equipe">Seja da equipe</Link>
                      </li>
                      <li>
                        <Link to="/timeline/redes-sociais">Redes sociais</Link>
                      </li>
                      <li>
                        <Link to="/timeline/parceiros">Parceiros</Link>
                      </li>
                      <li>
                        <Link to="/timeline/escolinha-xd">Escolinha XD</Link>
                      </li>
                      <li>
                        <Link to="/timeline/seja-parceiro">Seja parceiro</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="navbar-menu__item especial">
                  <button className="bg-transparent border-0">HABBLET</button>
                  <div className="navbar-menu__item__popover">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/timeline/bb-code">BB CODE</Link>
                      </li>
                      <li>
                        <Link to="/ticket">Regras do fórum</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="navbar-menu__item"><Link to="/">RÁDIO</Link></li>
                <li className="navbar-menu__item especial">
                  <button className="bg-transparent border-0">EXTRAS</button>
                  <div className="navbar-menu__item__popover">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/habbletimager">Habblet Imager</Link>
                      </li>
                      <li>
                        <Link to="/ticket">Ticket</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div className="d-flex justify-content-center" style={{width: '40%'}}>
            
            <UserArea />
          </div>
        </div>
      </header>
      <div className="position-relative w-100" style={{height: '340px'}}>
        <div style={{height: '268px', width: '100%', backgroundColor: 'rgb(10, 10, 10)'}}></div>
        <div className="position-absolute d-flex flex-row justify-content-around w-100" style={{top: 0}}>
          <div style={{width: '450px', top: 0, left: '100px'}}>
            <RadioPlayer />
            <FastMenu />
          </div>
          <div className="basic-portal-wrapper" style={{width: '600px', top: 0, left: '100px'}}>
            <BasicPortal />
          </div>
        </div>
      </div>
    </>
  );

};

export default Header;