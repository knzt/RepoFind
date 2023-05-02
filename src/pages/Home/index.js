import { Header } from '../../components/Header';

import github from '../../assets/github.png';

import './styles.css';
function App() {
  return (
    <div className="App">
      <Header />

      <div className='content'>
        <img src={github} alt="Background com ícone do Github" className='background'/>

        <div className='info'>
          <div>
            <input name='user' placeholder='@username' />

            <button>
              Buscar
              <span class="top"></span>
              <span class="right"></span>
              <span class="bottom"></span>
              <span class="left"></span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
