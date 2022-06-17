import { Modal } from 'react-bootstrap';

const PresentModal = (props) => {

  const { isShowing, setIsShowing, text, onAccept, onDeny, beingBought } = props;

  return (
    //onHide={(isShowing) =>(false)}
    <Modal show={isShowing} onHide={(isShowing) =>(setIsShowing(false))} > 
      <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold rounded-top" 
      style={{height: '50px'}}>
        MARCAR PRESENÇA
      </div>
    
      <div className="d-flex flex-column gap-2 p-2">
        <label className="hxd-input__wrapper">
            <input className="hxd-input" placeholder=' ' type="text"  /> 
            <span className="hxd-input__label">eaee</span>
        </label>
        <button className="hxd-btn w-100" type="submit" style={{height: '45px'}}
        onClick={onAccept}>
            Marcar presença
        </button>
      </div>
    </Modal>
  );
};

export default PresentModal;