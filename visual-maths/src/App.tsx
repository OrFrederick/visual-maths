import './App.css';
import { NavLink } from 'react-router-dom';
import fractalImg from './images/fractal.png';
import gameoflifeImg from './images/gameoflife.png';

function App() {
  const toggleTheme = () => {
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark';
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="App">
      <label className="switch">
        <input defaultValue="checked" type="checkbox" onInput={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <div className="flex flex-col h-screen dark:bg-slate-800">
        <div className="relative w-1/3 m-auto h-fit neumorph dark:dark-neumorph bg-orange rounded-2xl hover:scale-110 transition duration-300 ease-in-out">
          <NavLink to="/fractals">
            <h1 className="text-2xl absolute right-0 bottom-0 p-2 w-fit m-auto rounded-tl-lg rounded-br-lg bg-white font-bold text-gray-700">
              Fractals
            </h1>
            <img
              className="w-5/6 m-auto h-5/6 pt-10 rounded-2xl"
              src={fractalImg}
              alt="julia set"
            ></img>
          </NavLink>
        </div>

        <div className="relative w-1/3 m-auto h-fit neumorph dark:dark-neumorph rounded-2xl hover:scale-110 transition duration-300 ease-in-out">
          <NavLink to="/gameOfLife">
            <h1 className="text-2xl absolute right-0 bottom-0 p-2 w-fit m-auto rounded-tl-lg rounded-br-lg  bg-white font-bold text-gray-700">
              GameOfLive
            </h1>
            <img
              className="w-5/6 m-auto h-5/6 pt-10 rounded-2xl"
              src={gameoflifeImg}
              alt="game of life"
            ></img>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default App;
