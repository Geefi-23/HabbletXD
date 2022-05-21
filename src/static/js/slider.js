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
const Slider = () => {
  
  /**
   * 
   * @param {*} config 
   * @description deve receber o id do slider, as setas para o seu controle, gap (rem) para espaçamento entre os elementos,
   * e o número de elementos que devem ser mostrados.
   * @example { slider: '#meuslider', gap: 8, slidesToShow: 8, arrows: { left: '#seta_esquerda', right: '#seta_direita' }}
   */
  const create = (config) => {
    let slider = document.querySelector(config.slider);
    let track = slider.querySelector('.slider__track');
    let arrowLeft = document.querySelector((config.arrows || {}).left) || slider.querySelector('.slider__arrow--left');
    let arrowRight = document.querySelector((config.arrows || {}).right) || slider.querySelector('.slider__arrow--right');
    let firstItem = slider.querySelector('.slider__item:first-child');
    if (firstItem === null) return;
    let childs = slider.querySelectorAll('.slider__item');
    let childNumber = childs.length;
    let childWidth = parseFloat(parseFloat(window.getComputedStyle(childs[0]).width).toFixed(2));
  
    const MAX_VISIBLE_ITEMS = config.slidesToShow;
    let MARGIN_CONCAT_VALUE = parseFloat((parseFloat(window.getComputedStyle(firstItem).width) + config.gap).toFixed(2));
    const MAX_MARGIN = 0;
    const MIN_MARGIN = -(childNumber - MAX_VISIBLE_ITEMS) * MARGIN_CONCAT_VALUE;

    let currentMargin = 0;
    
    track.style.width = ((childWidth+config.gap) * MAX_VISIBLE_ITEMS - config.gap)+'px';
    track.style.gap = config.gap+'px';

    if (childNumber <= MAX_VISIBLE_ITEMS) {
      arrowLeft.disabled = true;
      arrowRight.disabled = true;
    }
  
    arrowLeft.onclick = () => {
      if ((currentMargin + MARGIN_CONCAT_VALUE) > MAX_MARGIN) return;
      currentMargin += MARGIN_CONCAT_VALUE;
      firstItem.style.marginLeft = currentMargin + 'px';
    };
    arrowRight.onclick = () => {
      if (currentMargin.toFixed(2) <= MIN_MARGIN) return;
      currentMargin -= MARGIN_CONCAT_VALUE;
      firstItem.style.marginLeft = currentMargin + 'px';
    };
    window.onresize = () => {
      create(config);
    };
  };

  return {
    create
  };
};

export default Slider();