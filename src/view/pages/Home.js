import { useEffect, useRef, useState, useCallback } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import useInterval from '../../hooks/useInterval';

import BuyConfirmationModal from '../components/BuyConfirmationModal';
import ConfirmationModal from '../components/ConfirmationModal';

import api from '../../static/js/api';
import Slider from '../../static/js/slider';

import newBadges from '../../static/json/badges.json';

import '../../static/css/home.css';
import '../../static/css/cards.css';
import '@glidejs/glide/dist/css/glide.core.css';

import { NewsCard, ArtCard, TimelineCard, SpotlightCard } from '../components/Cards';
import Glide from '@glidejs/glide';
import { useNavigate } from 'react-router-dom';

newBadges.reverse();

const Home = (props) => {
  const navigate = useNavigate();
  
  const { user, setUser, showProgress, hideProgress, sendAlert, getCurrentTheme, currentTheme } = props;

  // preload data
  const { badges, loja, allNews, allTimelines, allArts, allSpotlights, values, setAllTimelines, ranking, trendingTopics, setAllNews } = props;

  const rankCardTypes = ['gold', 'platinum', 'silver', 'bronze'];

  const [buyConfirmationShow, setBuyConfirmationShow] = useState(false);
  const [confirmationForBuyShow, setConfirmationForBuyShow] = useState(false);
  const [hashtagInputShow, setHashtagInputShow] = useState(false);
  const [beingBought, setBeingBought] = useState({});
  const [timelineHashtags, setTimelineHashtags] = useState([]);
  const [scrollToTop, setScrollToTop] = useState(true);

  const btnScrollTopRef = useRef(null);
  const hashtagInputRef = useRef(null);
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
      perView: 1,
      rewind: false,
      bound: true,
      gap: 8
    });

    /*let newsSlider = Slider({
      slider: '#news-slider',
      perView: 1,
      apiRoute: 'news',
      paginationOffset: '6',
      arrowPrev: '#news-arrowPrev',
      arrowNext: '#news-arrowNext',
      paginationCallback:
    });*/

    let lojaoXD = new Glide('#ljxd-slider', {
      type: 'slider',
      perView: 5,
      rewind: false,
      bound: true,
      gap: 16,
      peek: {
        before: 0,
        after: 64
      }
    });

    let lojaoEmblemas = new Glide('#ljem-slider', {
      type: 'slider',
      perView: 5,
      rewind: false,
      bound: true,
      gap: 16,
      peek: {
        before: 0,
        after: 64
      }
    });

    let emblemasGratis = new Glide('#emblemasGratis-slider', {
      type: 'slider',
      perView: 15,
      rewind: false,
      bound: true,
      gap: 8,
    });

    /*let emblemasNovos = new Glide('#emblemasNovos-slider', {
      type: 'slider',
      perView: 8,
      rewind: false,
      bound: true,
      gap: 8,
    });*/

    let artSlider = new Glide('#artSlider', {
      type: 'slider',
      perView: 1,
      rewind: false,
      bound: true,
      gap: 8,
    })

    slidersArrowsSetListener(lojaoXD, '#ljxd-arrowPrev', '#ljxd-arrowNext');
    slidersArrowsSetListener(lojaoEmblemas, '#ljem-arrowPrev', '#ljem-arrowNext');
    slidersArrowsSetListener(newsSlider, '#news-arrowPrev', '#news-arrowNext');
    slidersArrowsSetListener(emblemasGratis, '#egs-arrowLeft', '#egs-arrowRight');
    //slidersArrowsSetListener(emblemasNovos, '#ens-arrowLeft', '#ens-arrowRight');
    slidersArrowsSetListener(artSlider, '#artslider-arrowLeft', '#artslider-arrowRight');

    lojaoXD.mount();
    lojaoEmblemas.mount();
    newsSlider.mount();
    emblemasGratis.mount();
    //emblemasNovos.mount();
    artSlider.mount();
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
      texto: writer.textContent,
      hashtags: timelineHashtags.join(';')
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
      sendAlert('success', res.success, {
        onunload: !res.award ? null : () => {
          sendAlert('success', res.award);
          let xdcoins = res.coins;
          setUser({ ...user, xdcoins: parseInt(user.xdcoins) + xdcoins });
        }
      });
      writer.textContent = '';
      setTimelineHashtags([]);
      
      const url = res.url;
      const timeline = await api.timeline('get', { key: url });

      setAllTimelines(oldTimelines => {
        let timelines = oldTimelines;
        timelines.unshift(timeline.object);
        return timelines;
      });

      navigate(`/timeline/${url}`);
    } else if (res.error)
      sendAlert('danger', res.error);
  };

  useEffect(() => {
    // esconde a barra de loading
    hideProgress();
    configureSliders();
    document.onscroll = handleScrollTopBtn;
    if (scrollToTop) {
      window.scrollTo(0, 0);
      setScrollToTop(false);
    }
  }, []);
  
  return (
    <>
      <BuyConfirmationModal 
        user={user}
        setUser={setUser}
        isShowing={buyConfirmationShow} 
        setIsShowing={setBuyConfirmationShow} 
        showProgress={showProgress}
        hideProgress={hideProgress}
        sendAlert={sendAlert}
        beingBought={beingBought}
      />
      <div className="w-100 pb-3">
        <div className="container">
          <div id="noticias-section" className="section">
            <div className="section__header justify-content-between">
              <div className='d-flex'>
                <img 
                  className="align-self-start"
                  src={`https://img.icons8.com/material-rounded/42/${getCurrentTheme('theme-colorDark-hex')}/news.png`}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </button>
                <button className="reload"></button>
                <button id="news-arrowNext">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="section__content">
              <div id="news-slider" className='glide' style={{pointerEvents: allNews?.length === 0 ? 'none' : 'auto'}}>
                <div className="glide__track" data-glide-el="track">
                  <div 
                    className="glide__slides pt-3" 
                    style={{
                      height: '300px'
                    }}
                  >
                  {
                    !allNews ?
                    <div className="glide__slide gap-2"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, auto)',
                        gridTemplateRows: 'auto auto',
                      }}
                    >
                      <div className='news-card skeleton'></div>
                      <div className='news-card skeleton'></div>
                      <div className='news-card skeleton'></div>
                    </div>
                    :
                    allNews?.length === 0 ?
                    <h5 className="w-100 text-center hxd-primary-text">Não há notícias para ler.</h5>
                    :
                    (() => {
                      let slides = [];

                      for (let i = 0; i < allNews?.length; i+=6) {

                        let slide;
                        slide = allNews.slice(i, i+ 6);
                        slides.push((
                          <div 
                            className="glide__slide gap-2"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, auto)',
                              gridTemplateRows: 'auto auto',
                            }}
                          >
                            {slide.map((news) => (
                              <NewsCard refer={news} key={news.id} 
                              onClick={() => {
                                let newAllNews = allNews.map((n) => 
                                  n.id === news.id ?
                                  { ...n, lido: 1 } : n
                                );
                                setAllNews(newAllNews);
                                showProgress();
                              }} />
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
                src={`https://img.icons8.com/ios-filled/42/${getCurrentTheme('theme-colorDark-hex')}/star--v1.png`}
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
                allSpotlights.map((spotlight) => (
                  <SpotlightCard refer={spotlight} key={spotlight?.id} />
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
                      allTimelines.length === 0 ?
                      new Array(9).fill(<div className='timeline-card skeleton'></div>)
                      :
                      allTimelines.map((timeline) => (
                        <TimelineCard refer={timeline} key={timeline.id} onClick={() => showProgress()} />
                      ))
                    }
                  </div>
                  <div className='w-100 pe-2 mt-2' style={{flex: '1 0 0'}}>
                    <div className="w-100 rounded overflow-hidden">
                      <div className="d-flex align-items-center ps-3 py-2 h-25 hxd-bg-color">
                        <h5 className="text-white">Postar timeline</h5>
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
                          <div className="d-flex gap-1 h-100" style={{ maxWidth: '75%' }}>
                            <div className="w-100">
                              {
                                timelineHashtags.length === 0 ?
                                <strong className="hxd-primary-text">Nenhuma hashtag</strong>
                                :
                                timelineHashtags.map((hash, i) => (
                                  <button 
                                    key={i}
                                    type="button"
                                    className="bg-transparent border-0 hxd-primary-text"
                                    onClick={evt => {
                                      let hashtags = [...timelineHashtags.slice(0, i), ...timelineHashtags.slice(i+1)];
                                      setTimelineHashtags(hashtags);
                                    }}
                                  >
                                    <h6>#{hash}</h6>
                                  </button>
                                ))
                              }
                              {
                                timelineHashtags.length !== 0 ?
                                <small className="d-block hxd-primary-text">
                                  Dica: clique em alguma hashtag para remove-la
                                </small>
                                :
                                <></>
                              }
                              
                            </div>
                            <button 
                              className="h-100 border-0 text-white fw-bold hxd-bg-color rounded" 
                              type="button"
                              onClick={() => {
                                setHashtagInputShow(true); 
                                hashtagInputRef.current.focus();
                              }}
                            >
                              +
                            </button>
                          </div>
                          <button 
                            className="h-100 border-0 text-white fw-bold hxd-bg-color px-4 rounded"
                            type="submit"
                          >
                            Postar
                          </button>
                        </div>
                        <div className={`p-1 ${!hashtagInputShow ? 'd-none' : 'd-flex'}`}>
                          <div className="hashtag-input-wrapper w-50 bg-white rounded-start border border-secondary px-2">
                            <input 
                              type="text" 
                              className="bg-transparent border-0 ms-1" placeholder="Adicione uma hashtag" 
                              style={{
                                flex: 1
                              }} 
                              ref={hashtagInputRef}
                            />
                            
                          </div>
                          <button
                            className="hxd-bg-color text-white border-0 rounded-end"
                            type="button"
                            onClick={() => {
                              
                              if (hashtagInputRef.current.value === '') 
                                return setHashtagInputShow(false);

                              if (hashtagInputRef.current.value.search(' ') !== -1)
                                return sendAlert('warning', 'Uma hashtag não pode conter espaços.');
                              
                              if (timelineHashtags.includes(hashtagInputRef.current.value))
                                return sendAlert('warning', 'Você não pode adicionar hashtags repetidas.');

                              if (timelineHashtags.length >= 3) 
                                return sendAlert('warning', 'Uma timeline só pode conter 3 hashtags no máximo.');
                              
                              setHashtagInputShow(false)
                              setTimelineHashtags([...timelineHashtags, hashtagInputRef.current.value]);
                              hashtagInputRef.current.value = '';
                            }}
                          >
                            Concluir
                          </button>
                          
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
                    {
                      trendingTopics.map((trend) => (
                        <div className="p-2 rounded" style={{ height: '60px', boxShadow: '0 2px .5rem rgb(0, 0, 0, .2)' }} key={trend?.id}>
                          <h6 className="hxd-primary-text m-0">#{trend.tag}</h6>
                          <small className="hxd-primary-text">Essa hashtag foi usada {trend.count} vezes.</small>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between w-100">
            {/*
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
                <div id="emblemasNovos-slider" className="glide">
                  <div className="glide__track" data-glide-el="track">
                    <div className="glide__slides" style={{ height: '60px' }}>
                      {
                        newBadges.map((badge) => (
                          <div 
                            className="glide__slide slider__item justify-content-center align-items-center hxd-bg-color rounded p-1" style={{cursor: 'pointer'}} 
                            onClick={() => console.log(badge)}
                            title={badge.name}
                          >
                            <img 
                              className="h-100 w-100" 
                              style={{ objectFit: 'contain' }} 
                              src={`https://images.habblet.city/c_images/album1584/${badge.code}.gif`} 
                              alt="" 
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            */}
            <div className="section" style={{/*width: '49%'*/}}>
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
                        badges.free?.map((badge) => (
                          <a 
                            className="glide__slide slider__item justify-content-center align-items-center hxd-bg-color rounded" 
                            style={{cursor: 'pointer'}} 
                            href={badge?.tutorial}
                          >
                            <img src={badge?.imagem} alt="" />
                          </a>
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
                  <span className="text-white">Venha gastar seus XD's comprando mobis, visuais, raros e entre outros!</span>
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
                user={user}
                isShowing={confirmationForBuyShow} 
                setIsShowing={setConfirmationForBuyShow}
                text="Você tem certeza de que deseja realizar esta compra?"
                beingBought={beingBought}
                userCoins={user?.xdcoins}
                onAccept={async () => {
                  if (beingBought.tipo === 'emblema') {
                    const init = {
                      method: 'POST',
                      body: JSON.stringify({
                        item: beingBought
                      }),
                      credentials: 'include'
                    };

                    showProgress();
                    const res = await api.buyable('buy', {}, init);
                    hideProgress();

                    if (res.success) {
                      sendAlert('success', res.success);
                      setConfirmationForBuyShow(false);
                      let xdcoins = parseInt(user.xdcoins) - beingBought.valor;
                      setUser({ ...user, xdcoins});
                    } else {
                      sendAlert('danger', res.error);
                    }
                  } else {
                    setBuyConfirmationShow(true);
                  }
                  setConfirmationForBuyShow(false);
                }}
                onDeny={() => setConfirmationForBuyShow(false)} 
              />
              <div id="ljxd-slider" className="glide">
                <div className="glide__track" data-glide-el="track">
                  <div className='glide__slides'>
                    {
                      loja.filter(item => item.tipo !== 'emblema').map((item) => (
                        <div className="glide__slide lojao-card">
                          <div className="info-wrapper">
                            <div 
                              className="hxd-bg-color rounded-top d-flex justify-content-center align-items-center px-2" 
                              style={{height: '200px'}}
                            >
                              <img 
                                className="w-100 h-100"
                                src={item?.imagem} 
                                alt="" 
                                style={{
                                  objectFit: 'contain'
                                }}
                              />
                            </div>
                            <div 
                              className='d-flex align-items-center justify-content-center bg-white rounded-bottom hxd-primary-text' 
                              style={{height: '40px'}}
                            >
                              <small className="text-center">
                                <strong className="hxd-primary-color">
                                  {item.tipo.toUpperCase()}
                                  &nbsp;
                                  {item.nome}
                                </strong>
                              </small>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                              <span className="hxd-bg-color px-2 text-white rounded">{item.valor} XD's</span>
                              <button className='btn btn-success p-0 px-2' 
                              onClick={() => {
                                setBeingBought(item);
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
              <div className="d-flex ">
                <img 
                src="https://cdn.discordapp.com/attachments/933862913532391454/937166167129325618/icon_shop2.png"
                alt=""
                />
                <div className='ms-3'>
                  <h4 className="mb-0 text-white"><span className="fw-bold">Lojão</span> de emblemas</h4>
                  <span className="text-white">Venha gastar seus XD's comprando emblemas exclusivos para o seu perfil</span>
                </div>
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
                    {
                      loja.filter(item => item.tipo === 'emblema').map((badge) => (
                        <div className="glide__slide lojao-card--square" key={badge?.id}>
                          <div className="info-wrapper">
                            <div 
                              className="d-flex justify-content-center align-items-center hxd-bg-color rounded-top"
                              style={{height: '70px'}}
                            >
                              <img src={badge.imagem} alt="" />
                            </div>
                            <div className='d-flex justify-content-center align-items-center bg-white rounded-bottom' style={{height: '40px'}}>
                              <small className='text-center' style={{ lineHeight: 1.1 }}>
                                <strong className="hxd-primary-text">{badge.nome}</strong>
                              </small>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                              <span className="hxd-bg-color px-2 text-white rounded">{badge.valor} XD's</span>
                              <button className='btn btn-success p-0 px-2'
                              onClick={() => {
                                setBeingBought(badge);
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
                <button id="artslider-arrowLeft" className="arrow-left"></button>
                <button className="reload"></button>
                <button id="artslider-arrowRight" className="arrow-right"></button>
              </div>
            </div>
            <div className="section__content justify-content-center gap-4">
              <div id="artSlider" className='glide'>
                <div className="glide__track" data-glide-el="track">
                  <div className="glide__slides">
                  {
                    allArts.length === 0 ?
                    <>
                      <div className='art-card skeleton'></div>
                      <div className='art-card skeleton'></div>
                      <div className='art-card skeleton'></div>
                    </>
                    :
                    (() => {
                      let slides = [];
                      for (let i = 0; i < allArts.length; i+=6){
                        
                        let slide = allArts.slice(i, i+6);

                        slides.push((
                          <div 
                            className="glide__slide gap-2"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, auto)',
                              gridTemplateRows: 'auto auto',
                            }}
                          >
                            {slide.map((art) => (
                              <ArtCard refer={art} key={art.id} onClick={() => showProgress()} />
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
        </div>
      </div>
      <div className="w-100">
        <div className="container">
          <div className="section">
            <div className="section__header">
              <img 
                className="align-self-start"
                src={`https://img.icons8.com/fluency-systems-filled/42/${getCurrentTheme('theme-colorDark-hex')}/trophy.png`}
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
                    {
                      ranking?.comentarios?.map((rank, i) => (
                        <div className={`rankUser-card rankUser-card--${rankCardTypes[i]}`}>
                          <div className="d-inline-block overflow-hidden me-3" style={{height: '100%', width: '46px'}}>
                            <img 
                              src={`https://avatar.blet.in/${rank?.usuario}&action=std&size=b&head_direction=3&direction=2&gesture=sml&headonly=0`}
                              style={{
                                objectPosition: '-10px -25px'
                              }}
                            />
                          </div>
                          <div>
                            <h5 className="hxd-primary-text fw-bold mb-0">{rank?.usuario}</h5>
                            <small className="hxd-secondary-text fw-bold">{rank?.comentarios} Comentários</small>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="ranking-card">
                  <div className="d-flex align-items-center hxd-bg-colorDark w-100 px-4" style={{height: '50px'}}>
                    <h5 className="text-white fw-bold">Curtidas</h5>
                  </div>
                  <div className="d-flex flex-column w-100 p-1 gap-1" style={{flex: '1 0 0%'}}>
                    {
                      ranking?.likes?.map((rank, i) => (
                        <div className={`rankUser-card rankUser-card--${rankCardTypes[i]}`}>
                          <div className="d-inline-block overflow-hidden me-3" style={{height: '100%', width: '46px'}}>
                            <img 
                              src={`https://avatar.blet.in/${rank?.usuario}&action=std&size=b&head_direction=3&direction=2&gesture=sml&headonly=0`}
                              style={{
                                objectPosition: '-10px -25px'
                              }}
                            />
                          </div>
                          <div>
                            <h5 className="hxd-primary-text fw-bold mb-0">{rank?.usuario}</h5>
                            <small className="hxd-secondary-text fw-bold">{rank?.likes} Curtidas</small>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="ranking-card">
                  <div className="d-flex align-items-center hxd-bg-colorDark w-100 px-4" style={{height: '50px'}}>
                    <h5 className="text-white fw-bold">Presença Marcada</h5>
                  </div>
                  <div className="d-flex flex-column w-100 p-1 gap-1" style={{flex: '1 0 0%'}}>
                    {
                      ranking?.presencas?.map((rank, i) => (
                        <div className={`rankUser-card rankUser-card--${rankCardTypes[i]}`} key={rank?.id}>
                          <div className="d-inline-block overflow-hidden me-3" style={{height: '100%', width: '46px'}}>
                            <img 
                              src={`https://avatar.blet.in/${rank?.usuario}&action=std&size=b&head_direction=3&direction=2&gesture=sml&headonly=0`}
                              style={{
                                objectPosition: '-10px -25px'
                              }}
                            />
                          </div>
                          <div>
                            <h5 className="hxd-primary-text fw-bold mb-0">{rank?.usuario}</h5>
                            <small className="hxd-secondary-text fw-bold">{rank?.presencas} Presencas marcadas</small>
                          </div>
                        </div>
                      ))
                    }
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