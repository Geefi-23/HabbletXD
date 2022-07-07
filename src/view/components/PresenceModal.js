import { Modal } from 'react-bootstrap';
import api from '../../static/js/api';
import notif from '../../static/js/notifications.js';

const PresenceModal = (props) => {

  const { show, setShow, onAccept, sendAlert, showProgress, hideProgress } = props;

  const handleSavePresence = async (evt) => {
    evt.preventDefault();
    let cod = evt.target.codigo.value;
    
    showProgress();
    const res = await api.user('savepresence', { cod }, { credentials: 'include' });
    hideProgress();

    if (res.success) {
      sendAlert('success', res.success);
      setShow(false);
    } else {
      sendAlert('danger', res.error);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} > 
      <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold rounded-top" 
      style={{height: '50px'}}>
        PRESENÇA
      </div>
    
      <form action="#" className="d-flex flex-column gap-2 p-3" onSubmit={handleSavePresence}>
        <label className="hxd-input__wrapper">
          <input className="hxd-input" placeholder=' ' type="text" name="codigo" autoComplete='off' /> 
          <span className="hxd-input__label">Código</span>
        </label>
        <button className="hxd-btn w-100" type="submit" style={{height: '45px'}}
        onClick={onAccept}>
          Marcar presença
        </button>
      </form>
    </Modal>
  );
};

export default PresenceModal;