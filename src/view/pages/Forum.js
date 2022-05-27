import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../static/js/api';

import '../../static/css/forum.css';

const Comment = (props) => {
  const [comment, setComment] = useState({});
  const { refer } = props;

  const adjustDate = (el) => {
    let date = new Date(parseInt(el.data)*1000)
    let day = date.getUTCDate();
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

  useEffect(() => {
    setComment(adjustDate(refer));
  }, [setComment, refer]);

  return (
    <div className="comentario">
      <img 
        src={`https://avatar.blet.in/${comment.autor}&action=std&size=l&head_direction=3&direction=2&gesture=std&headonly=1`} alt=""
        style={{height: '62px'}}
      />
      <div className="d-flex flex-column" style={{flex: '1 0 0'}}>
        <div className="comentario-info">
          <h1>Por {comment.autor} no dia {comment.data} as {comment.hora}</h1>
        </div>
        <div className="balao">
          {comment.comentario}
        </div>
        <div className="icone-img">
          <i style={{ color: '#fff' }} className="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

const Forum = (props) => {
  const [article, setArticle] = useState({});
  const [comentarios, setComentarios] = useState([]);
  const { key } = useParams();
  const { isAuth, sendAlert, type, hideProgress } = props;

  const adjustDate = (el) => {
    let date = new Date(parseInt(el.data)*1000)
    let day = date.getUTCDate();
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

  const get = useCallback(async () => {
    let res = await api[type]('get', key);
    let article = adjustDate(res.object);
    
    setArticle(article);
    setComentarios(res.comentarios);
    hideProgress();
  }, [setArticle, setComentarios, key, type, hideProgress]);

  const handleCommentSender = async (evt) => {
    evt.preventDefault();

    let comentario = evt.target.querySelector('#txtComment')
    if (/^[ \n]*$/.test(comentario)) {
      return sendAlert('danger', 'Você não digitou nada!');
    }

    let user = JSON.parse(localStorage.getItem('hxd-user-object'));
    let date = new Date();
    let comment = {
      urlNoticia: key,
      autor: user.usuario,
      comentario: comentario.value,
      data: date.getTime() / 1000
    };
    let init = {
      method: 'POST',
      body: JSON.stringify(comment),
      credentials: 'include'
    };
    let res = await api[type]('sendcomment', null, init);
    if (res.error) {
      sendAlert('danger', res.error)
    } else {
      sendAlert('success', res.success)
      setComentarios([...comentarios, adjustDate(comment)]);
      
    }
  };

  useEffect(() => { 
    get();
    window.scrollTo(0, 0);
  }, [get]);
  return (
    <>
      <section className="w-100 forum">
        <div className="container">
          <div className="forum-header">
            <div className="info ms-3">
              <h2 className="m-0 text-nowrap text-truncate">{article.titulo}</h2>
              <div className="text-nowrap text-truncate">{article.resumo}</div>
            </div>
            <div className="d-flex flex-row">
              <div className='me-2'>
                <div>
                  <img
                    src="https://3.bp.blogspot.com/-XfKkzB4dZak/XEi1zdjRPEI/AAAAAAABKZ4/6DfaPGn0OqA-8E7-uWw6YLV1lL5wnKpmQCKgBGAs/s1600/roupas.png"
                    alt=""
                  />
                  <strong className="ms-2">{article.categoria_nome}</strong>
                </div>
                <strong className="text-special">
                  Por <Link 
                    className="text-decoration-none text-special"
                    to={`/perfil/${article.criador}`}>{article.criador}</Link> no dia {article.data} as {article.hora}
                </strong>
              </div>
              <div className="d-inline-flex flex-column">
                <button className="rate-btn btn-success"></button>
                <button className="rate-btn btn-danger"></button>
              </div>
            </div>
          </div>
          <div className="container-objetos">
            <img
              src="http://api.habblet.city/avatar/HabbletAPI&action=sit,wav&direction=4&head_direction=3&img_format=png&gesture=std&headonly=0&size=b&dance=0&frame_num=0&effect="
              alt=""
            />
            <div className="container-conteudo" 
            dangerouslySetInnerHTML={{ __html: article.texto}}></div>
            {
              isAuth ?
              <div id='busca'>
                <form idaction="#" className="write-comment"
                  onSubmit={handleCommentSender}
                >
                  <img src={`https://avatar.blet.in/${JSON.parse(localStorage.getItem('hxd-user-object')).avatar}&action=std&size=b&head_direction=3&direction=2&gesture=std&headonly=1`} alt="" />
                  <input id="txtComment" name="q" type="text" placeholder="Digite o seu comentário" />
                  <input id="btnComment" type="submit" value="Comentar" />
                </form>
              </div>
              :
              <h4 className="text-center my-4">Faça login para comentar neste artigo!</h4>
            }
            <div className="d-flex flex-column gap-4">
              {
                comentarios.length === 0 ?
                  !isAuth ?
                  '' : <h3 className="text-center">Faça o primeiro comentário neste artigo!</h3>
                :
                comentarios.map((comentario) => (
                  <Comment refer={comentario} />
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forum;