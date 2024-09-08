import MatchingMemoryGame from './components/MatchingMemoryGame';
import TicTacToe from './components/TicTacToe';
import CandyCrush from './components/CandyCrush';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<MatchingMemoryGame />} />
          <Route path="tic-tac-toe" element={<TicTacToe />} />
          <Route path="candy-crush" element={<CandyCrush />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
