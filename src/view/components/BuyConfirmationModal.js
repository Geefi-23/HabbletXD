import { Modal } from 'react-bootstrap';

const BuyConfirmationModal = (props) => {

  const { isShowing, setIsShowing } = props;

  return (
    <Modal show={isShowing}>
      <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold rounded-top" 
      style={{height: '50px'}}>
        CODIGO DE COMPRA
      </div>
      <div className="d-flex flex-column gap-2 p-2">
        <form name="artPost" className="d-flex flex-column gap-4 mt-2" action="#">
          <div className="hxd-primary-text text-center">Obaaa! Você fez uma compra na Habblet XD!</div>
          <label className="w-100 hxd-input__wrapper">
            <input name="name" className="hxd-input" value="Mobi super pika" autoComplete="off" readOnly/>
            <span className="hxd-input__label">Sua compra</span>
          </label>
          <div>
            <label className="w-100 hxd-input__wrapper">
              <input name="name" className="hxd-input" placeholder=" " autoComplete="off"/>
              <span className="hxd-input__label">Seu discord</span>
            </label>
            <small>Nossa equipe irá contacta-lo pelo discord para entregar a sua compra. Certifique-se de que o escreveu da forma correta!</small>
          </div>
          <label className="w-100 hxd-input__wrapper mt-3">
            <input name="description" className="hxd-input" autoComplete="off" readOnly/>
            <span className="hxd-input__label">Código de compra</span>
          </label>
          <button className="hxd-btn w-100" type="submit" style={{height: '45px'}}>Pronto!</button>
        </form>
      </div>
    </Modal>
  );
};

export default BuyConfirmationModal;