import '../../static/css/profileEdit.css';

const ProfileEdit = () => {
  return (
    <>
      <div className="container">
        <div id="profile-edit" className="hxd-bg-color hxd-border w-100" style={{borderRadius: '7px'}}>
          <div className=" d-flex align-items-center w-100 ps-2 text-white" style={{height: '50px'}}>
            <h5>Editar perfil</h5>
          </div>
          <div className="w-100 bg-white p-2" style={{borderRadius: '7px'}}>
            <div className="d-flex flex-row">
              <div className="d-flex flex-column w-25 px-2">
                <small className="hxd-primary-text fw-bold">Fundo de perfil</small>
                <div className="hxd-border hxd-bg-colorLight" style={{flex: '1 0 0', borderRadius: '4px'}}></div>
                <button className="hxd-border hxd-primary-text bg-white mt-2 rounded">Trocar fundo de perfil</button>
              </div>
              <div className="d-flex flex-column w-75 ps-2">
                <label className="w-100 hxd-input__wrapper pt-3">
                  <input className="hxd-input" placeholder=" " />
                  <span className="hxd-input__label">Link do seu perfil do twitter</span>
                </label>
                <div className="d-flex flex-column gap-3">
                  <span className="hxd-primary-text fw-bold">Trocar senha</span>
                  <label className="w-100 hxd-input__wrapper">
                    <input className="hxd-input" placeholder=" " type="password" />
                    <span className="hxd-input__label">Senha atual</span>
                  </label>
                  <label className="w-100 hxd-input__wrapper">
                    <input className="hxd-input" placeholder=" " type="password" />
                    <span className="hxd-input__label">Nova senha</span>
                  </label>
                  <button className="hxd-bg-color border-0 text-white fw-bold rounded" style={{height: '35px'}}>Salvar nova senha</button>
                </div>
              </div>
            </div>
            <div className="p-2">
              <small className="hxd-primary-text fw-bold">Sobre mim</small>
              <textarea rows={3} className="hxd-border hxd-primary-text w-100 p-1 rounded" style={{lineHeight: '1.1'}}></textarea>
              <small className="hxd-primary-text fw-bold">Assinatura</small>
              <div className="w-100 hxd-border rounded">
                <div className="hxd-border-bottom ps-3">
                  <small>BB CODE</small>
                </div>
                <textarea rows={3} className="hxd-primary-text w-100 p-1 border-0" style={{lineHeight: '1.1'}}></textarea>
              </div>
              <div className="d-flex mt-2 gap-2">
                <button className="hxd-border hxd-primary-text w-50 bg-white rounded fw-bold">Descartar alterações</button>
                <button className="hxd-bg-color hxd-border w-50 border-0 text-white rounded fw-bold">Salvar alterações</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;