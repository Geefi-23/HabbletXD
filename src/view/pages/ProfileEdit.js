import { useEffect, useState, useRef } from 'react';
import api from '../../static/js/api';

import '../../static/css/profileEdit.css';

const ProfileEdit = (props) => {
  let { user, setUser, sendAlert, showProgress, hideProgress } = props;

  const avatarImageRef = useRef();

  const handleAvatarChange = evt => {
    const image = evt.target.files[0];
    const imageURL = URL.createObjectURL(image);
    avatarImageRef.current.style.background = `url('${imageURL}')`;
  };

  const handleSaveChanges = async (evt) => {
    evt.preventDefault();

    let form = evt.target;

    const formData = new FormData();

    let data = {
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

    let avatar = form.fundo_perfil.files[0];
    if (avatar !== undefined)
      formData.append('fundo_perfil', avatar);
    formData.append('data', JSON.stringify(data));
    
    showProgress();
    let res = await api.user('update', { method: 'POST', body: formData, credentials: 'include' });
    hideProgress();
    if (res.error) {
      sendAlert('danger', res.error);
    } else {

      let r = await api.user('get', { method: 'POST', body: JSON.stringify({ usuario: user.usuario }) });

      let avatar = await api.media('get', { filename: r.user.avatar });
      avatar = URL.createObjectURL(avatar);
      r.user.avatar = avatar;

      setUser(r.user);
      sendAlert('success', res.success);
    }
  };

  useEffect(() => {
    hideProgress();
  }, []);
  
  return (
    <>
    { 
      user ?
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
                <div className="hxd-border overflow-hidden rounded text-center" 
                  ref={avatarImageRef}
                  style={{
                    height: '125px', 
                    background: user?.avatar !== '' ? `url('${user?.avatar}')` : '#cacad9',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}>
                  <img 
                    src={`https://avatar.blet.in/${user?.usuario}&action=std&size=l&head_direction=3&direction=2&gesture=sml&headonly=0`}
                    style={{objectPosition: '0 -30px' }}
                    alt=""
                  />
                </div>
                <label>
                  <div className="d-flex justify-content-center align-items-center hxd-border hxd-primary-text bg-white mt-2 p-1 rounded"
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '50px', height: '10px', background: '#cacad9', marginRight: '8px' }}></div>
                    <small>Trocar fundo de perfil</small>
                  </div>
                  <input name="fundo_perfil" type="file" accept="image/*" style={{display: 'none'}} onChange={handleAvatarChange} />
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