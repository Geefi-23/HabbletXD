import React from 'react';
import { useEffect, useState } from 'react';
import '../../static/css/emblema.css';

export default function GridEmblem(props) {

    const { hideProgress, badges } = props;
    const [searchedId, setSearchedId] = useState(-1);

    const handleSearch = evt => {
        evt.preventDefault();
        const q = evt.target.q.value.toLowerCase().trim();

        if (q === '' || q === ' ') return setSearchedId(-1);

        const searched = badges?.all?.filter((b) => b.nome.toLowerCase().search(q) !== -1 )[0].id
        setSearchedId(searched);
        console.log(searched)
    };

    useEffect(() => {
        hideProgress();
    }, []);
    return (
        <section className="section">
            <div className='container'>
                <form className="mb-3" onSubmit={handleSearch}>
                    <div className="d-flex align-items-center w-100 hxd-border rounded p-2" >
                        <button className='bg-transparent border-0' type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                            </svg>
                        </button>
                        <input 
                            name="q" 
                            type="text" 
                            className='bg-transparent border-0 ms-2' 
                            style={{ flex: 1 }} 
                            placeholder="Pesquisar emblema"
                            autoComplete='off'
                        />
                    </div>
                    
                </form>

                <div className="d-flex justify-content-center gap-2 pb-5 flex-wrap position-relative">
                    
                    {
                        badges?.all?.map((badge, i) => (
                            <div className='wrapper' style={{ maxHeight: '175px' }} key={badge?.id}>
                                <div className={`badge-card ${searchedId === badge?.id ? 'highlight' : ''}`} title={badge?.nome}>
                                    <img src={badge.imagem} alt="" />
                                </div>
                                <article className="badge-card-info">
                                    <div className="badge-card hxd-bg-colorDark">
                                        <img src={badge.imagem} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="mb-0">{badge?.nome}</h5>
                                        <strong className="d-block">{badge?.codigo}</strong>
                                        <small>Onde foi conquistado: {badge?.conquistado} | {badge?.usuarios_qtd} pessoas possuem este emblema.</small>
                                    </div>
                                    
                                </article>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
