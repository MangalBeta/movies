import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './Component/Navigation.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from "../src/Component/HomePage";
import SingleMovie from "./Component/SingleMovie";

function App() {
    return (
        <Router>
        <Navigation />
        <Container fluid className="p-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
          </Routes>
        </Container>
      </Router>
    );
}

export default App;
