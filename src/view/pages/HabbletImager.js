import { useState } from 'react';
import { useEffect } from 'react';

import '../../static/css/habbletimager.css';

const HabbletImager = () => {
  const URL = 'https://avatar.blet.in/';
  const [url, setUrl] = useState(URL+'HabbletXD');
  const [urlParams, setUrlParams] = useState({
    user: 'HabbletXD',
    action: 'std',
    crr: '',
    drk: '',
    size: 'b',
    head_direction: 2,
    direction: 2,
    gesture: 'std',
    headonly: 0
  });

  const handleUrlChange = () => {
    let newurl = `${URL}${urlParams.user}`;
    for (let key in urlParams) {
      if (key !== 'user' && urlParams[key] !== '')
        if (key === 'crr' || key === 'drk')
          newurl += `,${key}=${urlParams[key]}`;
        else
          newurl += `&${key}=${urlParams[key]}`;
    }
    setUrl(newurl);
  };

  const handleUrlParamsChange = (key, value) => {
    urlParams[key] = value;
    setUrlParams(urlParams);
    handleUrlChange();
  };

  //`https://avatar.blet.in/HabbletXD&action=wlk,crr=0&size=b&head_direction=2&direction=2&gesture=spk&headonly=0`;

  useEffect(() => {
  }, []);
  return (
    <>
      <div className="container">
        <section>
          <div className="hxd-bg-color d-flex align-items-center rounded ps-3" style={{height: '60px'}}>
            <h4 className="text-white">Habblet Imager</h4>
          </div>
          <div className="d-flex mt-4 gap-3">
            <div>
              <div className="hxd-bg-color px-5 py-2 rounded">
                <span className="text-white">Habblet Hotel</span>
              </div>
              <div className="mt-2 hxd-border rounded overflow-hidden text-center" style={{height: '250px', backgroundImage: 'url(https://i.imgur.com/PAIFiy5.png)'}}>
                <img src={url} alt="" />
              </div>
              <div className="d-flex justify-content-between hxd-border mt-1">
                <button className="hxd-bg-color border-0 rounded text-white"
                onClick={() => 
                  handleUrlParamsChange('head_direction', urlParams.head_direction === 7 ? urlParams.head_direction : urlParams.head_direction + 1)}>
                  <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <span className="hxd-primary-text">Cabeça</span>
                <button className="hxd-bg-color border-0 rounded text-white"
                onClick={() => 
                  handleUrlParamsChange('head_direction', urlParams.head_direction === 0 ? urlParams.head_direction : urlParams.head_direction - 1)}>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
              </div>
              <div className="d-flex justify-content-between hxd-border mt-1">
                <button className="hxd-bg-color border-0 rounded text-white"
                onClick={() => 
                handleUrlParamsChange('direction', urlParams.direction === 7 ? urlParams.direction : urlParams.direction + 1)}>
                  <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <span className="hxd-primary-text">Corpo</span>
                <button className="hxd-bg-color border-0 rounded text-white"
                onClick={() => 
                  handleUrlParamsChange('direction', urlParams.direction === 0 ? urlParams.direction : urlParams.direction - 1)}>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
              </div>
            </div>
            <div className="d-flex flex-column gap-2" style={{flex: '1 0 0'}}>
              <label className="hi-menu__label">
                <span>Nick</span>
                <input className="hi-menu__input" type="text" placeholder="HabbletXD" 
                onChange={evt => handleUrlParamsChange('user', evt.target.value)} />
              </label>
              <label className="hi-menu__label">
                <span>Expressão</span>
                <select defaultValue="std" className="hi-menu__input"
                onChange={evt => handleUrlParamsChange('gesture', evt.target.value)}>
                  <option value="std">Normal</option>
                  <option value="spk">Falando</option>
                  <option value="sml">Sorrindo</option>
                  <option value="srp">Surpreso</option>
                  <option value="agr">Nervoso</option>
                  <option value="sad">Triste</option>
                  <option value="lol">Sem Rosto</option>
                </select>
              </label>
              <label className="hi-menu__label">
                <span>Ação</span>
                <select defaultValue="std" className="hi-menu__input"
                onChange={evt => handleUrlParamsChange('action', evt.target.value)}>
                  <option value="std">Normal</option>
                  <option value="wlk">Andando</option>
                  <option value="wlk,wav">Andando/Acenando</option>
                  <option value="sit">Sentado</option>
                  <option value="sit,wav">Sentado/Acenando</option>
                  <option value="lay">Deitado</option>
                  <option value="wav">Acenando</option>
                </select>
              </label>
              <label className="hi-menu__label">
                <span>Tamanho</span>
                <div className="hi-menu__input d-flex align-items-center gap-2">
                  <label>
                    <input type="radio" name="size" value="s" 
                    onChange={evt => handleUrlParamsChange('size', evt.target.value)} />
                    <span className="ms-2">Pequeno</span>
                  </label>
                  <label>
                    <input type="radio" name="size" value="b"
                    onChange={evt => handleUrlParamsChange('size', evt.target.value)} />
                    <span className="ms-2">Medio</span>
                  </label>
                  <label>
                    <input type="radio" name="size" value="l" 
                    onChange={evt => handleUrlParamsChange('size', evt.target.value)} />
                    <span className="ms-2">Grande</span>
                  </label>
                </div>
              </label>
              <label className="hi-menu__label">
                <span>Objeto</span>
                <select defaultValue="" className="hi-menu__input"
                onChange={evt => handleUrlParamsChange('crr', evt.target.value)}>
                  <option value="">Nenhum</option>
                  <option value="0">Nada (Objeto imaginário)</option>
                  <option value="1">Água</option>
                  <option value="44">Bebida Tóxica</option>
                  <option value="6">Café</option>
                  <option value="2">Cenoura</option>
                  <option value="42">Chá Japonês</option>
                  <option value="667">Coquetel</option>
                  <option value="5">Habbo Refri</option>
                  <option value="9">Poção do Amor</option>
                  <option value="3">Sorvete</option>
                  <option value="33">Sorvete (Callipo)</option>
                  <option value="43">Suco de Tomate</option>
                </select>
              </label>
              <label className="hi-menu__label">
                <span>URL</span>
                <input className="hi-menu__input" style={{fontSize: '.75rem'}} type="text" placeholder="URL" value={url}
                onMouseOver={(evt) => evt.target.select()} onMouseOut={evt => evt.target.blur()} />
              </label>
              <label className="hi-menu__label">
                <span>Formato</span>
                <select defaultValue="png" className="hi-menu__input">
                  <option value="png">PNG</option>
                </select>
              </label>
              <label>
                <input type="checkbox" 
                onChange={evt => handleUrlParamsChange('headonly', evt.target.checked ? 1 : 0)} />
                <span className="ms-2">Apenas cabeça</span>
              </label>
            </div>
            
          </div>
        </section>
      </div>
    </>
  )
};

export default HabbletImager;