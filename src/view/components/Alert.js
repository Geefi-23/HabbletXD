const Alert = (props) => {
  let { containerRef, alertRef } = props;

  const containerStyle = {
    display: 'flex',
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
    height: '60px',
    transition: 'opacity ease-out .5s'
  };
  return (
    <div className={`d-none justify-content-center`} style={containerStyle} ref={containerRef}>
      <div className={`alert position-absolute`} style={alertStyle} ref={alertRef}></div>
    </div>
  );
};

export default Alert;