import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";

import LinearProgress from '@mui/material/LinearProgress';

import Header from "./view/components/Header";
import Alert from "./view/components/Alert";
import Footer from "./view/components/Footer";

import './static/css/reset.css';
import './static/css/vars.css';
import './static/css/basic.css';
import './static/css/slider.css';
import Approutes from "./routes";

import api from "./static/js/api";

const App = () => {
  const [user, setUser] = useState(null);
  
  const alertRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const userNotificationsRef = useRef(null);

  // preload data
  const [badges, setBadges] = useState([]);
  const [loja, setLoja] = useState([]);
  const [allNews, setAllNews] = useState(null);
  const [allSpotlights, setAllSpotlights] = useState([]);
  const [allTimelines, setAllTimelines] = useState([]);
  const [allArts, setAllArts] = useState([]);
  const [artCategories, setArtCategories] = useState([]);
  const [values, setValues] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const handleProgressShow = () => {
    progressRef.current.classList.remove('invisible');
  };

  const handleProgressHide = () => {
    progressRef.current.classList.add('invisible');
  };
  
  /**
   * @author Milton R. (Geefi)
   * @param {string} type Estilo do alerta. O estilo é definido usando classes do bootstrap, por exemplo: para .alert-success, basta especificar 'success'
   * @param {string} content Conteúdo do alerta
   * 
   * @description Mostra um alerta na tela
   * 
   * Como estamos no react deveriamos usar os states, porém foi visualizado um bug que resetava os inputs dos formulários (como o de autenticação,
   * por exemplo) quando o alerta sumia da tela, isto porque o componente era atualizado completamente. 
   * Para evitar esse inconveniente, foi optado por fazer um algorítimo mais 'padrão', usando apenas o useRef do React.
   */
  const sendAlert = (type, content) => {
    containerRef.current.classList.remove('d-none');
    alertRef.current.classList.add('alert-'+type);
    alertRef.current.innerText = content;

    setTimeout(() => {
      alertRef.current.classList.add('opacity-0');

      setTimeout(() => {
        containerRef.current.classList.add('d-none');
        alertRef.current.classList.remove('alert-'+type, 'opacity-0');
        alertRef.current.innerText = '';
      }, 1000);

    }, 5000)
  };

  const Progress = ({ refe }) => {
    const location = useLocation();
    
    useEffect(() => {
      handleProgressShow();
    }, [location]);

    return (
      <div ref={refe} className="invisible" style={{
        backgroundColor: 'white',
        position: 'fixed',
        width: '100vw',
        top: 0,
        zIndex: 1061
      }}>
        <LinearProgress />
      </div>
    );
  };

  const checkAuthentication = useCallback(async () => {
    let res = await api.user('authenticate', {credentials: 'include'});

    if (res.authenticated) {
      let avatar = api.getMedia(res.authenticated.avatar);
      res.authenticated.avatar = avatar;
    }
    
    setUser(res.authenticated);
  }, [setUser]);
  
  const pool = async () => {
    let news = await api.news('getall');
    let timelines = await api.timeline('getall');
    let arts = await api.art('getall');
    let badges = await api.badges('getall');
    let buyables = await api.buyable('getall');
    let artCategories = await api.art('getallcategories');
    let values = await api.values('getall');
    let schedules = await api.radioHorarios('getsome', { limit: 3 });

    badges.new = badges.new.map(badge => {
      badge.imagem = api.getMedia(badge.imagem);
      return badge;
    });
    buyables = buyables.map(item => {
      item.imagem = api.getMedia(item.imagem);
      return item;
    });
    values = values.map(item => {
      item.imagem = api.getMedia(item.imagem);
      return item;
    });

    console.log('caça ao loop')

    //getting all images

    news = news.map(el => {
      el.imagem = api.getMedia(el.imagem);
      return el;
    });
    arts = arts.map(el => {
      el.imagem = api.getMedia(el.imagem)
      return el;
    });

    setAllNews(news);
    setAllArts(arts);
    setLoja(buyables);
    setAllTimelines(timelines);
    setBadges(badges);
    setArtCategories(artCategories);
    setValues(values);
    setSchedules(schedules);
    handleProgressHide();
  };

  useEffect(() => {
    handleProgressShow();
    pool();
    checkAuthentication();
  }, []);
  
  return (
    <Router>
      <Progress refe={progressRef} />
      
      <Alert alertRef={alertRef} containerRef={containerRef} />
      
      <Header 
        user={user} setUser={setUser}
        sendAlert={sendAlert} 
        showProgress={handleProgressShow} 
        hideProgress={handleProgressHide} 
        artCategories={artCategories}
        values={values}
        userNotificationsRef={userNotificationsRef}
        schedules={schedules}
      />
        
      <Approutes 
        user={user} 
        setUser={setUser}
        sendAlert={sendAlert} 
        showProgress={handleProgressShow} 
        hideProgress={handleProgressHide} 
        badges={badges}
        loja={loja}
        allNews={allNews}
        allArts={allArts}
        allTimelines={allTimelines}
        allSpotlights={allSpotlights}
        artCategories={artCategories}
        values={values}
      />
      <Footer />
    </Router>
  );
};

export default App;