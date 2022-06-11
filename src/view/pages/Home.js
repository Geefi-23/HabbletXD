import { useEffect, useRef, useState, useCallback } from 'react';
import useInterval from '../../hooks/useInterval';

import BuyConfirmationModal from '../components/BuyConfirmationModal';
import ConfirmationModal from '../components/ConfirmationModal';

import api from '../../static/js/api';

import '../../static/css/home.css';
import '../../static/css/cards.css';
import '@glidejs/glide/dist/css/glide.core.css';

import { NewsCard, ArtCard, TimelineCard, SpotlightCard } from '../components/Cards';
import Glide from '@glidejs/glide';

const Home = (props) => {
  const { showProgress, hideProgress, sendAlert } = props;

  const [buyConfirmationShow, setBuyConfirmationShow] = useState(false);
  const [confirmationForBuyShow, setConfirmationForBuyShow] = useState(false);
  
  const [badges, setBadges] = useState([1, 2, 3, 4, 5]);
  const [mobis, setMobis] = useState([]);
  const [allNews, setAllNews] = useState(null);
  const [allSpotlights, setAllSpotlights] = useState([]);
  const [allTimelines, setAllTimelines] = useState([]);
  const [allArts, setAllArts] = useState([]);
  const [beingBought, setBeingBought] = useState({});

  const btnScrollTopRef = useRef(null);
  const timelineWriterRef = useRef(null);
  const handleScrollTopBtn = () => {
    try {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btnScrollTopRef.current.style.visibility = "visible";
      } else {
        btnScrollTopRef.current.style.visibility = "hidden";
      }
    } catch(e) {
      //do nothing
    }
  };

  const rgbToHex = (rgbString) => {
    let values = rgbString.replaceAll(',', '').split(' ');

    if (values.length !== 3) return;
    
    const componentToHex = (x) => {
      var hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return componentToHex(values[0]) + componentToHex(values[1]) + componentToHex(values[2]);
  };

  /**
   * @author Milton R. (Geefi)
   * 
   * @param {string} glideElement O elemento glide (retornado de new Glide()) para qual as arrows estão sendo configuradas
   * @param {string} prevSelector selector da arrow para a esquerda
   * @param {string} nextSelector selector da arrow para a direita
   * 
   * @description Configura arrows especiais de fora do elemento slider
   * 
   * O Glide.js não permite, por padrão, que as arrows de navegação dos sliders estejam fora
   * do elemento Glide. Esta função serve para configurar arrows externas.
   */
  const slidersArrowsSetListener = (glideElement, prevSelector, nextSelector) => {
    document.querySelector(prevSelector).addEventListener('click', () => {
      glideElement.go('<');
    });

    document.querySelector(nextSelector).addEventListener('click', () => {
      glideElement.go('>');
    });
  };

  /**
   * Função que configura os sliders da página
   */
  const configureSliders = useCallback(() => {
    let newsSlider = new Glide('#news-slider', {
      type: 'slider',
      perView: 3,
      gap: 8
    });

    let lojaoXD = new Glide('#ljxd-slider', {
      type: 'slider',
      perView: 5,
      gap: 16,
      peek: {
        before: 0,
        after: 64
      }
    });

    let lojaoEmblemas = new Glide('#ljem-slider', {
      type: 'slider',
      perView: 5,
      gap: 16,
      peek: {
        before: 0,
        after: 64
      }
    });

    let emblemasGratis = new Glide('#emblemasGratis-slider', {
      type: 'slider',
      perView: 8,
      gap: 8,
    });

    slidersArrowsSetListener(lojaoXD, '#ljxd-arrowPrev', '#ljxd-arrowNext');
    slidersArrowsSetListener(lojaoEmblemas, '#ljem-arrowPrev', '#ljem-arrowNext');
    slidersArrowsSetListener(newsSlider, '#news-arrowPrev', '#news-arrowNext');
    slidersArrowsSetListener(emblemasGratis, '#egs-arrowLeft', '#egs-arrowRight');

    lojaoXD.mount();
    lojaoEmblemas.mount();
    newsSlider.mount();
    emblemasGratis.mount()
  }, []);

  /**
   * @author Milton R. (Geefi)
   * 
   * @description Controlador de posts na timeline
   */
  const handleTimelinePost = async (evt) => {
    evt.preventDefault();
    const submit = evt.target.querySelector('button[type="submit"]');

    let form = document.forms['timeline_sender'];
    let writer = form.querySelector('div[contenteditable]');
    let data = {
      texto: writer.textContent
    };

    if (data.texto === '')
      return sendAlert('danger', 'Você não escreveu nada!')

    showProgress();
    submit.disabled = true;
    let res = await api.timeline('save', {}, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include'
    });
    submit.disabled = false;
    hideProgress();
    if (res.success){
      sendAlert('success', res.success);
      console.log(res?.award)
      writer.textContent = '';
    } else if (res.error)
      sendAlert('danger', res.error);
  };

  const pool = useCallback(async () => {
    let news = await api.news('getall');
    let timelines = await api.timeline('getall');
    let arts = await api.art('getall');
    let mobis = await api.mobis('getall');
    setAllNews(news);
    setAllTimelines(timelines);
    setAllArts(arts);
    setMobis(mobis);

    configureSliders();
  }, [setAllNews, setAllTimelines, setAllArts]);

  useInterval(() => {
    pool();
  }, 20000);

  useEffect(() => {
    // esconde a barra de loading
    hideProgress();
    pool();
    configureSliders();
    document.onscroll = handleScrollTopBtn;
    window.scrollTo(0, 0);
  }, [pool, configureSliders]);

  
  return (
    <>
      <BuyConfirmationModal 
        isShowing={buyConfirmationShow} 
        setIsShowing={setBuyConfirmationShow} 
      />
      <div className="w-100 pb-3">
        <div className="container">
          <div id="noticias-section" className="section">
            <div className="section__header justify-content-between">
              <div className='d-flex'>
                <img 
                  className="align-self-start"
                  src={`https://img.icons8.com/material-rounded/42/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/news.png`}
                  alt=""
                />
                <div className="ms-3">
                  <h4 className="section__title">
                    <span className="hxd-primary-text fw-bold">Notícias</span>
                    <span className="hxd-secondary-text"> recentes</span>
                  </h4>
                  <span className="hxd-secondary-text">Aqui você encontra notícias fresquinhas do mundo de pixels!</span>
                </div>
              </div>
              <div className="section__nav-tools">
                <button id="news-arrowPrev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </button>
                <button className="reload"></button>
                <button id="news-arrowNext">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="section__content">
              <div id="news-slider" className='glide' style={{pointerEvents: allNews?.length === 0 ? 'none' : 'auto'}}>
                <div className="glide__track" data-glide-el="track">
                  <div className="glide__slides pt-3" style={{height: '300px'}}>
                  {
                    !allNews ?
                    <>
                      <div className='news-card skeleton'></div>
                      <div className='news-card skeleton'></div>
                      <div className='news-card skeleton'></div>
                    </>
                    :
                    allNews?.length === 0 ?
                    <h5 className="w-100 text-center hxd-primary-text">Não há notícias para ler.</h5>
                    :
                    (() => {
                      let slides = [];
                      let y = 0;
                      let iterations = Math.round(allNews.length / 2);

                      for (let i = 0; i < iterations; i++){
                        let news1 = allNews[y++];
                        let news2 = allNews[y++];

                        let slide;

                        if (news2 === undefined) {
                          slide = [news1];
                        } else {
                          slide = [news1, news2];
                        }

                        slides.push((
                          <div className="glide__slide d-flex flex-column gap-2">
                            {slide.map((news) => (
                              <NewsCard refer={news} key={news.id} onClick={() => showProgress()} />
                            ))}
                          </div>
                        ));
                      }

                      return slides;
                    })()
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__header">
              <img 
                className="align-self-start"
                src={`https://img.icons8.com/ios-filled/42/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/star--v1.png`}
                alt=""
              />
              <div className='ms-3'>
                <h4 className="section__title">
                  <span className="hxd-primary-text fw-bold">Destaques</span> 
                  <span className="hxd-secondary-text"> da XD</span>
                </h4>
                <span className="hxd-secondary-text">Aqueles que mais contribuiram no site nesse mês.</span>
              </div>
            </div>
            <div className="section__content">
              {
                allSpotlights.length === 0 ?
                <>
                  <div className='spotlight-card skeleton'></div>
                  <div className='spotlight-card skeleton'></div>
                  <div className='spotlight-card skeleton'></div>
                </>
                :
                allSpotlights.map((spotlight, i) => (
                  <SpotlightCard refer={spotlight} key={i} />
                ))
              }
  
            </div>
          </div>
        </div>
      </div>
      <div className="hxd-bg-colorDark py-3">
        <div className="container">
          <div id="timeline-section" className="section">
            <div className="section__header">
              <img className="align-self-start" src={`https://img.icons8.com/material-rounded/42/ffffff/topic.png`} alt=""/>
              <div className="text-white ms-3">
                <span>
                  <h4 className="section__title">
                    <span>Timeline</span>
                  </h4>
                </span>
                <span>Venha interagir com a timeline da Habblet XD!</span>
              </div>
            </div>
            <div className="section__content">
              <div className="d-flex flex-row w-100">
                <div className='d-flex flex-column pe-2' style={{width: '70%'}}>
                  <div className='timeline-container'
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto',
                    gridTemplateRows: 'auto auto auto',
                    rowGap: '1rem',
                    overflowY: 'scroll',
                    height: '332px'
                  }}>
                    {
                      allTimelines.map((timeline, i) => (
                        <TimelineCard refer={timeline} key={timeline.id} onClick={() => showProgress()} />
                      ))
                    }
                  </div>
                  <div className='w-100 pe-2 mt-2' style={{flex: '1 0 0'}}>
                    <div className="w-100 rounded overflow-hidden">
                      <div className="d-flex align-items-center ps-3 h-25 hxd-bg-color">
                        <h4 className="text-white">Postar timeline</h4>
                      </div>
                      <form className="d-flex flex-column h-75 hxd-bg-color-gray" onSubmit={handleTimelinePost}
                      name="timeline_sender">
                        <div className="w-100 p-1" style={{flex: '1 0 0%'}}>
                          <div className="d-flex flex-column h-100 w-100 rounded overflow-hidden">
                            <div className="bg-secondary" style={{height: '30px'}}></div>
                            <div className="w-100 p-1 bg-white" style={{minHeight: '80px', flex: '1 0 0%'}} contentEditable
                            name="texto"></div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between p-2">
                          <div className="d-flex gap-1 h-100">
                            <span className="fw-bold">Nenhuma hashtag</span>
                            <button className="h-100 border-0 text-white fw-bold hxd-bg-color rounded" type="button">+</button>
                          </div>
                          <button 
                            className="h-100 border-0 text-white fw-bold hxd-bg-color px-4 rounded"
                            type="submit"
                          >Postar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-column gx-0 rounded overflow-hidden' style={{flex: '1 0 0'}}>
                  <div className="hxd-bg-color ps-3 py-1 text-white">
                    <h5 className="mb-0">TrendingTopics</h5>
                    <small>Veja as Hashtags mais usadas nas timelines</small>
                  </div>
                  <div className="hxd-bg-color-gray d-flex flex-column gap-2 p-2 h-100">
                    <div className="d-flex gap-2">
                      <button 
                        className="bg-white rounded hxd-border hxd-primary-text"
                        style={{ flex: '1 0 0' }}
                      >
                        Geral
                      </button>
                      <button 
                        className="hxd-bg-color rounded border-0 text-white"
                        style={{ flex: '1 0 0' }}
                      >
                        Mensal
                      </button>
                      <button 
                        className="hxd-bg-color rounded border-0 text-white"
                        style={{ flex: '1 0 0' }}
                      >
                        Semanal
                      </button>
                    </div>
                    <div className="p-2 rounded" style={{ height: '60px', boxShadow: '0 2px .5rem rgb(0, 0, 0, .2)' }}>
                      <h6 className="hxd-primary-text m-0">#HabbletXD</h6>
                      <small className="hxd-primary-text">1.000 usuarios usaram essa hashtag</small>
                    </div>
                    <div className="p-2 rounded" style={{ height: '60px', boxShadow: '0 2px .5rem rgb(0, 0, 0, .2)' }}>
                      <h6 className="hxd-primary-text m-0">#HabbletXD</h6>
                      <small className="hxd-primary-text">1.000 usuarios usaram essa hashtag</small>
                    </div>
                    <div className="p-2 rounded" style={{ height: '60px', boxShadow: '0 2px .5rem rgb(0, 0, 0, .2)' }}>
                      <h6 className="hxd-primary-text m-0">#HabbletXD</h6>
                      <small className="hxd-primary-text">1.000 usuarios usaram essa hashtag</small>
                    </div>
                    <div className="p-2 rounded" style={{ height: '60px', boxShadow: '0 2px .5rem rgb(0, 0, 0, .2)' }}>
                      <h6 className="hxd-primary-text m-0">#HabbletXD</h6>
                      <small className="hxd-primary-text">1.000 usuarios usaram essa hashtag</small>
                    </div>
                    <div className="p-2 rounded" style={{ height: '60px', boxShadow: '0 2px .5rem rgb(0, 0, 0, .2)' }}>
                      <h6 className="hxd-primary-text m-0">#HabbletXD</h6>
                      <small className="hxd-primary-text">1.000 usuarios usaram essa hashtag</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between w-100">
            <div className="section" style={{width: '49%'}}>
              <div className="section__header justify-content-between">
                <div className='d-flex'>
                  <img 
                    className="align-self-start"
                    src={`https://img.icons8.com/fluency-systems-filled/42/ffffff/taiwan-emblem.png`}
                    alt=""
                  />
                  <div className="ms-3">
                    <h5 className="text-white mb-0"><span className="fw-bold">Novos</span> emblemas</h5>
                    <span className="text-white">Veja todos os emblemas hospedados no Habblet Hotel.</span>
                  </div>
                </div>
                <div className="section__nav-tools">
                  <button id="ens-arrowLeft" className="slider__arrow slider__arrow--left arrow-left"></button>
                  <button id="ens-arrowRight" className="slider__arrow slider__arrow--right arrow-right"></button>
                </div>
              </div>
              <div className="section__content">
                <div id="emblemasNovos-slider" className="slider">
                  <div className="slider__track">
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="section" style={{width: '49%'}}>
              <div className="section__header justify-content-between">
                <div className="d-flex">
                  <img 
                    className="align-self-start"
                    src={`https://img.icons8.com/ios-filled/42/ffffff/handle-with-care.png`}
                    alt=""
                  />
                  <div className="ms-3">
                    <h5 className="text-white mb-0"><span className="fw-bold">Ganhe</span> gratis</h5>
                    <span className="text-white">Veja os emblemas que são disponíveis gratuitamente.</span>
                  </div>
                </div>
                
                <div className="section__nav-tools">
                  <button id="egs-arrowLeft" className="slider__arrow slider__arrow--left arrow-left"></button>
                  <button id="egs-arrowRight" className="slider__arrow slider__arrow--right arrow-right"></button>
                </div>
              </div>
              <div className="section__content">
                <div id="emblemasGratis-slider" className="glide">
                  <div className="glide__track" data-glide-el="track">
                    <div className="glide__slides" style={{height: '60px'}}>
                      {
                        badges.map((badge) => (
                          <div className="glide__slide slider__item justify-content-center align-items-center hxd-bg-color rounded" style={{cursor: 'pointer'}} onClick={() => console.log(badge)}>
                            <img src={badge.image} alt="" />
                          </div>
                        ))
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="loja-section" className="section">
            <div className="section__header justify-content-between">
              <div className="d-flex">
                <img 
                  className="align-self-start"
                  src={`https://img.icons8.com/material-rounded/42/ffffff/shop.png`}
                  alt=""
                />
                <div className="ms-3">
                  <h4 className="mb-0 text-white"><span className="fw-bold">Lojão</span> da XD</h4>
                  <span className="text-white">Venha gastar seus XD's comprando mobs, visuais, raros e entre outros!</span>
                </div>
              </div>
              <div className="section__nav-tools">
                <button id="ljxd-arrowPrev" className="arrow-left"></button>
                <button className="reload"></button>
                <button id="ljxd-arrowNext" className="arrow-right"></button>
              </div>
            </div>
            <div className="section__content">
              <ConfirmationModal 
                isShowing={confirmationForBuyShow} 
                text="Você tem certeza de que deseja realizar esta compra?"
                beingBought={beingBought}
                onAccept={() => {
                  setBuyConfirmationShow(true);
                  setConfirmationForBuyShow(false);
                }}
                onDeny={() => setConfirmationForBuyShow(false)} 
              />
              <div id="ljxd-slider" className="glide">
                <div className="glide__track" data-glide-el="track">
                  <div className='glide__slides'>
                    {
                      mobis.map((mobi) => (
                        <div className="glide__slide lojao-card">
                          <div className="info-wrapper">
                            <div className="hxd-bg-color rounded-top" style={{flex: '1 0 0'}}></div>
                            <div 
                              className='d-flex align-items-center justify-content-center bg-white rounded-bottom hxd-primary-text' 
                              style={{height: '40px'}}
                            >
                              <small>
                                <strong>{mobi.nome}</strong>
                              </small>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                              <span className="hxd-bg-color px-2 text-white rounded">{mobi.valor} XD's</span>
                              <button className='btn btn-success p-0 px-2' 
                              onClick={() => {
                                setBeingBought(mobi);
                                setConfirmationForBuyShow(true);
                              }}>Comprar</button>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__header justify-content-between">
              <div>
                <h4 className="mb-0 text-white"><span className="fw-bold">Lojão</span> de emblemas</h4>
                <span className="text-white">Venha gastar seus XD's comprando emblemas exclusivos para o seu perfil</span>
              </div>
              <div className="section__nav-tools">
                <button id="ljem-arrowPrev" className="arrow-left"></button>
                <button className="reload"></button>
                <button id="ljem-arrowNext" className="arrow-right"></button>
              </div>
            </div>
            <div className="section__content">
              <div id="ljem-slider" className="glide">
                <div className="glide__track" data-glide-el="track">
                  <div className="glide__slides">
                    <div className="glide__slide lojao-card--square">
                      <div className="info-wrapper">
                        <div className="hxd-bg-color rounded-top" style={{flex: '1 0 0'}}></div>
                        <div className='bg-white rounded-bottom' style={{height: '40px'}}></div>
                        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                          <span className="hxd-bg-color px-2 text-white rounded">100 XD's</span>
                          <button className='btn btn-success p-0 px-2'>Comprar</button>
                        </div>
                      </div>
                    </div>
                    <div className="glide__slide lojao-card--square">
                      <div className="info-wrapper">
                        <div className="hxd-bg-color rounded-top" style={{flex: '1 0 0'}}></div>
                        <div className='bg-white rounded-bottom' style={{height: '40px'}}></div>
                        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                          <span className="hxd-bg-color px-2 text-white rounded">100 XD's</span>
                          <button className='btn btn-success p-0 px-2'>Comprar</button>
                        </div>
                      </div>
                    </div>
                    <div className="glide__slide lojao-card--square">
                      <div className="info-wrapper">
                        <div className="hxd-bg-color rounded-top" style={{flex: '1 0 0'}}></div>
                        <div className='bg-white rounded-bottom' style={{height: '40px'}}></div>
                        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                          <span className="hxd-bg-color px-2 text-white rounded">100 XD's</span>
                          <button className='btn btn-success p-0 px-2'>Comprar</button>
                        </div>
                      </div>
                    </div>
                    <div className="glide__slide lojao-card--square">
                      <div className="info-wrapper">
                        <div className="hxd-bg-color rounded-top" style={{flex: '1 0 0'}}></div>
                        <div className='bg-white rounded-bottom' style={{height: '40px'}}></div>
                        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                          <span className="hxd-bg-color px-2 text-white rounded">100 XD's</span>
                          <button className='btn btn-success p-0 px-2'>Comprar</button>
                        </div>
                      </div>
                    </div>
                    <div className="glide__slide lojao-card--square">
                      <div className="info-wrapper">
                        <div className="hxd-bg-color rounded-top" style={{flex: '1 0 0'}}></div>
                        <div className='bg-white rounded-bottom' style={{height: '40px'}}></div>
                        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                          <span className="hxd-bg-color px-2 text-white rounded">100 XD's</span>
                          <button className='btn btn-success p-0 px-2'>Comprar</button>
                        </div>
                      </div>
                    </div>
                    <div className="glide__slide lojao-card--square">
                      <div className="info-wrapper">
                        <div className="hxd-bg-color rounded-top" style={{flex: '1 0 0'}}></div>
                        <div className='bg-white rounded-bottom' style={{height: '40px'}}></div>
                        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                          <span className="hxd-bg-color px-2 text-white rounded">100 XD's</span>
                          <button className='btn btn-success p-0 px-2'>Comprar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div id="artes-section" className="section">
            <div className="section__header justify-content-between">
              <div className="d-flex text-white">
                <img className="align-self-start" src="https://img.icons8.com/ios-glyphs/42/ffffff/paint-palette--v1.png" alt="" />
                <div className='ms-3'>
                  <h4 className="mb-0">
                    <span className="fw-bold">Artes</span> recentes
                  </h4>
                  <span>Confira as artes mais recentes do nosso site!</span>
                </div>
              </div>
              <div className="section__nav-tools">
                <button className="arrow-left"></button>
                <button className="reload"></button>
                <button className="arrow-right"></button>
              </div>
            </div>
            <div className="section__content justify-content-center gap-4">
              {
                allArts.map((art) => (
                  <ArtCard refer={art} onClick={() => showProgress()} />
                ))
              }

            </div>
          </div>
        </div>
      </div>
      <div className="w-100">
        <div className="container">
          <div className="section">
            <div className="section__header">
              <img 
                className="align-self-start"
                src={`https://img.icons8.com/fluency-systems-filled/42/${rgbToHex(document.querySelector(':root').style.getPropertyValue('--hxd-theme-colorDark'))}/trophy.png`}
                alt=""
              />
              <div className="ms-3">
                <h4><span className="hxd-primary-text fw-bold mb-0">Tops</span> <span className="hxd-secondary-text">da XD</span></h4>
                <span className="hxd-secondary-text">Veja todos os usuários que mais interagem no site.</span>
              </div>
            </div>
            <div className="section__content">
              <div className="d-flex flex-row justify-content-evenly w-100">
                <div className="ranking-card d-flex flex-column">
                  <div className="d-flex align-items-center hxd-bg-colorDark w-100 px-4" style={{height: '50px'}}>
                    <h5 className="text-white fw-bold">Comentários</h5>
                  </div>
                  <div className="d-flex flex-column w-100 p-1 gap-1" style={{flex: '1 0 0%'}}>
                    <div className="rankUser-card rankUser-card--gold">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Comentários</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--platinum">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Comentários</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--silver">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Comentários</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--bronze">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Comentários</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ranking-card">
                  <div className="d-flex align-items-center hxd-bg-colorDark w-100 px-4" style={{height: '50px'}}>
                    <h5 className="text-white fw-bold">Curtidas</h5>
                  </div>
                  <div className="d-flex flex-column w-100 p-1 gap-1" style={{flex: '1 0 0%'}}>
                    <div className="rankUser-card rankUser-card--gold">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Curtidas</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--platinum">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Curtidas</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--silver">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Curtidas</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--bronze">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Curtidas</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ranking-card">
                  <div className="d-flex align-items-center hxd-bg-colorDark w-100 px-4" style={{height: '50px'}}>
                    <h5 className="text-white fw-bold">Presença Marcada</h5>
                  </div>
                  <div className="d-flex flex-column w-100 p-1 gap-1" style={{flex: '1 0 0%'}}>
                    <div className="rankUser-card rankUser-card--gold">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Presença Marcada</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--platinum">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Presença Marcada</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--silver">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Presença Marcada</small>
                      </div>
                    </div>
                    <div className="rankUser-card rankUser-card--bronze">
                      <div className="d-inline-block" style={{height: '100%', width: '46px'}}></div>
                      <div>
                        <h5 className="hxd-primary-text fw-bold mb-0">Geefi</h5>
                        <small className="hxd-secondary-text fw-bold">100 Presença Marcada</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button id="toTop-btn" ref={btnScrollTopRef} onClick={() => window.scrollTo(0, 0)}>Topo</button>
    </>
  );
};

export default Home;