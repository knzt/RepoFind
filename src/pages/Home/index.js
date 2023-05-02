import { useState } from 'react';

import { Header } from '../../components/Header';

import github from '../../assets/github.png';

import './styles.css';
import ItemList from '../../components/ItemList';
function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);

    const newUser = await userData.json();

    if(newUser.name) {
      const {avatar_url, name, bio, login, html_url} = newUser;
      setCurrentUser({avatar_url, name, bio, login, html_url});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);

      const newRepos = await reposData.json();

      if(newRepos.length > 0) {
        setRepos(newRepos);
      }
    }
  }


  return (
    <div className="App">
      <Header />

      <div className='content'>
        <img src={github} alt="Background com ícone do Github" className='background'/>

        <div className='info'>
          <div>
            <input
              name='user'
              value={user}
              placeholder='@username'
              onChange={event => setUser(event.target.value)} />

            <button onClick={handleGetData}>
              Buscar
              <span className="top"></span>
              <span className="right"></span>
              <span className="bottom"></span>
              <span className="left"></span>
            </button>
          </div>

          {currentUser?.name ? (
          <>
          <div className='user-profile'>
            <img src={currentUser.avatar_url} alt="foto de perfil fo usuário no github" className='profile'/>
            <div>
              <h3>{currentUser.name}</h3>
              <a href={currentUser.html_url} target='blank'><span>@{currentUser.login}</span></a>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          </>
          ) : null}

          {repos?.length > 0 ? (

          <div className='repo'>
            <h4 className='repositories'>Repositórios</h4>
            <hr/>
            {repos.map(repo => (
              <ItemList
              title={repo.name}
              link={repo.html_url}
              description={repo.description}/>
            ))}
          </div>

          ) : null}

        </div>
      </div>
    </div>
  );
}

export default App;
