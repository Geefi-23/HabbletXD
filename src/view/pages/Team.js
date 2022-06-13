import '../../static/css/team.css';

const Card = () => {
  return (
    <>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: '35px',
        border: '1px solid rgb(var(--hxd-theme-color))',
        borderRadius: '.25rem',
        fontWeight: 'bold',
        padding: '0 2rem',
        marginBottom: '1rem'
      }}>
        CEO
      </div>
      <div className="team_member-card">
        <div className="team_member-card__picture"></div>
        <div className='d-flex gap-1 mt-1'>
          <div className='d-flex justify-content-center align-items-center hxd-primary-text hxd-border fw-bold rounded' 
            style={{
              width: '160px'
            }}
          >Geefi</div>
          <div className='d-flex justify-content-evenly hxd-border fw-bold rounded text-center py-1'
            style={{
              width: '90px'
            }}
          >
            <button className="bg-transparent border-0 p-0">
              <img 
                src="https://img.icons8.com/color/16/undefined/facebook-f.png"
              />
            </button>
            <button className="bg-transparent border-0 p-0">
              <img 
                src="https://img.icons8.com/color/16/undefined/twitter--v1.png"
              />
            </button>
            <button className="bg-transparent border-0 p-0">
              <img 
                src="https://img.icons8.com/color/16/undefined/discord--v2.png"
              />
            </button>
            
            
            
          </div>
        </div>
      </div>
    </>
  )
};

const Team = () => {
  return (
    <div className="container">
      <section>
        <div 
          style={{
            height: '50px'
          }}
          className="hxd-bg-color d-flex align-items-center rounded text-white px-3"
        >
          <h4>Equipe</h4>
        </div>
        <div className="pt-3">
          <Card />
        </div>
      </section>
    </div>
  );
};

export default Team;