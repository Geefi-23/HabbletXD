
import api from "./api";

/**
 * @author Geefi
 * @description Basicamente, um slider dinâmico. Precisa ser melhor elaborado, se tornou uma grande gambiarra
 */

/**
 * 
 * Um slider deve conter os seguintes elementos:
 * .slider = wrapper para os elementos do slider
 *   .slider__arrow = especifica o elemento como uma seta do slider
 *   .slider__arrow--left || .slider__arrow--right = deve ser usado junto com o .slider__arrow. Estiliza a seta do elemento.
 *   .slider__track = onde ficam os itens do slider
 *     .slider__item = itens do slider
 */
const Slider = (config) => {
  // DOM variables
  let slider = null;
  let track = null;
  let slidesWrapper = null;
  let arrowNext = null;
  let arrowPrev = null;

  let sliderChildWidth = null;
  let order = null;
  let filter = null;
  //let slideClasses = null;

  let MARGIN_OFFSET = null;
  let resultOffset = null;

  let paginationCallback = null;

  /**
   * @description indice atual do slider baseado em 0
   */
  let index = 0;

  /**
   * @description para paginação. indica o indice atual da paginação
   */
  let paginationIndex = 0;

  /**
   * @description indica a largura/o numero de slides
   */
  let length = 0;

  /**
   * @description modulo de api que será chamada para realizar a paginação dos proximos slides
   */
  let apiRoute = null;
  
  const requestPagination = async () => {
    const pag = await api[apiRoute]('pagination', { offset: (index ) * resultOffset, limit: resultOffset, order, filter });

    const slide = document.createElement('div');
    slide.style.width = sliderChildWidth + 'px';

    paginationCallback(pag, slide, slidesWrapper);
  };

  const goNext = () => {
    if (index === (length - 1)) {
      index += 1;
      requestPagination().then(() => {
        let currentMargin = parseInt(getComputedStyle(slidesWrapper).marginLeft);
        slidesWrapper.style.marginLeft = (currentMargin - sliderChildWidth) + 'px';
        
        length += 1;
      });
    } else {
      let currentMargin = parseInt(getComputedStyle(slidesWrapper).marginLeft);
      slidesWrapper.style.marginLeft = (currentMargin - sliderChildWidth) + 'px';
      index += 1;
    }
  };

  const goPrev = () => {
    if (index !== 0) {
      let currentMargin = parseInt(getComputedStyle(slidesWrapper).marginLeft);
      slidesWrapper.style.marginLeft = (currentMargin + sliderChildWidth) + 'px';
      index -= 1;
    }
  };

  const configure = (config) => {
    /**
     * @description DOM components
     */
    slider = document.querySelector(config.slider);
    track = slider.querySelector('.slider__track');
    slidesWrapper = slider.querySelector('.slider__slides');
    arrowNext = document.querySelector(config.arrowNext);
    arrowPrev = document.querySelector(config.arrowPrev);

    
    /**
     * @description slider configs
     */
    const perView = config.perView;
    apiRoute = config.apiRoute;
    resultOffset = config.paginationOffset;
    paginationCallback = config.paginationCallback;
    order = config.order;
    filter = config.filter;

    const sliderChilds = slidesWrapper.querySelectorAll('.slider__item');
    const sliderChildsQuantity = sliderChilds.length;
    sliderChildWidth = parseInt(getComputedStyle(slider).width) / perView;
    //slideClasses = config.sliderClassName;

    length = sliderChildsQuantity + 1;

    //listeners to controls

    arrowNext.onclick = goNext;
    arrowPrev.onclick = goPrev;

    /*if (sliderChilds.length !== 0) {
      
      length = sliderChilds.length;
      Array.from(sliderChilds).forEach((child) => {
        child.style.width = sliderChildWidth;
      });
    }*/

    requestPagination();
  };

  const reload = (newConfig) => {
    let newConfigs = { ...config, ...newConfig };
    slidesWrapper.innerHTML = '';
    index = 0;
    length = 0;
    configure(newConfigs);
  };

  const mount = () => {
    configure(config);

    return {
      reload
    }
  };

  return {
    mount
  };
};

export default Slider;