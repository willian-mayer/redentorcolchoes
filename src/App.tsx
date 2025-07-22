import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import SobreNos from './pages/SobreNos';
import ColchoesList from './components/ColchoesList';

function App() {
  return (
    <div className="">
      <Navbar title="Redentor Colchões" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/colchoes/:category" element={<ColchoesList />} />
        <Route path='/sobre-nos' element={<SobreNos />}/>
        <Route path='/contato' element={<Contact />} />
      </Routes>
      <Footer companyName='Redentor Colchões' />
    </div>
  );
}

export default App;