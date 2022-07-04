//ADORAMOS BTS //
//@author geefi e marcos

import React from 'react';
import { useEffect, useState } from 'react';
import api from '../../static/js/api';
import '../../static/css/valores.css';

const Card = props => {
  const [value, setValue] = useState({});
  const { refer } = props;

  useEffect(() => {
    setValue(refer);
  }, []);

  return (
    <article className="card-valores"> {/*tag semantica, sempre usa article para cards*/}
      <div className="card-valores__view"> {/*vai aparecer a foto do bagui e o nome*/}
        <div className="d-flex justify-content-center align-items-center" style={{ flex: '1 0 0' }}>
          <img src={value?.imagem} alt="" />
        </div> {/*esse flex 1 0 0 é pra preencher o tamanho restante*/}

        <div style={{ height: '50px' }} className="d-flex justify-content-center align-items-center bg-white">
          <span className="hxd-primary-text">{value?.nome}</span>
        </div>
      </div>
      <div className="d-flex flex-column gap-1 mt-1 text-center">
        <span className="hxd-bg-color text-white p-1 rounded">
          Valor na loja: {value?.preco}
        </span>
        <span className="bg-white hxd-primary-text hxd-border p-1 rounded">
          Valor em LTD: {value?.valorltd}
        </span>
        <span className="hxd-bg-color text-white p-1 rounded">
          Situação: {value?.situacao}
        </span>
      </div>
    </article>
  );
};

const Valores = ({ hideProgress }) => {
  const [values, setValues] = useState([]);

  const pool = async () => {
    let res = await api.values('getall');

    res = await Promise.all(res.map(async (value) => {
      if (value.categoria_id !== "3") {
        value.imagem = api.getMedia(value.imagem);
      }
      return value;
    }));
    setValues(res);
    hideProgress();
  };

  useEffect(() => {
    pool();
  }, []);
  return (
    <main className="container">
      <section className="section">
        <div className="section__header hxd-bg-color rounded p-2">

          <h4 className="text-white m-0 ms-2">Valores</h4>
        </div>
        <div className="section__content">
          <section className="section px-3">
            <div className="section__header">
              <div>
                <h4 className="hxd-primary-text m-0">
                  Valores <span className="hxd-secondary-text">destaques</span>
                </h4>
                <span className="hxd-secondary-text">Os raros mais destacados do Habblet Hotel.</span>
              </div>
            </div>
            <div className="section__content">
            

            </div>
          </section>
          <section className="section px-3">
            <div className="section__header justify-content-between">
              <div>
                <h4 className="hxd-primary-text m-0">
                  Valores <span className="hxd-secondary-text">de raros</span>
                </h4>
                <span className="hxd-secondary-text">Veja todos os valores de todos os raros do Habblet Hotel.</span>
              </div>
              <div className="d-flex gap-2" style={{ height: '40px' }}>
                <select className="hxd-border bg-transparent rounded p-2">
                  <option value="0">Mais recente</option>
                  <option value="1">Mais antigo</option>
                </select>
                <div className="d-flex hxd-border rounded">
                  <button className="bg-transparent border-0">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"viewBox="0 0 24 24" fill="currentColor">
                      <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
                    </svg>
                  </button>
                  <input className="bg-transparent border-0" type="search" placeholder='Pesquisar' autoComplete='off'/>
                </div>
              </div>
            </div>
            <div className="section__content">
              {
                values.map(value => (
                  <Card refer={value} key={value.id} />
                ))
              }
            </div>
          </section>
        </div>
      </section>
    </main>
  );

}
export default Valores;