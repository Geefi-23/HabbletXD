import '../../static/css/footer.css';

const Footer = () => {
  return (
    <footer className="w-100 p-5">
      <small className="d-block hxd-primary-text w-50">
        Copyrights © 2021 | HabbletXD. Todos os direitos reservados a este site da web.<br/>
        A HabbletXD é um fã site oficial do Habblet Hotel e não é afiliada com, patrocinada por, apoiada por,
        ou principalmente aprovada pela Rede Habblet Corporation Ltd. Esta Fã Site pode utilizar as marcas registradas e outras propriedades 
        intelectuais do Habblet, que estão permitidas sob a Política de Fã Sites Habblet.
      </small>
      <div className="w-100 m-3" style={{borderTop: '1px solid rgb(var(--hxd-theme-colorLight))'}}></div>
      <div className="hxd-primary-text">
        <span className="hxd-bg-color-gray py-2 px-4 rounded-pill">
          <img src="https://img.icons8.com/ios-filled/24/undefined/illustrator.png" alt="" className="me-2" />
          Desenhado por Paone
        </span>
        <br /><br />
        <span className="hxd-bg-color-gray py-2 px-4 rounded-pill">
          <img src="https://img.icons8.com/metro/24/undefined/source-code.png" alt="" className="me-2" />
          Desenvolvido por&nbsp;
          <strong>
            <a className="hxd-primary-text text-decoration-none" href="https://github.com/Geefi-23">Milton R.</a> 
          </strong>
          &nbsp;e&nbsp;
          <strong>
            <a className="hxd-primary-text text-decoration-none" href="https://github.com/marcosboni">Marcos(Indio)</a>
          </strong>
        </span>
      </div>
      
    </footer>
  );
};

export default Footer;