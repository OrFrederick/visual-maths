import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Fractals from './components/Viewers/Fractals';
import GameOfLifeViewer from './components/Viewers/GameOfLife';
import NoPage from './components/Others/NoPage';

const routs = (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      {/*  <Route path="/" element={<></>}> */}
      <Route index element={<App />} />
      <Route path="fractals" element={<Fractals />} />
      <Route path="gameOfLife" element={<GameOfLifeViewer />} />
      <Route path="*" element={<NoPage />} />
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(routs, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
