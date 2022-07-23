//ADORAMOS BTS //
//@author geefi e marcos

import React from 'react';
import { useEffect, useState } from 'react';
import Glide from '@glidejs/glide';
import api from '../../static/js/api';
import Slider from '../../static/js/slider';
import '../../static/css/valores.css';

const Card = props => {
  const [value, setValue] = useState({});
  const { refer } = props;

  useEffect(() => {
    setValue(refer);

  }, [refer]);

  return (
    <article className="card-valores"> {/*tag semantica, sempre usa article para cards*/}
      <div className="card-valores__view"> {/*vai aparecer a foto do bagui e o nome*/}
        <div 
          className="position-relative d-flex justify-content-center align-items-center" 
          style={{ flex: '1 0 0' }}
        >
          <img src={value?.imagem} alt="" />

          {
            value?.categoria_id === '3' && value?.emblema !== '' &&
              <div 
                className='position-absolute d-flex justify-content-center align-items-center hxd-bg-colorDark rounded'
                style={{
                  width: '50px',
                  height: '50px',
                  top: '.5rem',
                  right: '.5rem'
                }}
              >
                <img src={value?.emblema} alt="" />
              </div>
          }

        </div> {/*esse flex 1 0 0 é pra preencher o tamanho restante*/}

        <div style={{ height: '50px' }} className="d-flex justify-content-center align-items-center bg-white">
          <small className="hxd-primary-text text-center">{value?.nome}</small>
        </div>
      </div>
      <div className="d-flex flex-column gap-1 mt-1 text-center">
        <small className="hxd-bg-color text-white p-1 rounded" style={{ fontSize: '11px'}}>
          Valor na loja: {value?.preco?.split(/(?=(?:\d{3})*$)/g).join('.')} {value?.moeda}s 
          <img 
            className='ms-2'
            src={
              {
                asinha: 'https://images-ext-2.discordapp.net/external/ggUUhqIdZB9KgVJs1Nrt21n1LtDC1eZ80eLhgQDw3EI/https/www.habblet.city/assets/images/icons/asinhas.gif',
                diamante: 'https://media.discordapp.net/attachments/933862913532391454/939682758765182996/icon_diamante.png'
              }[value?.moeda]
            }
          />
        </small>
        <small className="bg-white hxd-primary-text hxd-border p-1 rounded">
          Valor em LTD: {value?.valorltd}
        </small>
        <small className="hxd-bg-color text-white p-1 rounded">
          Situação: {value?.situacao}
        </small>
      </div>
    </article>
  );
};

