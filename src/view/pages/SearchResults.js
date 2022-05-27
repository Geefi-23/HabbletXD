import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../static/js/api';
import '../../static/css/search-results.css';

const SearchResults = () => {
  const [results, setResults] = useState({noticias: [], usuarios: []});

  const getResults = useCallback(async (q) => {
    let res = await api.search(q);
    setResults(res);
  });

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    let q = evt.target.querySelector('#search').value;
    getResults(q);
  };

  return (
    <div className="container">
      <form 
        className="form-inline d-flex flex-row align-items-center my-2 my-lg-0 pl-3-lg" 
        role="search" 
        aria-level={3}
        onSubmit={handleSearchSubmit}
      >
        <input id="search" className="form-control w-100" type="search" placeholder="Pesquisar" aria-label="Search"/>
        <button className="hxd-bg-color text-white border-0 rounded" type="submit" style={{width: '40px', height: '40px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"viewBox="0 0 24 24" fill="currentColor">
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
          </svg>
        </button>
      </form>
      <section>
        <div className="section-titulo">
          <h1>Resultados de pesquisa: {results.count}</h1>
        </div>
        {/*CONTAINERS DOS RESULTADO*/}
        <section className="d-flex flex-wrap gap-3 pt-2">
          {
            results.usuarios.map(usuario => (
              <Link to={`/perfil/${usuario.usuario}`} className="container-geral">
                <div className="container-nome-perfill">
                  <span style={{color: '#fff', fontSize: '15px'}}>Perfil</span>
                </div>
                <div className="container-foto">
                  <img src="https://img.freepik.com/vetores-gratis/sol-quente-em-um-fundo-amarelo-reflexo-da-luz-solar-estrela-branca-brilhante-com-destaques-bonitos-em-um-fundo-laranja_86826-653.jpg" alt=""/>
                  <div className="container-boneco">
                    <img src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=ferrazmatheus&direction=2&head_direction=2&size=m&action=std" alt=""/>
                  </div>
                </div>
                <div className="container-conteudo">
                  <div className="titulo">
                    <h1>{usuario.usuario}</h1>
                  </div>
                  <div className="container-infos">
                    <p>Sobre Mim: {usuario.missao}</p>
                  </div>
                </div>
              </Link>
            ))
          }
          {
            results.noticias.map(noticia => (
              <div className="container-geral">
                <div className="container-nome-perfill">
                  <span style={{color: '#fff', fontSize: '15px'}}>Noticia</span>
                </div>
                <div className="container-foto">
                  <img src="https://img.freepik.com/vetores-gratis/sol-quente-em-um-fundo-amarelo-reflexo-da-luz-solar-estrela-branca-brilhante-com-destaques-bonitos-em-um-fundo-laranja_86826-653.jpg" alt=""/>
                  <div className="container-boneco">
                    <img src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=ferrazmatheus&direction=2&head_direction=2&size=m&action=std" alt=" "/>
                  </div>
                </div>
                <div className="container-conteudo">
                  <div className="titulo">
                    <h1>{noticia.autor}</h1>
                  </div>
                  <div className="container-infos">
                    <p>{noticia.resumo}</p>
                  </div>
                  <div class="container-postagem">
                    <p>Postada dia 00/00 as 15:00 </p>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="container-geral">
            <div className="container-nome-perfill">
              <span style={{color: '#fff', fontSize: '15px'}}>Arte</span>
            </div>
            <div className="container-foto">
              <img src="https://img.freepik.com/vetores-gratis/sol-quente-em-um-fundo-amarelo-reflexo-da-luz-solar-estrela-branca-brilhante-com-destaques-bonitos-em-um-fundo-laranja_86826-653.jpg" alt=" "/>
              <div className="container-boneco">
                <img src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=ferrazmatheus&direction=2&head_direction=2&size=m&action=std" alt=" "/>
              </div>
            </div>
            <div className="container-conteudo">
              <div className="titulo">
                <h1>Marcos</h1>
              </div>
              <div className="container-infos">
                <p>Novos Emblemas Estao Disponiveis No Catalogo Abaixo </p>
                <p style={{fontSize: '10px', marginTop: '-16px'}}>Novos Emblemas Já Estao Disponiveis</p>
              </div>
              <div class="container-postagem">
                <p>Postada dia 00/00 as 15:00 </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default SearchResults;