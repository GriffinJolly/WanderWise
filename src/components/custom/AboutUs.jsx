import React from 'react';
import { Globe, Map, Users } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: <Globe size={48} className="text-[#493628]" />,
      title: "Authentic Experiences",
      description: "We craft journeys that go beyond typical tourist trails, revealing the true essence of India."
    },
    {
      icon: <Map size={48} className="text-[#493628]" />,
      title: "Personalized Itineraries",
      description: "Every traveler is unique. We design trips that match your interests, pace, and dreams."
    },
    {
      icon: <Users size={48} className="text-[#493628]" />,
      title: "Local Connections",
      description: "Our deep local network ensures you experience India through the eyes of those who know it best."
    }
  ];

  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-br from-[#E4E0E1] to-[#D6C0B3]">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col justify-center">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className='text-4xl md:text-5xl font-bold text-[#493628] leading-tight mb-6'>
            <span className='text-[#AB886D]'>Discover</span> India, 
            <br />Differently
          </h1>
          <p className='text-lg md:text-xl text-[#493628]/80 max-w-3xl mx-auto'>
            We're not just a travel company. We're storytellers, cultural bridge-builders, 
            and passionate explorers dedicated to unveiling the magical tapestry of India.
          </p>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-3xl font-bold text-[#493628] text-center mb-12">
            Our <span className="text-[#AB886D]">Core Values</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 text-center 
                border-2 border-[#AB886D] 
                shadow-lg transform transition-all duration-300 
                hover:scale-105 hover:shadow-xl 
                focus:outline-none focus:ring-2 focus:ring-[#AB886D]"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#493628] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#493628]/80">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;