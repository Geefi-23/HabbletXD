import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import slider from "../../static/js/slider";
import api from '../../static/js/api';

const Profile = ({ type, isAuth }) => {
  const [profile, setProfile] = useState({});
  let { name } = useParams();

  const getProfile = useCallback(async (nome) => {
    if (!nome) {
      nome = JSON.parse(localStorage.getItem('user')).nick
    }
    let res = await api.user('get', {
      method: 'POST',
      body: JSON.stringify({
        usuario: nome
      })
    });
    if (res.error) {
      setProfile({ error: true });
    }else if (res.success) {
      setProfile(res.user);
    }
  }, []);

  if (type === 'myself' && !isAuth) {
    window.location.href = '/';
  }

  useEffect(() => {
    console.log(isAuth)
    if (type === 'myself') {
      setProfile(JSON.parse(localStorage.getItem('hxd-user-object')));
    } else {
      getProfile(name);
    }
    //slider.create({ slider: '#mobis-slider', slidesToShow: 4, gap: 8, arrows: { left: '#mobs-arrowLeft', right: '#mobs-arrowRight' }})
  }, []);
  return (
    <>
    {
      <div className="container">
        <div id="my-profile" className="hxd-bg-color w-100" style={{ borderRadius: '7px'}}>
          <div className="d-flex align-items-center justify-content-between w-100 px-2 text-white" style={{height: '50px'}}>
            <h5>Perfil do usuário</h5>
            {
              type === 'myself' ?
              <Link to="/editarperfil">
                <img src="https://img.icons8.com/ios-filled/30/ffffff/settings.png"/>
              </Link>
              :
              null
            }
          </div>
          <div className="d-flex bg-white w-100 p-3" style={{borderRadius: '7px'}}>
            <div className="row gx-0 w-100 gap-1">
              <div className="col flex-column gx-0 h-100">
                <div className="hxd-border d-flex flex-column overflow-hidden rounded" style={{height: '152px'}}>
                  <div className="hxd-bg-color d-flex align-items-center justify-content-center fw-bold text-white"
                    style={{height: '35px'}}
                  >
                    {profile.usuario}
                  </div>
                  <div style={{flex: '1 0 0'}}></div>
                </div>
                <div id="mobis-slider" className="slider d-flex gap-1 w-100 pt-2">
                  <div className="slider__track d-flex flex-wrap gap-2 p-0" style={{width: '224px'}}>
                    <div className="slider__item hxd-border bg-white" style={{height: '50px', width: '50px'}}></div>
                    <div className="slider__item hxd-border bg-white" style={{height: '50px', width: '50px'}}></div>
                    <div className="slider__item hxd-border bg-white" style={{height: '50px', width: '50px'}}></div>
                    <div className="slider__item hxd-border bg-white" style={{height: '50px', width: '50px'}}></div>
                    <div className="slider__item hxd-border bg-white" style={{height: '50px', width: '50px'}}></div>
                    <div className="slider__item hxd-border bg-white" style={{height: '50px', width: '50px'}}></div>
                    <div className="slider__item hxd-border bg-white" style={{height: '50px', width: '50px'}}></div>
                    <div className="slider__item hxd-border bg-white" style={{height: '50px', width: '50px'}}></div>
                  </div>
                  <div className="d-flex flex-column justify-content-end" style={{height: '100px'}}>
                    <button id="mobs-arrowLeft" className="slider__arrow arrow-left" style={{height: '50px'}}></button>
                    <button id="mobs-arrowRight" className="slider__arrow arrow-right" style={{height: '50px'}}></button>
                  </div>
                </div>
              </div>
              <div className="col-6 gx-0 h-100">
                <div>
                  <div className="fw-bold hxd-primary-text" role="heading" aria-level={3}>Ultimas timelines</div>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to="/" className="hxd-border hxd-primary-text bg-white text-decoration-none rounded" style={{width: "252px", height: '60px'}}>
                      <div className="hxd-border-bottom p-1 overflow-hidden" 
                      style={{
                        wordBreak: 'break-word', display: '-webkit-box', WebkitBoxOrient: 'vertical', 
                        lineHeight: '.7', WebkitLineClamp: 2, textOverflow: 'ellipsis'
                      }}>
                        oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                      </div>
                      <div className="d-flex justify-content-between p-1">
                        <small className="hxd-secondary-text fw-bold">#HabbletXD</small>
                        <span>100</span>
                      </div>
                    </Link>
                    <Link to="/" className="hxd-border hxd-primary-text bg-white text-decoration-none rounded" style={{width: "252px", height: '60px'}}>
                      <div className="hxd-border-bottom p-1 overflow-hidden" 
                      style={{
                        wordBreak: 'break-word', display: '-webkit-box', WebkitBoxOrient: 'vertical', 
                        lineHeight: '.7', WebkitLineClamp: 2, textOverflow: 'ellipsis'
                      }}>
                        oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                      </div>
                      <div className="d-flex justify-content-between p-1">
                        <small className="hxd-secondary-text fw-bold">#HabbletXD</small>
                        <span>100</span>
                      </div>
                    </Link>
                    <Link to="/" className="hxd-border hxd-primary-text bg-white text-decoration-none rounded" style={{width: "252px", height: '60px'}}>
                      <div className="hxd-border-bottom p-1 overflow-hidden" 
                      style={{
                        wordBreak: 'break-word', display: '-webkit-box', WebkitBoxOrient: 'vertical', 
                        lineHeight: '.7', WebkitLineClamp: 2, textOverflow: 'ellipsis'
                      }}>
                        oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                      </div>
                      <div className="d-flex justify-content-between p-1">
                        <small className="hxd-secondary-text fw-bold">#HabbletXD</small>
                        <span>100</span>
                      </div>
                    </Link>
                    <Link to="/" className="hxd-border hxd-primary-text bg-white text-decoration-none rounded" style={{width: "252px", height: '60px'}}>
                      <div className="hxd-border-bottom p-1 overflow-hidden" 
                      style={{
                        wordBreak: 'break-word', display: '-webkit-box', WebkitBoxOrient: 'vertical', 
                        lineHeight: '.7', WebkitLineClamp: 2, textOverflow: 'ellipsis'
                      }}>
                        oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                      </div>
                      <div className="d-flex justify-content-between p-1">
                        <small className="hxd-secondary-text fw-bold">#HabbletXD</small>
                        <span>100</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="d-flex flex-column" style={{flex: '1 0 0'}}>
                  <div className="fw-bold hxd-primary-text" role="heading" aria-level={3}>Ultimas artes</div>
                  <div className="d-flex gap-2" style={{flex: '1 0 0'}}>
                    <Link to="/" className="hxd-border d-flex flex-row text-decoration-none p-1 rounded" style={{width: '252px', height: '80px'}}>
                      <div className="bg-secondary h-100 hxd-border rounded" style={{width: '70px', flexShrink: '0'}}></div>
                      <div style={{width: '172px'}}>
                        <div className="h-75 w-100 ps-1 hxd-border-bottom" style={{lineHeight: '1'}}>
                          <span className="d-block w-100 fw-bold text-secondary text-truncate" >Titulo da aaaaaaaaaasssssssssssssaarte</span>  
                          <small className="d-block w-100 text-secondary text-truncate">Descrição da arte</small>
                        </div>
                        <small className="d-block hxd-secondary-text text-end fw-bold">00/00 às 00:00</small>
                      </div>
                    </Link>
                    <Link to="/" className="hxd-border d-flex flex-row text-decoration-none p-1 rounded" style={{width: '252px', height: '80px'}}>
                      <div className="bg-secondary h-100 hxd-border rounded" style={{width: '70px', flexShrink: '0'}}></div>
                      <div style={{width: '172px'}}>
                        <div className="h-75 w-100 ps-1 hxd-border-bottom" style={{lineHeight: '1'}}>
                          <span className="d-block w-100 fw-bold text-secondary text-truncate" >Titulo da aaaaaaaaaasssssssssssssaarte</span>  
                          <small className="d-block w-100 text-secondary text-truncate">Descrição da arte</small>
                        </div>
                        <small className="d-block hxd-secondary-text text-end fw-bold">00/00 às 00:00</small>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column col gx-0 gap-2 h-100">
                <div className="hxd-border rounded" style={{height: '80px'}}>
                  <small className="d-flex align-items-center hxd-bg-color ps-2 text-white fw-bold" style={{height: '25px'}}>Sobre mim</small>
                  <small className="p-1 overflow-hidden" 
                  style={{display: '-webkit-box', wordBreak: 'break-word', WebkitLineClamp: 3, 
                  WebkitBoxOrient: 'vertical', lineHeight: '1'}}>
                    {profile.missao}
                  </small>
                </div>
                <div className="hxd-border rounded">
                  <small className="d-flex align-items-center hxd-bg-color ps-2 text-white fw-bold" style={{height: '25px'}}>Twitter</small>
                  <small className="p-1 overflow-hidden" 
                  style={{display: '-webkit-box', wordBreak: 'break-word', WebkitLineClamp: 3, 
                  WebkitBoxOrient: 'vertical', lineHeight: '1'}}>
                    {profile.twitter}
                  </small>
                </div>
                <div className="hxd-border rounded">
                  <small className="d-flex align-items-center hxd-bg-color ps-2 text-white fw-bold" 
                  style={{height: '25px'}}
                  >
                    Trending topics mais usados
                  </small>
                  <small className="p-1 overflow-hidden" 
                  style={{display: '-webkit-box', wordBreak: 'break-word', WebkitLineClamp: 3, 
                  WebkitBoxOrient: 'vertical', lineHeight: '1'}}>
                  </small>
                </div>
                <span className="d-block hxd-bg-color text-white text-center fw-bold rounded" 
                style={{height: '30px', lineHeight: '30px'}}
                >
                  Web master
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default Profile;