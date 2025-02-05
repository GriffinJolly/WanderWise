import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <ScrollArea className="w-screen h-screen">
      <div>
        <img 
          src="/gateway.jpg" 
          alt="Taj Mahal" 
          className="w-full h-[607px] object-cover"
        />

        <div className="p-4 bg-blue-50">
          <h2 className="text-2xl font-bold">Mumbai, India</h2>
          <div className="flex space-x-2 mt-2">
            <span className="bg-blue-100 px-2 py-1 rounded text-sm">3 days</span>
            <span className="bg-blue-100 px-2 py-1 rounded text-sm">₹85,000</span>
            <span className="bg-blue-100 px-2 py-1 rounded text-sm">3 People</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4">Hotel Recommendations</h3>
          <div className="grid grid-cols-2 gap-4">
            {hotels.map((hotel, index) => (
              <div key={index} className="border rounded p-2">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-[266px] object-cover rounded mb-2"
                />
                <h4 className="font-medium text-sm">{hotel.name}</h4>
                <p className="text-xs text-gray-600">{hotel.stars} stars</p>
                <p className="text-xs text-gray-600">{hotel.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Your Itinerary</h3>
          <div className="space-y-4">
            {[
              { time: "10:00 AM - 12:00 PM", name: "High Roller Observation Wheel", description: "A massive observation wheel offering panoramic views" },
              { time: "12:00 PM - 2:00 PM", name: "The LINQ Promenade", description: "Shopping and dining area with various attractions" },
              { time: "2:00 PM - 4:00 PM", name: "Bellagio Conservatory & Botanical Garden", description: "A stunning botanical display that changes with seasons" },
              { time: "4:00 PM - 6:00 PM", name: "The Venetian and The Palazzo", description: "Explore these iconic Las Vegas resorts" }
            ].map((event, index) => (
              <div key={index} className="bg-white border rounded p-3">
                <p className="text-sm font-semibold text-blue-600">{event.time}</p>
                <h4 className="font-medium">{event.name}</h4>
                <p className="text-xs text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TravelScreenshot;