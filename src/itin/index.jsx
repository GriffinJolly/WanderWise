import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Star, Calendar, Users, Wallet, Clock } from 'lucide-react';

const TravelScreenshot = () => {
  const hotels = [
    { 
      name: "The Taj Mahal Palace", 
      stars: 5, 
      price: "$300-500 per night",
      image: "/hotel1.png"
    },
    { 
      name: "JW Marriot Mumbai Sahar", 
      stars: 4.5, 
      price: "$400-600 per night",
      image: "/hotel2.jpg"
    },
    { 
      name: "The Taj Land's End", 
      stars: 5, 
      price: "$500-800 per night",
      image: "/hotel3.jpg"
    },
    { 
      name: "Trident Hotel Bandra Kurla", 
      stars: 5, 
      price: "$250-380 per night",
      image: "/hotel4.jpg"
    }
  ];

  return (
    <ScrollArea className="w-screen h-screen bg-[#E4E0E1]">
      <div>
        <div className="relative">
          <img 
            src="/gateway.jpg" 
            alt="Taj Mahal" 
            className="w-full h-[607px] object-cover brightness-90"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#493628]/90 to-transparent h-32" />
        </div>

        <div className="p-8 bg-[#D6C0B3]">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-6 h-6 text-[#493628]" />
            <h2 className="text-3xl font-bold text-[#493628]">Mumbai, India</h2>
          </div>
          <div className="flex space-x-4 mt-2">
            <div className="flex items-center space-x-2 bg-[#AB886D] px-4 py-2 rounded-full text-white">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">3 days</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#AB886D] px-4 py-2 rounded-full text-white">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">₹85,000</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#AB886D] px-4 py-2 rounded-full text-white">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">3 People</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-[#493628] mb-6">Hotel Recommendations</h3>
          <div className="grid grid-cols-2 gap-6">
            {hotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-[266px] object-cover"
                />
                <div className="p-4 bg-[#D6C0B3]">
                  <h4 className="font-semibold text-[#493628] text-lg mb-2">{hotel.name}</h4>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(Math.floor(hotel.stars))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#AB886D] text-[#AB886D]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#493628]">{hotel.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-[#D6C0B3]">
          <h3 className="text-2xl font-bold text-[#493628] mb-6">Your Itinerary</h3>
          <div className="space-y-4">
            {[
              { time: "10:00 AM - 12:00 PM", name: "High Roller Observation Wheel", description: "A massive observation wheel offering panoramic views" },
              { time: "12:00 PM - 2:00 PM", name: "The LINQ Promenade", description: "Shopping and dining area with various attractions" },
              { time: "2:00 PM - 4:00 PM", name: "Bellagio Conservatory & Botanical Garden", description: "A stunning botanical display that changes with seasons" },
              { time: "4:00 PM - 6:00 PM", name: "The Venetian and The Palazzo", description: "Explore these iconic Las Vegas resorts" }
            ].map((event, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-[#AB886D] mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-[#AB886D] mb-1">{event.time}</p>
                    <h4 className="font-medium text-[#493628] mb-1">{event.name}</h4>
                    <p className="text-sm text-[#493628]/80">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TravelScreenshot;