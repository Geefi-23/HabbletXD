import { useEffect, useState } from 'react';
import api from '../../static/js/api';

const Card = (props) => {
  const [schedule, setSchedule] = useState({});
  const { refer, highlight } = props;

  useEffect(() => {
    setSchedule(refer);
  }, [refer]);

  return (
    <article 
      className={`d-flex align-items-center hxd-border w-100 rounded px-3 overflow-hidden ${highlight ? 'hxd-bg-color text-white' : ''}`}
      style={{ height: '50px' }}
    >
      <img 
        src={`https://avatar.blet.in/${schedule.usuario}&action=std&size=b&head_direction=3&direction=2&gesture=sml&headonly=0`} 
        alt="" 
        style={{
          objectPosition: '0 15px'
        }}
      />
      {schedule?.usuario} as {schedule?.comeca}
    </article>
  );
};

const Schedules = ({ hideProgress }) => {
  const [schedules, setSchedules] = useState([]);
  
  const pool = async () => {
    const res = await api.radioHorarios('getall', {}, {});
    setSchedules(res);
    hideProgress();
  };

  useEffect(() => {
    pool();
  }, []);

  const cards = new Array(24).fill({});
  return (
    <main className="container">
      <section className="section">
        <div className="section__header align-items-center ps-3 text-white hxd-bg-color rounded" style={{ height: '50px' }}>
          <h4>Horários</h4>
        </div>
        <div className="section__content">
          <div
            style={{ 
              display: 'grid',
              width: '100%',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(6, 50px)',
              gridAutoFlow: 'column',
              rowGap: '.5rem',
              columnGap: '.5rem'
            }}
          >
            {
              schedules.map((schedule, i) => {
                if (i < 6) 
                  return <Card refer={schedule} key={schedule.id} highlight />
                return <Card refer={schedule} key={schedule.id} />
              })
            }
          </div>
        </div>
      </section>
    </main>
  );
};

export default Schedules;