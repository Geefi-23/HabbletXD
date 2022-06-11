import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import FileUpload from './FileUpload';
import api from '../../static/js/api';

const ArtUploadModal = (props) => {
  const [showing, setShowing] = useState(false);
  const [upload, setUpload] = useState(null);
  const [categories, setCategories] = useState([]);

  const { showProgress, hideProgress, sendAlert, artModalIsShowing, setArtModalIsShowing } = props;

  const handleImageInput = (file) => {
    setUpload(file);
  };

  const poolCategories = async () => {
    let res = await api.art('getallcategories');

    if (res.success) {
      setCategories(res.categories);
    }
  };
  
  const handleSubmit = async evt => {
    evt.preventDefault();

    showProgress();
    let formData = new FormData();

    let form = document.forms.artPost;
    let data = {
      titulo: form.name.value,
      descricao: form.description.value,
      categoria: form.category.value
    };

    formData.append('json', JSON.stringify(data));
    formData.append('arte', upload);

    let res = await api.art('save', {}, {
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

  useEffect(() => {
    poolCategories();
  }, []);

  return (
    <>
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
                {
                  categories.map(category => (
                    <option value={category.id}>{category.nome}</option>
                  ))
                }
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