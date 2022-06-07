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

  const getImage = async (filename) => {
    let blob = await api.media('get', {
      filename,
      type: 'image'
    });
    setThumb(URL.createObjectURL(blob));
  };
  
  const formatSomeInfo = (obj) => {
    let views = obj?.visualizacao;
    views = views === 0 ? 'nenhuma visualização' : views === 1 ? `${views} visualização` : `${views} visualizações`;

    obj.visualizacao = views;

    return obj;
  };

  useEffect(() => {
    let news = adjustDate(refer);
    getImage(news.imagem);
    setNews(formatSomeInfo(news));
    
  }, [refer]);

  return (
    <Link to={'noticia/'+news.url} className="news-card"
    onClick={onClick}
    >
      <div className="news-card__thumbnail">
        <img className="w-100 h-100" src={thumb} alt=" " />
        <div className="news-card__thumbnail--hover">
          <div className="h4 fw-bold">IR</div>
          <small className="d-block fw-bold">{news.visualizacao}</small>
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
  const { refer, onClick } = props;

  useEffect(() => {
    setTimeline(refer);
  }, [refer]);
  return (
    <Link to={"/timeline/"+timeline.url} className="timeline-card"
    onClick={onClick}>
      <div className="d-flex flex-row hxd-border-bottom">
        <div className="timeline-card__avatar">
          <img 
            src={`https://avatar.blet.in/${timeline.autor}&action=std&size=s&head_direction=3&direction=3&gesture=std&headonly=1`}
            className="h-100 w-100" 
            style={{
              objectFit: 'none',
              objectPosition: '50% 0'
            }}
          />
        </div>
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

  const getImage = async (filename) => {
    
    let blob = await api.media('get', {
      filename,
      type: 'image'
    });
    setThumb(URL.createObjectURL(blob));
  };

  useEffect(() => {
    let art = adjustDate(refer);
    getImage(art.imagem);
    setArt(art);
    
  }, [refer]);

  return (
    <Link to={"/arte/"+art.url} className="art-card" onClick={onClick}>
      <div className="art-card__thumbnail overflow-hidden">
        <img className="w-100 h-100" style={{objectFit: 'cover'}} src={thumb} alt="" />
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

const ResultCard = (props) => {
  const [result, setResult] = useState(null);
  let { refer, type } = props;


  useEffect(() => {
    let result = refer;
    if (type !== 'Perfil') {
      result = adjustDate(result);
    }

    setResult(result);
    
  }, [refer]);
  return (
    <>
    {
      type !== 'Perfil' ?
      <Link to={`/${type.toLowerCase()}/${result?.usuario}`} className="container-geral">
          <div className="container-nome-perfill">
            <span style={{color: '#fff', fontSize: '15px'}}>{type}</span>
          </div>
          <div className="container-foto">
            <img src="https://img.freepik.com/vetores-gratis/sol-quente-em-um-fundo-amarelo-reflexo-da-luz-solar-estrela-branca-brilhante-com-destaques-bonitos-em-um-fundo-laranja_86826-653.jpg" alt=" "/>
          </div>
          <div className="container-conteudo">
            <strong>{result?.autor || result?.criador}</strong>
            <div className="container-infos">
              <small>
                <strong role="heading" aria-level="5">{result?.titulo}</strong>
              </small>
              <small>
                {result?.resumo || result?.descricao}
              </small>
            </div>
            <div class="container-postagem">
              <span>Postada dia {result?.data} as {result?.hora} </span>
            </div>
          </div>
      </Link>
      :
      <Link to={`/perfil/${result?.usuario}`} className="container-geral">
        <div className="container-nome-perfill">
          <span style={{color: '#fff', fontSize: '15px'}}>{type}</span>
        </div>
        <div className="container-foto">
          <img src="https://img.freepik.com/vetores-gratis/sol-quente-em-um-fundo-amarelo-reflexo-da-luz-solar-estrela-branca-brilhante-com-destaques-bonitos-em-um-fundo-laranja_86826-653.jpg" alt=" "/>
          <div className="container-boneco">
            <img src={`https://avatar.blet.in/Geefi&action=std&size=b&head_direction=3&direction=2&gesture=sml&headonly=0`} alt=" "/>
          </div>
        </div>
        <div className="container-conteudo">
          <strong>{result?.usuario}</strong>
          <div className="container-infos">
            <small>
              {result?.missao}
            </small>
          </div>
        </div>
      </Link>
    } 
    </>
  );
};

export {
  NewsCard,
  TimelineCard,
  ArtCard,
  SpotlightCard,
  ResultCard
}