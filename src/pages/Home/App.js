import { useState } from 'react';

import { Header } from '../../components/Header/Header';

import github from '../../assets/github.png';

import './app.css';
import ItemList from '../../components/Repository/Repository';
function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);

    const newUser = await userData.json();

    if(newUser.name) {
      const {avatar_url, name, bio, login, html_url, public_repos} = newUser;
      setCurrentUser({avatar_url, name, bio, login, html_url, public_repos});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);

      const newRepos = await reposData.json();

      if(newRepos.length > 0) {
        setRepos(newRepos);
      }
    }

    handleOnClear();
  }

  const handleOnClear = () => {
    setUser('');
  }


  return (
    <div className="App">
      <Header />

      <div className='content'>
        <img src={github} alt="Background com ícone do Github" className='background'/>

        <div className='info'>
          <div>
            <input
              type="text"
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
              <a href={currentUser.html_url} target='blank' title='abrir no github'><span>@{currentUser.login}</span></a>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          </>
          ) : (
                <p id='tutorial'>Digite o nome de usuário (github) no campo indicado<br/>
                ➥ clique em buscar<br/>
                ➥ clique no @ do usuário para acessar o perfil no GitHub<br/>
                ➥ clique no nome do repositório para acessar o repositório no GitHub
                 </p>
                )
          }

          {repos?.length > 0 ? (

          <div className='repo'>
            <h4 className='repositories'>Repositórios ({currentUser.public_repos})</h4>
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