const Valores = ({ hideProgress, getCurrentTheme }) => {
  const [values, setValues] = useState([]);
  const [searchedValues, setSearchedValues] = useState([]);
  const [valuesAreReversed, setValuesAreReversed] = useState(false);
  const [slider, setSlider] = useState(null);

  const pool = async () => {
    const values = await api.values('pagination', {offset: 0, limit: 5});
    values.map((v) => v.imagem = api.getMedia(v.imagem));
    setValues(values);
  };

  const mountSlider = () => {
    let slider = new Glide('#slider', {
      type: 'slider',
      perView: 5,
      rewind: false,
      bound: true,
      gap: 4,
      breakpoints: {
        1366: {
          perView: 4
        }
      }
    });

    document.querySelector('#slider-arrowPrev').onclick = () => {
      slider.go('<');
    };

    document.querySelector('#slider-arrowNext').onclick = () => {
      slider.go('>');
    };

    slider.mount();
  };

  const handleSearch = evt => {
    evt.preventDefault();

    let q = evt.target.q.value.toLowerCase();
    
    slider.reload({ filter: q });
    
  };

  const handleFilter = evt => {
    let order = evt.target.value;

    slider.reload({ order });
  };

  useEffect(() => {
    hideProgress();
    //mountSlider();
    //pool();
  }, [searchedValues]);

  useEffect(() => {
    let slider = Slider({
      slider: '#slider',
      perView: 1,
      apiRoute: 'values',
      paginationOffset: 5,
      arrowPrev: '#slider-arrowPrev',
      arrowNext: '#slider-arrowNext',
      order: 'desc',
      filter: '',
      paginationCallback: (pag, slide, slidesWrapper) => {
        let cards = pag.map((value) => {
          const card = `<article class="card-valores" style="flex: 1 0 0">
            <div class="card-valores__view">
              <div 
                class="position-relative d-flex justify-content-center align-items-center" 
                style="flex: 1 0 0"
              >
                <img src="${api.getMedia(value?.imagem)}" alt="" />
      
                ${
                  value?.categoria_id === '3' && value?.emblema !== '' ?
                    `<div 
                      class="position-absolute d-flex justify-content-center align-items-center hxd-bg-colorDark rounded"
                      style="width: 50px; height: 50px; top: .5rem; right: .5rem"
                    >
                      <img src="${value?.emblema}" alt="" />
                    </div>`
                    : ''
                }
      
              </div>
      
              <div style="height: 50px" class="d-flex justify-content-center align-items-center bg-white">
                <small class="hxd-primary-text text-center">${value?.nome}</small>
              </div>
            </div>
            <div class="d-flex flex-column gap-1 mt-1 text-center">
              <small class="hxd-bg-color text-white p-1 rounded" style="font-size: 11px">
                Valor na loja: ${value?.preco?.split(/(?=(?:\d{3})*$)/g).join('.')} ${value?.moeda}s 
                <img 
                  class='ms-2'
                  src="
                    ${{
                      asinha: 'https://images-ext-2.discordapp.net/external/ggUUhqIdZB9KgVJs1Nrt21n1LtDC1eZ80eLhgQDw3EI/https/www.habblet.city/assets/images/icons/asinhas.gif',
                      diamante: 'https://media.discordapp.net/attachments/933862913532391454/939682758765182996/icon_diamante.png'
                    }[value?.moeda]}
                  "
                />
              </small>
              <small class="bg-white hxd-primary-text hxd-border p-1 rounded">
                Valor em LTD: ${value?.valorltd}
              </small>
              <small class="hxd-bg-color text-white p-1 rounded">
                Situação: ${value?.situacao}
              </small>
            </div>
          </article>`

          // convertendo a string em um elemento html
          const template = document.createElement('template');
          template.innerHTML = card.trim();

          return template.content.firstChild;
          
        });

        slide.classList.add('d-flex', 'gap-1');
        slide.append(...cards);
        slidesWrapper.append(slide);
      }
    }).mount();
    setSlider(slider);
  }, []);

  return (
    <main className="container">
      <section className="section">
        <div className="section__header hxd-bg-color rounded p-2">

          <h4 className="text-white m-0 ms-2">Valores</h4>
        </div>
        <div className="section__content">
          <section className="section">
            <div className="section__header justify-content-between">
              <div className='d-flex'>
                <img src={`https://img.icons8.com/ios-glyphs/42/${getCurrentTheme('theme-colorDark-hex')}/bullish.png`}/>
                <div className="ms-3">
                  <h4 className="hxd-primary-text m-0">
                    Valores <span className="hxd-secondary-text">de raros</span>
                  </h4>
                  <span className="hxd-secondary-text">Veja todos os valores de todos os raros do Habblet Hotel.</span>
                </div>
              </div>

              <div className="d-flex gap-2" style={{ height: '40px' }}>
                <select className="hxd-border bg-transparent rounded p-2 hxd-primary-text" onChange={handleFilter}>
                  <option value="desc">Mais recente</option>
                  <option value="asc">Mais antigo</option>
                </select>
                <form action="#" onSubmit={handleSearch} className="d-flex hxd-border rounded">
                  <button className="bg-transparent border-0 hxd-primary-text">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"viewBox="0 0 24 24" fill="currentColor">
                      <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
                    </svg>
                  </button>
                  <input className="bg-transparent border-0" name="q" type="search" placeholder='Pesquisar' autoComplete='off'/>
                </form>
              </div>
            </div>
            <div className="section__content align-items-end flex-column">
              <div className="section__nav-tools mb-3">
                <button id="slider-arrowPrev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </button>
                <button id="slider-arrowNext">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </div>
              <div id="slider" className="slider">
                <div className="slider__track">
                  <div className='slider__slides'>
                    {/*
                      (() => {
                        let slides = [];

                        for (let i = 0; i < values.length; i+=6) {
                          let slide = values.slice(i, i+6);
                          slides.push((
                            <div className="slider__item d-flex gap-1">
                              {
                                slide.map((value) => (
                                  <Card refer={value} />
                                ))
                              }
                            </div>
                          ));
                        }

                        return slides;
                      })()
                    */}
                  </div>
                </div>
              </div>
              {/*<div id="slider" className='glide'>
                <div className='glide__track' data-glide-el="track">
                  <div className='glide__slides'>
                  {
                    searchedValues.length === 0 ?
                    (() => {
                      let vs = values.map(value => (
                        <Card refer={value} key={value.id} />
                      ));

                      if (valuesAreReversed) {
                        vs = vs.reverse();
                      }

                      return vs;
                    })()
                    :
                    searchedValues.map(value => (
                      <Card refer={value} key={value.id} />
                    ))
                  }
                  </div>
                </div>
                </div>
                <div id="slider" className='slider'>
                  <div className="slider__track">
                    <div className="slider__slides">
                      <div className="slider__item">

                      </div>
                    </div>
                  </div>
                </div>
              </div>*/}
            </div>
          </section>
        </div>
      </section>
    </main>
  );

}
export default Valores;