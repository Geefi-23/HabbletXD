import { Route, Routes } from "react-router-dom";

import Home from "./view/pages/Home";
import ProfileEdit from "./view/pages/ProfileEdit";
import Profile from "./view/pages/Profile";
import SearchResults from "./view/pages/SearchResults";
import Forum from "./view/pages/Forum";
import Team from "./view/pages/Team";

const approutes = (props) => {
  const { isAuth, sendAlert, showProgress, hideProgress } = props;

  return (
    <Routes>
      <Route path="*" element={<>Gay</>}/>
      <Route path="/" element={<Home showProgress={showProgress} hideProgress={hideProgress} />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/equipe" element={<Team />} />
      <Route path="/meuperfil" element={<Profile type="myself" />} />
      <Route path="/editarperfil" element={<ProfileEdit />} />
      <Route path="/perfil/*">
        <Route path=":name" element={<Profile />} />
      </Route>
      <Route path="/noticia/*" >
        <Route 
          path=":key" element={<Forum isAuth={isAuth} 
          sendAlert={sendAlert} 
          showProgress={showProgress} 
          hideProgress={hideProgress} type='news' />} 
        />
      </Route>
      <Route path="/timeline/*" >
        <Route 
          path=":key" element={<Forum isAuth={isAuth} 
          sendAlert={sendAlert} 
          showProgress={showProgress} 
          hideProgress={hideProgress} type='timeline' />}
        />
      </Route>
    </Routes>
    
  );
};

export default approutes;