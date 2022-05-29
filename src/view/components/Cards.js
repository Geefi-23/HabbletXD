import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../static/js/api';

const adjustDate = (toAdjust) => {
  let ad = toAdjust;
  let date = new Date(parseInt(ad.data)*1000)
  let day = date.getDate();
  day = day < 10 ? '0'+day : day;
  let month = date.getUTCMonth() + 1;
  month = month < 10 ? '0'+month : month;
  ad.data = `${day}/${month}`;

  let hour = date.getHours();
  hour = hour < 10 ? '0'+hour : hour;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0'+minutes : minutes;
  ad.hora = `${hour}:${minutes}`;

  return ad;
};

const NewsCard = (props) => {
  const [news, setNews] = useState({});
  const [thumb, setThumb] = useState(null);
  const { refer, onClick } = props;

  const getImage = async (url) => {
    let blob = await api.media('get', url, 'image');
    setThumb(URL.createObjectURL(blob));
  };
  

  useEffect(() => {
    let news = adjustDate(refer);
    getImage(news.imagem);
    setNews(news);
    
  }, [refer]);

  return (
    <Link to={'noticia/'+news.url} className="news-card"
    onClick={onClick}
    >
      <div className="news-card__thumbnail">
        <img className="w-100 h-100" src={thumb} alt="" />
        <div className="news-card__thumbnail--hover">
          <div className="h4 fw-bold">IR</div>
          <small className="d-block fw-bold">0 Visualizações</small>
          <small className="d-block fw-bold">100 Likes</small>
          <small className="mt-2">{news.categoria_nome}</small>
        </div>
      </div>
      <div className="news-card__content">
        <span className="news-card__title">{news.titulo}</span>
        <small className='news-card__resume'>{news.resumo}</small>
        <div className="position-absolute fw-bold text-secondary" style={{bottom: 0}}>{`${news.data} às ${news.hora}`}</div>
      </div>
    </Link>
  );
};

const TimelineCard = (props) => {
  const [timeline, setTimeline] = useState({texto: ''});
  const { refer } = props;

  useEffect(() => {
    setTimeline(refer);
  }, [refer]);
  return (
    <Link to={"/timeline/"+timeline.id} className="timeline-card">
      <div className="d-flex flex-row hxd-border-bottom">
        <div className="timeline-card__avatar"></div>
        <div className="timeline-card__preview">
        {
          timeline.texto.substr(
            0, 
            timeline.texto.length < 50 ? timeline.texto.length : 49  
          )
        }
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <small className="fw-bold hxd-secondary-text">#HabbletXD</small>
        <small className="fw-bold text-danger">100 likes</small>
      </div>
    </Link>
  );
};

const ArtCard = (props) => {
  const [art, setArt] = useState({});
  const [thumb, setThumb] = useState(null);
  const { refer, onClick } = props;

  const getImage = async (url) => {
    let blob = await api.media('get', url, 'art');
    setThumb(URL.createObjectURL(blob));
  };

  useEffect(() => {
    let art = adjustDate(refer);
    getImage(art.imagem);
    setArt(art);
    
  }, [refer]);

  return (
    <Link to={"/arte/"+art.url} className="art-card">
      <div className="art-card__thumbnail overflow-hidden">
        <img className="w-100 h-100" src={thumb} alt="" />
        <div className="art-card__thumbnail--hover">
          <span className="display-6 fw-bold">IR</span>
          <span>100 Visualizações</span>
          <span>100 Curtidas</span>
          <span className="mt-2">Uma categoria</span>
        </div>
      </div>
      <div className="art-card__info" style={{height: '30%'}}>
        <div className="d-flex flex-column h-100 overflow-hidden" style={{width: '80%'}}>
          <h6 className="mb-0 hxd-primary-text text-truncate fw-bold">{art.titulo}</h6>
          <small className="hxd-secondary-text text-truncate">{art.descricao}</small>
          <small className="hxd-secondary-text text-end pe-2">{art.data} às {art.hora}</small>
        </div>
        <div style={{flex: '1 0 0'}}>
          <div className='w-100 h-100 bg-dark rounded'></div>
        </div>
      </div>
    </Link>
  );
};

const SpotlightCard = () => {
  return (
    <div className="spotlight-card">
      <div className="spotlight-card__header fw-bold">
        <div>De: HabbletXD</div>
        <div>Para: geefi</div>
      </div>
      <div className="spotlight-card__content">blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
  );
};

export {
  NewsCard,
  TimelineCard,
  ArtCard,
  SpotlightCard
}