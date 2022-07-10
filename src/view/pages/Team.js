import { useEffect, useState } from 'react';
import api from '../../static/js/api';

import '../../static/css/team.css';

const Card = props => {
  const [user, setUser] = useState({});

  const { refer } = props;

  useEffect(() => {
    
    setUser(refer);
  }, []);

  return (
    <article>
      <div className="team_member-card">
        <div className="team_member-card__picture"
          style={{ 
            background: user?.avatar !== '' ? `url('${user?.avatar}') center center / cover` : '#cacad9',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img 
            style={{
              objectPosition: '0 -20px'
            }}
            src={`https://avatar.blet.in/${user.nome}&action=std&size=l&head_direction=3&direction=2&gesture=std&headonly=0`}
          />
        </div>
        <div className='d-flex gap-1 mt-1'>
          <div className='d-flex justify-content-center align-items-center hxd-primary-text hxd-border fw-bold rounded' 
            style={{
              width: '160px'
            }}
          >
            {user.nome}
          </div>
          <div className='d-flex justify-content-evenly hxd-border fw-bold rounded text-center py-1'
            style={{
              width: '90px'
            }}
          >
            <a href={user.facebook} className="bg-transparent border-0 p-0">
              <img 
                src="https://img.icons8.com/color/16/undefined/facebook-f.png"
                alt=""
              />
            </a>
            <a href={user.twitter} className="bg-transparent border-0 p-0">
              <img 
                src="https://img.icons8.com/color/16/undefined/twitter--v1.png"
                alt=""
              />
            </a>
            <a href={'https://discord.com/users/'+user.discord} className="bg-transparent border-0 p-0">
              <img 
                src="https://img.icons8.com/color/16/undefined/discord--v2.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
};

const Team = ({ hideProgress }) => {
  const [teamUsers, setTeamUsers] = useState([]);
  const [teamRoles, setTeamRoles] = useState([]);

  const pool = async () => {
    let teamUsers = await api.team('getallusers');
    const teamRoles = await api.team('getallroles');

    teamUsers = await Promise.all(teamUsers.map(async user => {
      if (user.avatar !== ''){
        user.avatar = api.getMedia(user.avatar);
      }
      return user;
    }));

    setTeamUsers(teamUsers);
    setTeamRoles(teamRoles);
    hideProgress();
  };

  useEffect(() => {
    pool();
  }, []);
  return (
    <div className="container">
      <section className='section'>
        <div 
          style={{
            height: '50px'
          }}
          className="section__header hxd-bg-color d-flex align-items-center rounded text-white px-3"
        >
          <h4>Equipe</h4>
        </div>
        <div className="section__content gap-4 flex-column">
          {
            teamRoles.map(role => (
              <div key={role.id}>
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
                  {role.nome}
                </div>
                <div className='d-flex gap-3 flex-wrap'>
                  {
                    teamUsers.filter(user => user.cargo_id === role.id).map(user => (
                      <Card refer={user} key={user.id} />
                    ))
                  }
                </div>
              </div>

            ))
          }
          
        </div>
      </section>
    </div>
  );
};

export default Team;