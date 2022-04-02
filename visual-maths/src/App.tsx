import './App.css';
import { NavLink } from 'react-router-dom';
import fractalImg from './assets/images/fractal.png';
import gameoflifeImg from './assets/images/gameoflife.png';

function App() {
  return (
    <div className="App h-screen overflow-y-hidden">
      <h1 className="w-fit m-auto font-handwritten text-5xl text-gray-700">
        Visual Maths
      </h1>
      <div className="flex flex-col h-screen dark:bg-darkgray">
        <div className="relative w-5/6 lg:w-1/3 sm:w-1/2 mx-auto my-20 h-fit neumorph dark:dark-neumorph bg-orange rounded-2xl hover:scale-110 transition duration-300 ease-in-out">
          <NavLink to="/fractals">
            <h1 className="text-3xl absolute right-0 bottom-0 p-2 w-fit m-auto rounded-tl-lg rounded-br-lg font-handwritten bg-white text-gray-700">
              Fractals
            </h1>
            <img
              className="w-5/6 m-auto h-5/6 pt-10 rounded-2xl"
              src={fractalImg}
              alt="julia set"
            ></img>
          </NavLink>
        </div>

        <div className="relative w-5/6 lg:w-1/3 sm:w-1/2 mx-auto my-20 h-fit neumorph dark:dark-neumorph bg-white rounded-2xl hover:scale-110 transition duration-300 ease-in-out">
          <NavLink to="/gameOfLife">
            <h1 className="text-3xl absolute right-0 bottom-0 p-2 w-fit m-auto rounded-tl-lg rounded-br-lg font-handwritten bg-white text-gray-700">
              GameOfLife
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
