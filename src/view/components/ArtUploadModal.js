import { useState } from 'react';
import { Modal } from 'react-bootstrap';

import FileUpload from './FileUpload';
import API from '../../static/js/api';

const ArtUploadModal = (props) => {
  const [showing, setShowing] = useState(false);
  const [image, setImage] = useState(null);

  const { showProgress, hideProgress, sendAlert, artModalIsShowing, setArtModalIsShowing } = props;

  const handleImageInput = (file) => {
    setImage(file);
  };

  
  const handleSubmit = async evt => {
    evt.preventDefault();

    showProgress();
    let formData = new FormData();

    let form = document.forms.artPost;
    let data = {
      titulo: form.name.value,
      descricao: form.description.value,
      categoria: form.category.value,
      autor: JSON.parse(localStorage.getItem('hxd-user-object')).usuario
    };

    formData.append('json', JSON.stringify(data));
    formData.append('arte', image);

    let res = await API.art('save', null, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (res.error) {
      sendAlert('danger', res.error);
    } else if (res.success) {
      sendAlert('success', res.success);
      setArtModalIsShowing(false);
    }

    hideProgress();
  };

  return (
    <>
      <button className="bg-transparent h-100 border-0"
        onClick={() => setArtModalIsShowing(true)}>
        <img src="https://img.icons8.com/ios-filled/24/000000/drawing.png"/>
      </button>
      <Modal show={artModalIsShowing} onHide={() => setArtModalIsShowing(false)} >
        <div className="d-flex justify-content-center align-items-center hxd-bg-color w-100 text-white fw-bold rounded-top" 
        style={{height: '50px'}}>
          POSTAR ARTE
        </div>
        <div className="d-flex flex-column gap-2 p-2">
          <form name="artPost" className="d-flex flex-column gap-4 mt-2" action="#" 
          onSubmit={handleSubmit}>
            <label className="w-100 hxd-input__wrapper">
              <input name="name" className="hxd-input" placeholder=" " autoComplete="off"/>
              <span className="hxd-input__label">Nome</span>
            </label>
            <label className="w-100 hxd-input__wrapper">
              <input name="description" className="hxd-input" placeholder=" " autoComplete="off" />
              <span className="hxd-input__label">Descrição</span>
            </label>
            <label className="w-100 hxd-input__wrapper">
              <select name="category" className="hxd-input" type="password">
                <option value="1">Moda</option>
              </select>
              <span className="hxd-input__label mb-1">Categoria</span>
            </label>
            <div>
              <FileUpload 
                className="hxd-input d-flex align-items-center justify-content-center h-100"
                onUpload={(file) => handleImageInput(file)} 
                placeholder="Clique aqui ou arraste a imagem"
                style={{
                  height: '50px'
                }}
              />
            </div>
            
            <button className="hxd-btn w-100" type="submit" style={{height: '45px'}}>Publicar</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ArtUploadModal;