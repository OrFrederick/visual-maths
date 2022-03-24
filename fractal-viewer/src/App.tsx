import './App.css';
import { Link } from 'react-router-dom';

function App() {
  localStorage.clear();
  return (
    <div className="App">
      <h1>What are you looking for?</h1>
      <Link to="/fractals">Fractals</Link>
      <br></br>
      <Link to="/gameOfLife">GameOfLive</Link>
    </div>
  );
}

export default App;
