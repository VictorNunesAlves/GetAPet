import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


/* layout*/
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

/* pages */
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Container from './components/layout/Container';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/" element={<Home />} exact />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
