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
const radioHorariosPath = 'radioHorarios/';
const radioPath = 'radio/';
const valuesPath = 'values/';
const teamPath = 'team/';
const eventPath = 'event/';
const rankingPath = 'ranking/';
const carouselPath = 'carousel/';
const musicRequestPath = 'requests/';
const searchPath = 'search.php';

/* No parâmetro action, deve se especificar a ação que deve ser realizada pela função. Basicamente,
  O nome da página a qual se quer requisitar. Os nomes das páginas foram escritos como ações para 
  facilitar o entendimento da sua função. Não é necessário específicar a extensão do arquivo quando o
  mesmo for do tipo PHP */
const api = {
  user: async (action, queryparams = {}, init = {}) => {
    let url = URL+userPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  buyable: async (action, queryparams = {}, init = {}) => {
    let url = URL+buyablePath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
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
    /*let url = URL+mediaPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let blob = await (await fetch(url, init)).blob();
    return blob;*/
  },

  getMedia: (filename) => {
    return URL+'media/get.php?filename='+filename;
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

  musicRequest: async (action, queryparams = {}, init = {}) => {
    let url = URL+musicRequestPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  radioHorarios: async (action, queryparams = {}, init = {}) => {
    let url = URL+radioHorariosPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  radio: async (action, queryparams = {}, init = {}) => {
    let url = URL+radioPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  values: async (action, queryparams = {}, init = {}) => {
    let url = URL+valuesPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  team: async (action, queryparams = {}, init = {}) => {
    let url = URL+teamPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  ranking: async (action, queryparams = {}, init = {}) => {
    let url = URL+rankingPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  event: async (action, queryparams = {}, init = {}) => {
    let url = URL+eventPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
    if (Object.entries(queryparams).length !== 0) {
      for (let param in queryparams) {
        url += `${param}=${queryparams[param]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    let res = await (await fetch(url, init)).json();
    return res;
  },

  indexCarousel: async (action, queryparams = {}, init = {}) => {
    let url = URL+carouselPath+action+`.php${Object.entries(queryparams).length !== 0 ? '?':''}`;
    
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