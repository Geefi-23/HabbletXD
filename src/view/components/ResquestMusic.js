import { Modal } from 'react-bootstrap';

const RequestMusic = (props) => {

  const { isShowing, setIsShowing, text, onAccept, onDeny, beingBought } = props;

  return (
//   <Modal show={isShowing} onHide={(isShowing) =>(setIsShowing(false))} > 
    <Modal show = {isShowing} onHide={(isShowing)=>(setIsShowing(false))} >
      <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold rounded-top" 
      style={{height: '50px'}}>
       PEDIR MUSICA
      </div>
    
      <div className="d-flex flex-column gap-2 p-2">
        <label className="hxd-input__wrapper">
            <input className="hxd-input" placeholder=' ' type="text"  /> 
            <span className="hxd-input__label">musica musica poha</span>
        </label>
        <button className="hxd-btn w-100" type="submit" style={{height: '45px'}}

        onClick={onAccept}>
      Confirmar Pedido
        </button>
      </div>
    </Modal>
  );
};

export default RequestMusic;