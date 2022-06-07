import { Route, Routes } from "react-router-dom";

import Home from "./view/pages/Home";
import ProfileEdit from "./view/pages/ProfileEdit";
import Profile from "./view/pages/Profile";
import SearchResults from "./view/pages/SearchResults";
import Forum from "./view/pages/Forum";
import Team from "./view/pages/Team";
import HabbletImager from "./view/pages/HabbletImager";

const approutes = (props) => {
  const { isAuth, sendAlert, showProgress, hideProgress } = props;

  return (
    <Routes>
      <Route path="*" element={<>Gay</>}/>
      <Route path="/" element={<Home showProgress={showProgress} hideProgress={hideProgress} sendAlert={sendAlert}  />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/equipe" element={<Team />} />
      <Route path="/habbletimager" element={<HabbletImager />} />
      <Route path="/meuperfil" element={<Profile type="myself" isAuth={isAuth} hideProgress={hideProgress} />} />
      <Route 
        path="/editarperfil" 
        element={
          <ProfileEdit 
            isAuth={isAuth} 
            sendAlert={sendAlert} 
            showProgress={showProgress} 
            hideProgress={hideProgress} 
          />
        } 
      />
      <Route path="/perfil/*">
        <Route path=":name" element={<Profile hideProgress={hideProgress} />} />
      </Route>
      <Route path="/noticia/*" >
        <Route 
          path=":key" 
          element={
            <Forum 
              isAuth={isAuth} 
              sendAlert={sendAlert} 
              showProgress={showProgress} 
              hideProgress={hideProgress} type='news' 
            />
          }
        />
      </Route>
      <Route path="/timeline/*" >
        <Route 
          path=":key" element={
          <Forum 
            isAuth={isAuth} 
            sendAlert={sendAlert} 
            showProgress={showProgress} 
            hideProgress={hideProgress} type='timeline' 
          />}
        />
      </Route>
      <Route path="/arte/*" >
        <Route 
          path=":key" element={
          <Forum 
            isAuth={isAuth} 
            sendAlert={sendAlert} 
            showProgress={showProgress} 
            hideProgress={hideProgress} type='art' 
          />}
        />
      </Route>
    </Routes>
    
  );
};

export default approutes;