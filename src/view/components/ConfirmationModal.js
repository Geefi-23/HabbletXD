import { Modal } from 'react-bootstrap';

const ConfirmationModal = (props) => {

  const { isShowing, setIsShowing, text, onAccept, onDeny, beingBought, userCoins } = props;

  return (
    <Modal show={isShowing}>
      <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold rounded-top" 
      style={{height: '50px'}}>
        CONFIRMAÇÃO
      </div>
      {
        parseInt(userCoins) < parseInt(beingBought?.valor) ?
          <div className="p-2 text-center">
            <h5 className='hxd-primary-text'>Você não tem xd's suficientes para realizar esta compra!</h5>
            <button className="hxd-border-2 bg-white rounded w-100 mt-5" type="submit" style={{height: '45px'}}
            onClick={() => setIsShowing(false)}>
              Ok
            </button>
          </div>
        :
          <div className="d-flex flex-column gap-2 p-2">
            <span>
              Comprando: <strong>{beingBought?.nome}</strong><br />
              Valor: <strong>{beingBought?.valor}</strong> XD's
            </span>
            <h6 className="hxd-primary-text text-center">{text}</h6>
            <button className="hxd-btn w-100" type="submit" style={{height: '45px'}}
            onClick={onAccept}>
              Sim
            </button>
            <button className="hxd-border-2 bg-white rounded w-100" type="submit" style={{height: '45px'}}
            onClick={onDeny}>
              Não
            </button>
          </div>
      }
    </Modal>
  );
};

export default ConfirmationModal;