import { Modal } from 'react-bootstrap';
import api from '../../static/js/api';

const RequestMusicModal = (props) => {

  const { show, setShow, sendAlert, showProgress, hideProgress } = props;

  const handleMusicRequest = async (evt) => {
    evt.preventDefault();

    const data = {
      pedido: evt.target.musica.value
    };

    const init = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include'
    };

    showProgress();
    const res = await api.musicRequest('save', {}, init);
    hideProgress();

    if (res.success) {
      sendAlert('success', res.success);
      setShow(false);
    } else {
      sendAlert('danger', res.error);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold rounded-top" 
      style={{height: '50px'}}>
       PEDIR MUSICA
      </div>
    
      <form 
        action="#" 
        className="d-flex flex-column gap-2 p-3"
        onSubmit={handleMusicRequest}
      >
        <label className="hxd-input__wrapper">
          <input name="musica" className="hxd-input" placeholder=' ' type="text"  /> 
          <span className="hxd-input__label">Música</span>
        </label>
        <button 
          className="hxd-btn w-100" 
          type="submit" 
          style={{height: '45px'}}
        >
          Confirmar Pedido
        </button>
      </form>
    </Modal>
  );
};

export default RequestMusicModal;