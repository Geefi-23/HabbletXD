import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../static/js/api';

const adjustDate = (toAdjust) => {
  let ad = toAdjust;
  let date = new Date(parseInt(ad.data)*1000);
  let day = date.getDate();
  day = day < 10 ? '0'+day : day;
  let month = date.getUTCMonth() + 1;
  month = month < 10 ? '0'+month : month;
  ad.dia = `${day}/${month}`;

  let hour = date.getHours();
  hour = hour < 10 ? '0'+hour : hour;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0'+minutes : minutes;
  ad.hora = `${hour}:${minutes}`;

  return ad;
};

const NewsCard = (props) => {
  const [news, setNews] = useState({});
  const { refer, onClick } = props;

  const formatSomeInfo = (obj) => {
    let views = obj?.visualizacao;
    let likes = obj?.likes;
    views = views === "0" ? 'Nenhuma visualização' : views === "1" ? `${views} visualização` : `${views} visualizações`;
    likes = likes === "0" ? 'Nenhum like' : likes === "1" ? `${likes} like` : `${likes} likes`;

    obj.visualizacao = views;
    obj.likes = likes;

    return obj;
  };


  useEffect(() => {
    setNews(adjustDate(refer));
    
  }, []);

  return (
    <Link 
      to={`ler/noticia/${news.url}/${news.id}`} 
      className={`news-card ${parseInt(news?.lido) ? 'news-card--read' : ''}`}
      onClick={onClick}
    >
      <div className="news-card__thumbnail">
        <img className="w-100 h-100" src={news.imagem} alt="" onError={(evt) => evt.target.classList.add('d-none')} />
        <div className="news-card__thumbnail--hover">
          <div className="h4 fw-bold">IR</div>
          <small className="d-block">
            {
              news.visualizacao && news.visualizacao === "0" ? 'Sem visualizações' :
              news.visualizacao === "1" ? news.visualizacao + ' visualização' : 
              news.visualizacao + ' visualizações'
            
            }
          </small>
          <small className="d-block">{news.likes} likes</small>
          <img
            src={require(`../../static/icons/${news?.categoria_icone || 'category_icon_art.gif'}`)}
          />
          <small className="mt-2">{news.categoria_nome}</small>
        </div>
      </div>
      <div className="news-card__content">
        <h6 className="news-card__title">{news.titulo}</h6>
        <small className='news-card__resume' role="paragraph">{news.resumo}</small>
        <div className="d-flex w-100 justify-content-between position-absolute hxd-primary-text" style={{height: '20px', bottom: 0}}>
          <small>{`${news.dia} às ${news.hora}`}</small>
          <img 
            style={{ alignSelf: 'center', objectPosition: '10px 5px' }}
            src={`https://avatar.blet.in/${news.criador}&action=std&size=b&head_direction=3&direction=2&gesture=std&headonly=1`} 
            title={news.criador}
          />
        </div>
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
        <small 
          className="timeline-card__preview" 
          dangerouslySetInnerHTML={
            { 
              __html: timeline.texto.substring(
                0, 
                timeline.texto.length < 50 ? timeline.texto.length : 49  
              ) 
            }
          }
        >
        </small>
      </div>
      <div className="d-flex justify-content-between">
        <small className="fw-bold hxd-secondary-text">#{timeline?.hashtags?.split(' ')[0]}</small>
        <small className="d-flex align-items-center text-danger">
          <img
            className="me-1"
            src="https://img.icons8.com/ios-glyphs/20/dc3545/like--v1.png"
          />
          {timeline.likes}
        </small>
      </div>
    </Link>
  );
};

const ArtCard = (props) => {
  const [art, setArt] = useState({});
  const { refer, onClick } = props;

  useEffect(() => {
    let art = adjustDate(refer);
    setArt(art);
    
  }, [refer]);

  return (
    <Link to={"/arte/"+art.url} className="art-card" onClick={onClick}>
      <div className="art-card__thumbnail">
        <img className="w-100 h-100" style={{objectFit: 'cover'}} src={art.imagem} alt="" onError={(evt) => evt.target.classList.add('d.none')} />
        <div className="art-card__thumbnail--hover">
          <span className="display-6 fw-bold">IR</span>
          <span>{art.visualizacao} Visualizações</span>
          <span>{art.likes} Curtidas</span>
          <span className="mt-2">
            <img className="me-2" src={require('../../static/icons/category_icon_art.gif')} alt=""/>
            {art.categoria_nome}
          </span>
        </div>
      </div>
      <div className="art-card__info">
        <div className="position-relative d-flex flex-column h-100 overflow-hidden" style={{flex: '1 0 0'}}>
          <h6 className="hxd-primary-text text-truncate">{art.titulo}</h6>
          <small 
            className="hxd-secondary-text overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              wordBreak: 'normal',
              wordWrap: 'break-word'
            }}
            role="paragraph"
          >
            {art.descricao}
          </small>
          <small className="position-absolute bottom-0 w-100 hxd-secondary-text text-end pe-1">{art.dia} às {art.hora}</small>
        </div>
        <div 
          className='hxd-bg-colorLight rounded overflow-hidden'
          style={{
            width: '60px',
            height: '60px'
          }}
        >
          <img 
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'none',
              objectPosition: 'center -10px'
            }}
            src={`https://avatar.blet.in/${art.autor}&action=std&size=b&head_direction=3&direction=2&gesture=std&headonly=1`} 
            title={art.autor}
          />
        </div>
      </div>
    </Link>
  );
};

const SpotlightCard = ({ refer }) => {
  return (
    <article className="spotlight-card">
      <div className="spotlight-card__header d-flex justify-content-between">
        <div>
          De: HabbletXD<br />
          Para: {refer?.usuario}
        </div>
        
        <img 
          src={`https://avatar.blet.in/${refer?.usuario}&action=std,crr=49&size=b&head_direction=3&direction=4&gesture=sml&headonly=0`} 
          alt=""
          style={{
            width: '4rem',
            objectFit: 'none',
            objectPosition: '0 -1.5rem'
          }}
        />
      </div>
      <p className="spotlight-card__content">
        {refer?.motivo}
      </p>
    </article>
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
      <Link to={`/${type.toLowerCase()}/${result?.url}`} className="container-geral">
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
              <span>Postada dia {result?.dia} as {result?.hora} </span>
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
            <img src={`https://avatar.blet.in/${result?.usuario}&action=std&size=b&head_direction=3&direction=2&gesture=sml&headonly=0`} alt=" "/>
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