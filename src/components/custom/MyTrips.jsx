import React, { useEffect, useState } from 'react';
import { tripsService } from '../../services/tripsService';
import { motion } from 'framer-motion';
import { Calendar, Users, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth } from '../../service/firebaseConfig';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        if (auth.currentUser) {
          const userTrips = await tripsService.getUserTrips(auth.currentUser.uid);
          setTrips(userTrips);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4E0E1] to-[#D6C0B3] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#493628] mb-8">My Trips</h1>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#493628] mb-4">
                    {trip.destination}
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center text-[#AB886D]">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{trip.days} days</span>
                    </div>
                    <div className="flex items-center text-[#AB886D]">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{trip.people} people</span>
                    </div>
                    <div className="flex items-center text-[#AB886D]">
                      <Wallet className="w-4 h-4 mr-2" />
                      <span>₹{trip.budget.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <Link
                    to="/itin"
                    state={{ 
                      destination: trip.destination,
                      tripData: trip.itinerary,
                      answers: {
                        days: trip.days,
                        budget: trip.budget,
                        people: trip.people
                      }
                    }}
                    className="mt-4 inline-block bg-[#493628] text-white px-4 py-2 rounded-lg hover:bg-[#AB886D] transition-colors"
                  >
                    View Trip
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips; 