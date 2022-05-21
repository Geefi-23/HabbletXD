/**
 * @author Milton R. (Geefi)
 * @description Módulo que controla a requisição de dados ao servidor da aplicação
 */

const URL = /*window.location.href+*/'http://localhost:8000/api/';

// Cada váriavel representa uma rota de dados
const userPath = 'user/';
const mobisPath = 'mobis/';
const badgesPath = 'badges/';
const newsPath = 'news/';
const timelinePath = 'timeline/';
const mediaPath = 'media/';
const searchPath = 'search.php';

/* BUG: Em modo de desenvolvimento, a rota para buscar imagens ou qualquer outro tipo de mídia
  não funciona devido ao CORS. Esse bug deixa de existir em modo de produção, ou seja, no app servido
  pelo 'npm run build' */

/* No parâmetro action, deve se especificar a ação que deve ser realizada pela função. Basicamente,
  O nome da página a qual se quer requisitar. Os nomes das páginas foram escritos como ações para 
  facilitar o entendimento da sua função. Não é necessário específicar a extensão do arquivo quando o
  mesmo for do tipo PHP */
const api = {
  user: async (action, init = {}) => {
    let res = await (await fetch(URL+userPath+action+'.php', init)).json();
    return res;
  },
  getMobis: async () => {
    let res = await (await fetch(URL+mobisPath+'getsome.php')).json();
    return res;
  },
  getBadges: async () => {
    let res = await (await fetch(URL+badgesPath+'getsome.php')).json();
    return res;
  },
  news: async (action, key = null, init = {}) => {
    let res = await (await fetch(URL+newsPath+action+`.php${key ? '?key='+key : ''}`, init)).json();
    return res;
  },
  timeline: async (action, id = null, init = {}) => {
    let res = await (await fetch(URL+timelinePath+action+`.php${id ? '?id='+id : ''}`, init)).json();
    return res;
  },
  getMedia: async (filename) => {
    let blob = await (await fetch(URL+mediaPath+filename)).blob();
    return blob;
  },
  search: async (q) => {
    let res = await (await fetch(URL+searchPath+'?q='+q)).json();
    return res;
  }
};

export default api;