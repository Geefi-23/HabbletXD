import { useRef, useEffect, useState } from 'react';
import API from '../../static/js/api';

import '../../static/css/profileEdit.css';

const ProfileEdit = (props) => {
  let { isAuth, sendAlert, showProgress, hideProgress, notify } = props;
  const [user, setUser] = useState({});
  const profilePicRef = useRef(null);

  const handleProfilePicChange = (evt) => {
    let img = evt.target.files[0];
    let fr = new FileReader();

    fr.onload = () => {
      profilePicRef.current.src = fr.result;
    };

    fr.readAsDataURL(img);
  };

  const setUserObject = () => {
    let usr = JSON.parse(localStorage.getItem('hxd-user-object'));
    setUser(usr);
  };

  const handleSaveChanges = async (evt) => {
    evt.preventDefault();

    let form = evt.target;
    let data = {
      usuario: user.usuario,
      senha: form.senha.value,
      novasenha: form.novasenha.value,
      rnovasenha: form.rnovasenha.value,
      twitter: form.twitter.value,
      missao: form.missao.value,
      assinatura: form.assinatura.value
    };

    if (data.senha === '') {
      return sendAlert('warning', 'Você precisa confirmar sua senha atual para atualizarmos seus dados!');
    }

    if (data.novasenha !== data.rnovasenha) {
      return sendAlert('warning', 'A senha nova não corresponde com a sua repetição!');
    }
    
    showProgress();
    let res = await API.user('update', { method: 'POST', body: JSON.stringify(data) });
    hideProgress();
    if (res.error) {
      sendAlert('danger', res.error);
    } else {

      let r = await API.user('get', { method: 'POST', body: JSON.stringify({ usuario: user.usuario }) });
      localStorage.setItem('hxd-user-object', JSON.stringify(r.user));
      setUser(r.user);
      sendAlert('success', res.success);
    }
  };

  useEffect(() => {
    setUserObject();
  }, []);
  
  return (
    <>
    { 
      isAuth ?
      <div className="container">
        <div id="profile-edit" className="hxd-bg-color hxd-border w-100" style={{borderRadius: '7px'}}>
          <div className=" d-flex align-items-center w-100 ps-2 text-white" style={{height: '50px'}}>
            <h5>Editar perfil</h5>
          </div>
          <form className="w-100 bg-white p-2" style={{borderRadius: '7px'}}
            onSubmit={handleSaveChanges}
          >
            <div className="d-flex flex-row">
              <div className="d-flex flex-column w-25 px-2">
                <small className="hxd-primary-text fw-bold">Fundo de perfil</small>
                <div className="hxd-border hxd-bg-colorLight overflow-hidden" style={{height: '180px', borderRadius: '4px'}}>
                  <img ref={profilePicRef} className="w-100 h-100" src="" alt="" />
                </div>
                <label>
                  <div className="d-flex justify-content-center hxd-border hxd-primary-text bg-white mt-2 p-1 rounded"
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    Trocar fundo de perfil
                  </div>
                  <input type="file" style={{display: 'none'}} onChange={handleProfilePicChange} />
                </label>
              </div>
              <div className="d-flex flex-column w-75 ps-2">
                <label className="w-100 hxd-input__wrapper pt-3">
                  <input className="hxd-input" placeholder=" " name="twitter" defaultValue={user.twitter} />
                  <span className="hxd-input__label">Link do seu perfil do twitter</span>
                </label>
                <div className="d-flex flex-column gap-3">
                  <label className="w-100 hxd-input__wrapper mt-3">
                    <input className="hxd-input" placeholder=" " name="senha" type="password" />
                    <span className="hxd-input__label">Confirme sua senha atual</span>
                  </label>
                  <span className="hxd-primary-text fw-bold">Trocar senha</span>
                  <label className="w-100 hxd-input__wrapper">
                    <input className="hxd-input" placeholder=" " name="novasenha" type="password" />
                    <span className="hxd-input__label">Nova senha</span>
                  </label>
                  <label className="w-100 hxd-input__wrapper">
                    <input className="hxd-input" placeholder=" " name="rnovasenha" type="password" />
                    <span className="hxd-input__label">Repita a nova senha</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-2">
              <small className="hxd-primary-text fw-bold">Sobre mim</small>
              <textarea rows={3} className="hxd-border hxd-primary-text w-100 p-1 rounded" 
              style={{lineHeight: '1.1'}} defaultValue={user.missao}
              name="missao"
              >
              </textarea>
              <small className="hxd-primary-text fw-bold">Assinatura</small>
              <div className="w-100 hxd-border rounded">
                <div className="hxd-border-bottom ps-3">
                  <small>BB CODE</small>
                </div>
                <textarea rows={3} className="hxd-primary-text w-100 p-1 border-0" style={{lineHeight: '1.1'}}
                name="assinatura"></textarea>
              </div>
              <div className="d-flex mt-2 gap-2">
                <button className="hxd-border hxd-primary-text w-50 py-2 bg-white rounded fw-bold" type="reset">Descartar alterações</button>
                <button className="hxd-bg-color hxd-border w-50 py-2 border-0 text-white rounded fw-bold" type="submit">Salvar alterações</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      :
      <h4>Você não está conectado</h4>
    }
    </>
  );
};

export default ProfileEdit;