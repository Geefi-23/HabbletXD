import '../../static/css/team.css'

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
        <div className='d-flex gap-1'>
          <div className='hxd-secondary-text hxd-border fw-bold rounded text-center' 
          style={{
            width: '160px'
          }}>Geefi</div>
          <div className='hxd-secondary-text hxd-border fw-bold rounded text-center'
          style={{
            width: '90px'
          }}>f d t</div>
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