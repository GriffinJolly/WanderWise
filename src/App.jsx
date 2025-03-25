import { Routes, Route } from 'react-router-dom';
import Hero from './components/custom/Hero';
import CreateTrip from './create-trip';
import Itin from './itin';
import Header from './components/custom/Header';
import MyTrips from './components/custom/MyTrips';

function App() {
  return (
    <div style={{ backgroundColor: "#feeeee", minHeight: "100vh", margin: 0, fontFamily: "Arial, sans-serif" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/itin" element={<Itin />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </div>
  );
}

export default App;
