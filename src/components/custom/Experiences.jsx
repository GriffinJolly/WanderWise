import React, { useState } from 'react';
import { Heart, MapPin, Share2, MessageCircle } from 'lucide-react';

// Sample data for tourist spots
const tourSpots = [
  {
    id: 1,
    location: 'Taj Mahal, Agra',
    image: "agra.jpg",
    likes: 1256,
    description: "The eternal symbol of love, standing majestically in white marble.",
    comments: 42
  },
  {
    id: 2,
    location: 'Jaipur, Rajasthan',
    image: "jaipur.jpg",
    likes: 987,
    description: "The Pink City, where history and culture come alive in every street.",
    comments: 35
  },
  {
    id: 3,
    location: 'Kerala Backwaters',
    image: "kerala.jpg",
    likes: 1543,
    description: "Serene waters, lush greenery, and traditional houseboats.",
    comments: 67
  },
  {
    id: 4,
    location: 'Ladakh, Jammu and Kashmir',
    image: "ladakh.jpg",
    likes: 1122,
    description: "Breathtaking mountain landscapes and Buddhist monasteries.",
    comments: 53
  }
];

const TravelPost = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl mb-6">
      {/* Post Header */}
      <div className="flex items-center p-4 bg-[#E4E0E1]">
        <MapPin className="text-[#493628] mr-2" size={20} />
        <h3 className="text-[#493628] font-semibold">{post.location}</h3>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.location} 
          className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 transform transition-transform hover:scale-110"
            >
              <Heart 
                className={`${liked ? 'text-red-500 fill-current' : 'text-[#ffffff]'}`} 
                size={24} 
              />
              <span className="text-[#ffffff]">{likes}</span>
            </button>
            <button className="text-[#fafafa] hover:text-[#AB886D] transform transition-transform hover:scale-110">
              <MessageCircle size={24} />
              <span className="ml-1">{post.comments}</span>
            </button>
          </div>
          <button className="text-[#ffffff] hover:text-[#AB886D] transform transition-transform hover:scale-110">
            <Share2 size={24} />
          </button>
        </div>

        {/* Description */}
        <p className="text-[#493628] text-sm">
          {post.description}
        </p>
      </div>
    </div>
  );
};

const Experiences = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4E0E1] to-[#D6C0B3] py-8">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-3xl font-bold text-[#493628] text-center mb-8">
          Exper<span className="text-[#AB886D]">iences</span>
        </h1>
        
        {tourSpots.map(post => (
          <TravelPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Experiences;