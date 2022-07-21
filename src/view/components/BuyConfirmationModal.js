import { Modal } from 'react-bootstrap';
import api from '../../static/js/api';

const BuyConfirmationModal = (props) => {

  const { user, setUser, isShowing, setIsShowing, beingBought, showProgress, hideProgress, sendAlert } = props;

  const handleBuy = async evt => {
    evt.preventDefault();

    const form = evt.target;
    const submit = evt.target.querySelector('button[type="submit"]');
    const data = {
      item: beingBought,
      discord: form.discord.value
    };

    if (data.discord === '')
      return sendAlert('warning', 'Você precisa especificar o seu discord para receber sua compra!');

    if (!/^.*#\d{4}$/g.test(data.discord)) 
      return sendAlert('warning', 'Seu discord não está no formato correto.');
    

    const init = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include'
    };

    submit.disabled = true;
    showProgress();
    const res = await api.buyable('buy', {}, init);
    hideProgress();
    submit.disabled = false;

    if (res.success) {
      sendAlert('success', res.success);
      setIsShowing(false);
      let xdcoins = parseInt(user.xdcoins) - beingBought.valor;
      setUser({ ...user, xdcoins});
    } else {
      sendAlert('danger', res.error);
    }
  };

  return (
    <Modal show={isShowing}>
      <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold rounded-top" 
      style={{height: '50px'}}>
        CODIGO DE COMPRA
      </div>
      <div className="d-flex flex-column gap-2 p-2">
        <form name="artPost" className="d-flex flex-column gap-4 mt-2" action="#" onSubmit={handleBuy}>
          <div className="hxd-primary-text text-center">Obaaa! Você fez uma compra na Habblet XD!</div>
          <label className="w-100 hxd-input__wrapper">
            <input name="name" className="hxd-input" value={beingBought?.nome} autoComplete="off" readOnly/>
            <span className="hxd-input__label">Sua compra</span>
          </label>
          <div>
            <label className="w-100 hxd-input__wrapper">
              <input name="discord" className="hxd-input" placeholder=" " autoComplete="off"/>
              <span className="hxd-input__label">Seu discord</span>
            </label>
            <small>Nossa equipe irá contacta-lo pelo discord para entregar a sua compra. Certifique-se de que o escreveu da forma correta!</small>
          </div>
          <label className="w-100 hxd-input__wrapper mt-3">
            <input name="codigo_compra" className="hxd-input" autoComplete="off" readOnly/>
            <span className="hxd-input__label">Código de compra</span>
          </label>
          <button className="hxd-btn w-100" type="submit" style={{height: '45px'}}>Pronto!</button>
        </form>
      </div>
    </Modal>
  );
};

export default BuyConfirmationModal;