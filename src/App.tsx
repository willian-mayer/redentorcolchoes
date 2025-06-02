import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar title="Mi Sitio" />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer companyName='Redentor Colchões' />
    </div>
  );
}

export default App;