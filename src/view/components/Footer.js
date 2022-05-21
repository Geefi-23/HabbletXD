import '../../static/css/footer.css';

const Footer = () => {
  return (
    <footer className="w-100 p-5">
      <small className="d-block hxd-primary-text fw-bold w-50">
        Copyrights © 2021 | HabbletXD. Todos os direitos reservados a este site da web.<br/>
        A HabbletXD é um fã site oficial do Habblet Hotel e não é afiliada com, patrocinada por, apoiada por,
        ou principalmente aprovada pela Rede Habblet Corporation Ltd. Esta Fã Site pode utilizar as marcas registradas e outras propriedades 
        intelectuais do Habblet, que estão permitidas sob a Política de Fã Sites Habblet.
      </small>
      <div className="w-100 m-3" style={{borderTop: '1px solid rgb(var(--hxd-theme-colorLight))'}}></div>
      <div className="hxd-primary-text">
        <h6 className="fw-bold">Desenhado por Paone</h6>
        <h6 className="fw-bold">
          Desenvolvido por
          &nbsp;<a className="hxd-primary-text" href="https://github.com/Geefi-23">Milton R.</a> 
          &nbsp;e 
          &nbsp;<a className="hxd-primary-text"href="https://github.com/marcosboni">Marcos</a>
          </h6>
      </div>
      
    </footer>
  );
};

export default Footer;