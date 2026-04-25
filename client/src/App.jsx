import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AlgorithmDetail from './pages/AlgorithmDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/algorithm/:id" element={<AlgorithmDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
