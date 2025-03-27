import { Routes, Route } from 'react-router-dom';
import Hero from './components/custom/Hero';
import CreateTrip from './create-trip';
import Itin from './itin';
import Header from './components/custom/Header';
import MyTrips from './components/custom/MyTrips';
import Destinations from './components/custom/Destinations';
import Experiences from './components/custom/Experiences';
import AboutUs from './components/custom/AboutUs';
function App() {
  return (
    <div style={{ backgroundColor: "#feeeee", minHeight: "100vh", margin: 0, fontFamily: "Arial, sans-serif" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/itin" element={<Itin />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
