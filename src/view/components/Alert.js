const Alert = (props) => {
  let { type, content, visible } = props;

  const containerStyle = {
    position: 'fixed',
    width: '100%',
    height: '100px',
    paddingRight: '17px',
    top: 0,
    left: 0,
    zIndex: 1067,
    pointerEvents: 'none'
  };

  const alertStyle = {
    height: '60px'
  };
  return (
    <div className={`${visible ? 'd-flex' : 'd-none'} justify-content-center`} style={containerStyle}>
      <div className={`alert alert-${type} position-absolute`} style={alertStyle}>
        {content}
      </div>
    </div>
  );
};

export default Alert;