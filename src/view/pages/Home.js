import { useEffect, useRef, useState, useCallback } from 'react';
import useInterval from '../../hooks/useInterval';

import api from '../../static/js/api';

import '../../static/css/home.css';
import '../../static/css/cards.css';
import '@glidejs/glide/dist/css/glide.core.css';

import { NewsCard, ArtCard, TimelineCard, SpotlightCard } from '../components/Cards';
import Glide from '@glidejs/glide';

const Home = (props) => {
  const { showProgress, hideProgress, sendAlert } = props;
  
  const [badges, setBadges] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [allSpotlights, setAllSpotlights] = useState([]);
  const [allTimelines, setAllTimelines] = useState([]);
  const [allArts, setAllArts] = useState([]);
  
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

  /**
   * O Glide.js não permite, por padrão, que as arrows de navegação dos sliders estejam fora
   * do elemento Glide. Esta função serve para configurar arrows externas.
   * 
   * @argument glideElement slider para qual as arrows estão sendo configuradas
   * @argument prevSelector seletor da arrow para a esquerda
   * @argument nextSelector seletor da arrow para a direita
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
      perView: 6,
      gap: 16
    });

    let lojaoEmblemas = new Glide('#ljem-slider', {
      type: 'slider',
      perView: 6,
      gap: 16
    });

    let emblemasGratis = new Glide('#emblemasGratis-slider', {

    });

    slidersArrowsSetListener(lojaoXD, '#ljxd-arrowPrev', '#ljxd-arrowNext');
    slidersArrowsSetListener(lojaoEmblemas, '#ljem-arrowPrev', '#ljem-arrowNext');
    slidersArrowsSetListener(newsSlider, '#news-arrowPrev', '#news-arrowNext');

    lojaoXD.mount();
    lojaoEmblemas.mount();
    newsSlider.mount();
  }, []);

  /**
   * Função que controla o envio de novas timelines ao servidor
   */
  const timelinePost = async () => {
    let texto = timelineWriterRef.current.textContent;

    showProgress();

    let data = {
      texto
    };

    let res = await api.timeline('save', null, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include'
    });
    hideProgress();
    if (res.sucess)
      sendAlert('success', res.success);
    else if (res.error)
      sendAlert('danger', res.error);
  };

  const pool = useCallback(async () => {
    let news = await api.news('getall');
    let timelines = await api.timeline('getall');
    let arts = await api.art('getall');
    setAllNews(news);
    setAllTimelines(timelines);
    setAllArts(arts);
  }, [setAllNews]);

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
      <div className="w-100 pb-3">
        <div className="container">
          <div id="noticias-section" className="section">
            <div className="section__header justify-content-between">
              <div>
                <h4 className="section__title">
                  <span className="hxd-primary-text fw-bold">Notícias</span>
                  <span className="hxd-secondary-text"> recentes</span>
                </h4>
                <span className="hxd-secondary-text">Aqui você encontra notícias fresquinhas do mundo de pixels!</span>
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
              <div id="news-slider" className='glide'>
                <div className="glide__track" data-glide-el="track">
                  <div className="glide__slides pt-3" style={{height: '300px'}}>
                  {
                    allNews.length === 0 ?
                    <>
                      <div className='news-card skeleton'></div>
                      <div className='news-card skeleton'></div>
                      <div className='news-card skeleton'></div>
                    </>
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
              <div>
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
              <div>
                <span className="text-white"><h4 className="section__title">Timeline</h4></span>
                <span className="text-white">Venha interagir com a timeline da Habblet XD!</span>
              </div>
            </div>
            <div className="section__content">
              <div className="d-flex flex-row w-100">
                <div className='d-flex flex-column px-2' style={{width: '70%'}}>
                  <div className='d-flex flex-row flex-wrap align-items-start justify-content-center gap-3 w-100'>
                    {
                      allTimelines.map((timeline, i) => (
                        <TimelineCard refer={timeline} key={i} />
                      ))
                    }
                  </div>
                  <div className='w-100 px-2 mt-2' style={{flex: '1 0 0'}}>
                    <div className="w-100 rounded overflow-hidden">
                      <div className="d-flex align-items-center ps-3 h-25 hxd-bg-color">
                        <h4 className="text-white">Postar timeline</h4>
                      </div>
                      <div className="d-flex flex-column h-75 hxd-bg-color-gray">
                        <div className="w-100 p-1" style={{flex: '1 0 0%'}}>
                          <div className="d-flex flex-column h-100 w-100 rounded overflow-hidden">
                            <div className="bg-secondary" style={{height: '30px'}}></div>
                            <div className="w-100 p-1 bg-white" style={{flex: '1 0 0%'}} contentEditable
                            ref={timelineWriterRef}></div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between p-2">
                          <div className="d-flex gap-1 h-100">
                            <span className="fw-bold">Nenhuma hashtag</span>
                            <button className="h-100 border-0 text-white fw-bold hxd-bg-color rounded">+</button>
                          </div>
                          <button className="h-100 border-0 text-white fw-bold hxd-bg-color px-4 rounded"
                          onClick={() => {
                            timelinePost();
                          }}>Postar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-column gx-0 rounded overflow-hidden' style={{flex: '1 0 0'}}>
                  <div className="hxd-bg-color ps-3 py-1 text-white">
                    <h5 className="mb-0">TrendingTopics</h5>
                    <small>Veja as Hashtags mais usadas nas timelines</small>
                  </div>
                  <div className="hxd-bg-color-gray h-100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between w-100">
            <div className="section" style={{width: '49%'}}>
              <div className="section__header justify-content-between">
                <div>
                  <h5 className="text-white mb-0"><span className="fw-bold">Novos</span> emblemas</h5>
                  <span className="text-white">Veja todos os emblemas hospedados no Habblet Hotel.</span>
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
                <div>
                  <h5 className="text-white mb-0"><span className="fw-bold">Ganhe</span> gratis</h5>
                  <span className="text-white">Veja os emblemas que são disponíveis gratuitamente.</span>
                </div>
                <div className="section__nav-tools">
                  <button id="egs-arrowLeft" className="slider__arrow slider__arrow--left arrow-left"></button>
                  <button id="egs-arrowRight" className="slider__arrow slider__arrow--right arrow-right"></button>
                </div>
              </div>
              <div className="section__content">
                <div id="emblemasGratis-slider" className="slider">
                  <div className="slider__track">
                    {
                      badges.map((badge) => (
                        <div className="slider__item justify-content-center align-items-center" onClick={() => console.log(badge)}>
                          <img src={badge.image} alt="" />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="loja-section" className="section">
            <div className="section__header justify-content-between">
              <div>
                <h4 className="mb-0 text-white"><span className="fw-bold">Lojão</span> da XD</h4>
                <span className="text-white">Venha gastar seus XD's comprando mobs, visuais, raros e entre outros!</span>
              </div>
              <div className="section__nav-tools">
                <button id="ljxd-arrowPrev" className="arrow-left"></button>
                <button className="reload"></button>
                <button id="ljxd-arrowNext" className="arrow-right"></button>
              </div>
            </div>
            <div className="section__content">
              <div id="ljxd-slider" className="glide">
                <div className="glide__track" data-glide-el="track">
                  <div className='glide__slides'>
                    <div className="glide__slide lojao-card"></div>
                    <div className="glide__slide lojao-card"></div>
                    <div className="glide__slide lojao-card"></div>
                    <div className="glide__slide lojao-card"></div>
                    <div className="glide__slide lojao-card"></div>
                    <div className="glide__slide lojao-card"></div>
                    <div className="glide__slide lojao-card"></div>
                    <div className="glide__slide lojao-card"></div>
                    <div className="glide__slide lojao-card"></div>
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
                    <div className="glide__slide lojao-card--square"></div>
                    <div className="glide__slide lojao-card--square"></div>
                    <div className="glide__slide lojao-card--square"></div>
                    <div className="glide__slide lojao-card--square"></div>
                    <div className="glide__slide lojao-card--square"></div>
                    <div className="glide__slide lojao-card--square"></div>
                    <div className="glide__slide lojao-card--square"></div>
                    <div className="glide__slide lojao-card--square"></div>
                    <div className="glide__slide lojao-card--square"></div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div id="artes-section" className="section">
            <div className="section__header justify-content-between">
              <div className="text-white">
                <h4 className="mb-0"><span className="fw-bold">Artes</span> recentes</h4>
                <span>Confira as artes mais recentes do nosso site!</span>
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
              <div>
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