import './App.css';
import Fractals from './components/Viewers/Fractals';

function App() {
  localStorage.clear();
  return (
    <div className="App">
      <Fractals></Fractals>
    </div>
  );
}

export default App;
