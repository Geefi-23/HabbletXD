import { Route, Routes } from "react-router-dom";

import Home from "./view/pages/Home";
import ProfileEdit from "./view/pages/ProfileEdit";
import Profile from "./view/pages/Profile";
import SearchResults from "./view/pages/SearchResults";
import Forum from "./view/pages/Forum";
import Team from "./view/pages/Team";
import HabbletImager from "./view/pages/HabbletImager";
import Valores from "./view/pages/Valores";
import Schedules from "./view/pages/Schedules";
import GridEmblem from "./view/pages/GridEmblem"; 
const approutes = (props) => {
  const { user, setUser, sendAlert, showProgress, hideProgress, setAllTimelines, getCurrentTheme, currentTheme } = props;

  // preload data
  const { badges, loja, allNews, allTimelines, allArts, allSpotlights, values, 
    lastEvent, ranking, trendingTopics, setAllNews } = props;
  
  return (
    <Routes>
      <Route path="*" element={
      <div className="container">
        <h2>404 - Página não encontrada</h2>
      </div>}/>
      <Route 
        path="/" 
        element={
        <Home 
          user={user}
          setUser={setUser}
          showProgress={showProgress} 
          hideProgress={hideProgress} 
          sendAlert={sendAlert} 
          key={Math.random()}
          badges={badges}
          loja={loja}
          allNews={allNews}
          allTimelines={allTimelines}
          setAllTimelines={setAllTimelines}
          setAllNews={setAllNews}
          allArts={allArts}
          allSpotlights={allSpotlights}
          values={values}
          ranking={ranking}
          trendingTopics={trendingTopics}

          getCurrentTheme={getCurrentTheme}
          currentTheme={currentTheme}
        />
        } 
      /> 
      <Route path="/emblemas" element={<GridEmblem hideProgress={hideProgress} badges={badges} />} /> 
      <Route path="/search" element={<SearchResults />} />
      <Route path="/valores" element={<Valores hideProgress={hideProgress} getCurrentTheme={getCurrentTheme} values={values} />} />
      <Route path="/horarios" element={<Schedules hideProgress={hideProgress} />} />
      <Route path="/equipe" element={<Team hideProgress={hideProgress} />} />
      <Route path="/habbletimager" element={<HabbletImager />} />
      <Route path="/meuperfil" element={<Profile type="myself" user={user} hideProgress={hideProgress} />} />
      <Route 
        path="/editarperfil" 
        element={
          <ProfileEdit 
            user={user} 
            setUser={setUser}
            sendAlert={sendAlert} 
            showProgress={showProgress} 
            hideProgress={hideProgress} 
          />
        } 
      />
      <Route path="/perfil/*">
        <Route path=":name" element={<Profile hideProgress={hideProgress} />} />
      </Route>
      <Route 
        path="/ler/noticia/:key/:id" 
        element={
          <Forum 
            user={user} 
            sendAlert={sendAlert} 
            showProgress={showProgress} 
            hideProgress={hideProgress} type='news' 
          />
        }
      />
      <Route path="/evento/*" >
        <Route 
          path=":key" 
          element={
            <Forum 
              user={user} 
              sendAlert={sendAlert} 
              showProgress={showProgress} 
              hideProgress={hideProgress} type='event' 
            />
          }
        />
      </Route>
      <Route path="/timeline/*" >
        <Route 
          path=":key" element={
          <Forum 
            user={user} 
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
            user={user} 
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