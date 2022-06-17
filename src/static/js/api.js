/**
 * @author Milton R. (Geefi)
 * @description Módulo que controla a requisição de dados ao servidor da aplicação
 */

const URL = 'https://localhost/api/';

// Cada váriavel representa uma rota de dados
const userPath = 'user/';
const buyablePath = 'buyable/';
const badgesPath = 'badges/';
const newsPath = 'news/';
const timelinePath = 'timeline/';
const mediaPath = 'media/';
const artPath = 'arts/';
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

  buyable: async (action, init = {}) => {
    let res = await (await fetch(URL+buyablePath+action+'.php', init)).json();
    return res;
  },

  badges: async (action, init ={}) => {
    let res = await (await fetch(URL+badgesPath+action+'.php', init)).json();
    return res;
  },

  news: async (action, queryparams = {}, init = {}) => {
    let url = URL+newsPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  timeline: async (action, queryparams = {}, init = {}) => {

    let url = URL+timelinePath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    } 

    let res = await (await fetch(url, init)).json();
    return res;
  },

  media: async (action, queryparams = {}, init = {}) => {
    let url = URL+mediaPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let blob = await (await fetch(url, init)).blob();
    return blob;
  },

  art: async (action, queryparams = {}, init = {}) => {
    let url = URL+artPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  search: async (q) => {
    let res = await (await fetch(URL+searchPath+'?q='+q)).json();
    return res;
  }
};

export default api;