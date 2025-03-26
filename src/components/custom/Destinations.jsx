import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Loader2 } from 'lucide-react';
import { tripsService } from '../../services/tripsService';
import { auth } from '../../service/firebaseConfig';

const popularDestinations = [
  {
    name: 'Goa',
    description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80'
  },
  {
    name: 'Jaipur',
    description: 'The Pink City with majestic palaces and rich cultural heritage',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80'
  },
  {
    name: 'Kerala',
    description: 'Serene backwaters, lush greenery, and Ayurvedic traditions',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80'
  },
  {
    name: 'Varanasi',
    description: 'Ancient spiritual city on the banks of the holy Ganges',
    imageUrl: 'https://images.unsplash.com/photo-1567501190434-86c911d1590b?auto=format&fit=crop&q=80'
  },
  {
    name: 'Agra',
    description: 'Home to the iconic Taj Mahal and Mughal architecture',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80'
  },
  {
    name: 'Mumbai',
    description: 'The city of dreams with bustling streets and colonial architecture',
    imageUrl: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80'
  },
  {
    name: 'Ladakh',
    description: 'Breathtaking mountain landscapes and Buddhist monasteries',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80'
  },
  {
    name: 'Shimla',
    description: 'Queen of Hills with colonial charm and snow-capped Himalayas',
    imageUrl: 'https://images.unsplash.com/photo-1566396514787-a727115af697?auto=format&fit=crop&q=80'
  },
  {
    name: 'Bangalore',
    description: 'Silicon Valley of India with pleasant weather and modern lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80'
  }
];

const DestinationCard = ({ destination, onClick, existingTrip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <div className="aspect-[4/3]">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="absolute bottom-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {destination.name}
              {existingTrip && (
                <span className="ml-2 text-sm bg-amber-500 px-2 py-1 rounded-full">
                  Previous Trip
                </span>
              )}
            </h3>
            <p className="text-white/90">{destination.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Destinations = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [previousTrips, setPreviousTrips] = useState([]);

  useEffect(() => {
    const fetchPreviousTrips = async () => {
      if (auth.currentUser) {
        try {
          const trips = await tripsService.getUserTrips(auth.currentUser.uid);
          setPreviousTrips(trips.map(trip => trip.destination));
        } catch (error) {
          console.error('Error fetching trips:', error);
        }
      }
      setLoading(false);
    };

    fetchPreviousTrips();
  }, []);

  const handleDestinationClick = (destination) => {
    const existingTrip = previousTrips.includes(destination.name);
    if (existingTrip) {
      // Navigate to existing trip
      navigate('/my-trips', { 
        state: { 
          highlightDestination: destination.name 
        } 
      });
    } else {
      // Create new trip
      navigate('/create-trip', { 
        state: { 
          destination: destination.name
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E4E0E1] to-[#D6C0B3] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#493628]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4E0E1] to-[#D6C0B3] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#493628] mb-4">
            Popular Destinations
          </h1>
          <p className="text-lg text-[#493628]/80">
            Discover India's most enchanting locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DestinationCard
                destination={destination}
                onClick={() => handleDestinationClick(destination)}
                existingTrip={previousTrips.includes(destination.name)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations; 