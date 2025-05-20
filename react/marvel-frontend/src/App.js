import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import CharactersList from './pages/CharactersList';
import CharacterDetail from './pages/CharacterDetail';
import CharacterForm from './pages/CharacterForm';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/characters/new" element={<CharacterForm />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/characters/:id/edit" element={<CharacterForm editMode={true} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
