import { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import useServerApi from '../../hooks/useServerApi';
import api from '../../static/js/api';

import '../../static/css/forum.css';

const Comment = (props) => {
  const [comment, setComment] = useState({});
  const { refer, type, sendAlert, showProgress, hideProgress, onDelete, user } = props;

  const adjustDate = (el) => {
    let ad = el;
    let date = new Date(parseInt(el.data)*1000);
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

  const handleDelete = async () => {
    let init = {
      method: 'POST',
      body: JSON.stringify({
        id: refer.id
      }),
      credentials: 'include'
    };

    showProgress();
    let res = await api[type]('deletecomment', {}, init);

    if (res.error) {
      sendAlert('danger', res.error);
    } else if (res.success) {
      sendAlert('success', res.success);
      onDelete();
    }
    hideProgress();
  };

  useEffect(() => {
    setComment(adjustDate(refer));
  }, [setComment, refer]);

  return (
    <div className="comentario">
      <div>
        <img 
          src={`https://avatar.blet.in/${comment.autor}&action=std&size=b&head_direction=2&direction=2&gesture=spk&headonly=1`} 
          alt=""
        />
      </div>
      <div className="d-flex flex-column" style={{flex: '1 0 0'}}>
        <div className="comentario-info">
          <h1>Por {comment.autor} no dia {comment.dia} as {comment.hora}</h1>
          {
            comment.autor === user?.usuario ?
            <button className="bg-transparent border-0" onClick={handleDelete}>
              <img src="https://img.icons8.com/material-rounded/16/ffffff/trash--v1.png" alt="" />
            </button>
            :
            <button className="bg-transparent border-0">
              <img src="https://img.icons8.com/material-rounded/16/ffffff/error--v1.png" alt="" />
            </button>
          }
        </div>
        <div className="balao rounded-bottom" dangerouslySetInnerHTML={{ __html: comment.comentario }}></div>
        <div className="icone-img">
          <i style={{ color: '#fff' }} className="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

const Forum = (props) => {
  const [article, setArticle] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [scrollToTop, setScrollToTop] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [art, setArt] = useState([]); // para artes
  const location = useLocation();
  const { key } = useParams();
  const { user, sendAlert, type, showProgress, hideProgress } = props;

  const adjustDate = (el) => {
    let date = new Date(parseInt(el.data)*1000)
    let day = date.getDate();
    day = day < 10 ? '0'+day : day;
    let month = date.getUTCMonth() + 1;
    month = month < 10 ? '0'+month : month;
    el.data = `${day}/${month}`;

    let hour = date.getHours();
    hour = hour < 10 ? '0'+hour : hour;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    el.hora = `${hour}:${minutes}`;

    return el;
  };

  const handleCommentSender = async (evt) => {
    evt.preventDefault();

    let comentario = evt.target.querySelector('#txtComment input');
    if (/^[ \n]*$/.test(comentario)) {
      return sendAlert('danger', 'Você não digitou nada!');
    }

    showProgress();
    evt.target.querySelector('button[type="submit"]').disabled = true;

    let date = new Date();
    let comment = {
      url: key,
      comentario: comentario.value
    };
    let init = {
      method: 'POST',
      body: JSON.stringify(comment),
      credentials: 'include'
    };
    let res = await api[type]('sendcomment', {}, init);

    if (res.error) {
      sendAlert('danger', res.error);
      hideProgress();
    } else {
      sendAlert('success', res.success);

      comment.data = Math.round(date.getTime() / 1000);
      comment.autor = user.usuario;

      setComentarios([...comentarios, adjustDate(comment)]);
      hideProgress();
      console.log('mano')
      console.log(res?.award);
      comentario.value = '';
    }
    evt.target.querySelector('button[type="submit"]').disabled = false;
  };

  const handleLikeButton = async (evt) => {
    api[type]('updatelikes', { key: article?.url }, { credentials: 'include' })
    .then(() => setArticle({...article, likes: parseInt(article.likes)+1}))

    evt.currentTarget.disabled = true;
  };

  useServerApi(type, 'get', { key }, (res) => {
    let article = adjustDate(res.object);
    setArticle(article);
    setComentarios(res.comentarios);
    hideProgress();
  });

  useServerApi(type, 'updateviews', { key }, () => {
    setArticle({...article, likes: article?.likes+1 || 1})
  });

  const get = useCallback(async () => {
    showProgress();
    let res = await api[type]('get', {key});
    let article = adjustDate(res.object);
    
    setArticle(article);
    setComentarios(res.comentarios);
    if (type === 'art') {
      let blob = await api.media('get', { filename: article.imagem });
      setArt(URL.createObjectURL(blob));
    }

      api[type]('updateviews', { key }, { credentials: 'include' });

    hideProgress();
  }, [setArticle, setArt, setComentarios, showProgress, key, type, hideProgress]);

  useEffect(() => { 
    if (scrollToTop) {
      window.scrollTo(0, 0);
      setScrollToTop(false);
    }

    if (type === 'art') {
      let imagem = api.getMedia(article?.imagem);
      setArt(imagem);
    }
  }, [article, scrollToTop, get, firstLoad, type]);

  useEffect(() => {
    console.log(firstLoad);
    if (!firstLoad) {
      get();
    } else {
      setFirstLoad(false);
    }
  }, [location]);
  return (
    <>
      <section className="w-100 forum">
        <div className="container">
          <div className="forum-header">
          {
            article !== null ?
            <>
            <div className="info ms-3">
              <div className="m-0 text-nowrap text-truncate h6" role="heading" aria-level="2">
                {article?.titulo || '#'+article?.hashtags?.split(' ').join(' #') }
              </div>
              <small className="text-nowrap text-truncate">{article?.resumo}</small>
            </div>
            <div className="d-flex flex-row h-100 gap-2">
              <div className='text-center'>
                <div>
                  {
                    type !== 'timeline' ?
                    <img 
                      src={(() => {
                        const image = require(`../../static/icons/${article?.categoria_icone || 'category_icon_art.gif'}`);
                        return image;
                      })()}
                      alt=""
                    />
                    : <></>
                  }
                  <small className="ms-2"><strong>{article.categoria}</strong></small>
                </div>
                <small className="hxd-primary-text">
                  Por <Link 
                    className="text-decoration-none hxd-primary-text"
                    to={`/perfil/${article.criador || article.autor}`}>{article.criador || article.autor}</Link> no dia {article.data} as {article.hora}
                </small>
              </div>
              <img 
                src={`https://avatar.blet.in/${article.criador || article.autor}&action=wav&size=b&head_direction=3&direction=4&gesture=sml&headonly=0`} 
                alt=""
                style={{
                  height: '100%',
                  width: '64px',
                  objectFit: 'none',
                  objectPosition: '0 -20px'
                }}
              />
              <div className="d-inline-flex flex-column gap-1">
                {
                  user ?
                  <>
                    <button 
                      className={`d-flex justify-content-center align-items-center rate-btn btn-success ${article?.liked ? 'active' : ''}`}
                      onClick={handleLikeButton}
                      disabled={parseInt(article?.liked)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up me-1" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                      </svg>
                      {article?.likes}
                    </button>
                    <button className="d-flex justify-content-center align-items-center rate-btn btn-danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                      </svg>
                    </button>
                  </> : <></>
                }
              </div>
            </div>
            </>
            :
            <></>
          }
          </div>
          <div className="container-objetos">
            <img
              src="http://api.habblet.city/avatar/HabbletAPI&action=sit,wav&direction=4&head_direction=3&img_format=png&gesture=std&headonly=0&size=b&dance=0&frame_num=0&effect="
              alt=""
            />
            {
              type === 'art' ?
              <div 
                className="container-conteudo text-center" 
              >
                <img src={art} alt="" />
              </div>
              :
              <div 
                className="container-conteudo" 
                dangerouslySetInnerHTML={{ __html: article.texto}}
              ></div>
            }
            
            {
              !article?.fixo || article?.fixo === 'nao' ?
              user ?
                <div id='busca'>
                  <form idaction="#" className="write-comment mb-3"
                    onSubmit={handleCommentSender}
                  >
                    <img 
                      src={`https://avatar.blet.in/${user?.usuario}&action=std&size=b&head_direction=3&direction=2&gesture=std&headonly=1`} 
                      alt=""
                      style={{
                        height: '40px',
                        width: '45px',
                        objectFit: 'none',
                        objectPosition: '50% -20px'
                      }}
                    />
                    <div id="txtComment">
                      <input name="q" type="text" placeholder="Digite o seu comentário" autoComplete='off' />
                    </div>
                    <button id="btnComment" type="submit">Comentar</button>
                  </form>
                </div>
                :
                <h4 className="text-center my-4">Faça login para comentar neste artigo!</h4>
              : <></>
            }
            <div className="d-flex flex-column gap-4">
              {
                !article?.fixo || article?.fixo === 'nao' ?

                  comentarios?.length === 0 ?
                    !user ?
                    '' : <h3 className="text-center">Faça o primeiro comentário neste artigo!</h3>
                  :
                  comentarios.map((comentario) => (
                    <Comment 
                      refer={comentario} 
                      type={type} 
                      sendAlert={sendAlert} 
                      showProgress={showProgress} 
                      hideProgress={hideProgress} 
                      user={user}
                      onDelete={() => {
                        let clist = comentarios.filter(c => c.id !== comentario.id);
                        setComentarios(clist);
                      }}
                    />
                  ))
                : <></>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forum;