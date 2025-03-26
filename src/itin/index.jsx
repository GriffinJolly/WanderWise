import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, Plane, Map, Hotel, Coffee, Utensils, Sun, 
  Sunset, Moon, Info, AlertCircle, ChefHat, Lightbulb, BookOpen, Users, Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

const Itinerary = () => {
  const location = useLocation();
  const { destination, tripData, answers } = location.state || { 
    destination: "Bangalore",
    tripData: "Day 1:\n## Bangalore Travel Itinerary (5 Days/4 Nights)\n\nDay 1:\nThis itinerary balances historical exploration, cultural experiences, vibrant nightlife, and the natural beauty surrounding Bangalore. It's designed to be flexible, allowing you to adjust based on your interests and pace.\n\nDay 1:\n**Accommodation:** Choose based on your budget and preferred location. Options range from budget-friendly hostels (Zostel, The Hosteller) to mid-range hotels (The Chancery Pavilion, Lemon Tree Premier) and luxury properties (The Oberoi, ITC Gardenia). Consider staying near MG Road or Indiranagar for easy access to attractions and nightlife.",
    answers: {
      days: 5,
      budget: 50000,
      people: 2
    }
  };

  const extractDurationFromText = (text) => {
    const durationMatch = text.match(/\((\d+)\s*Days/i);
    return durationMatch ? parseInt(durationMatch[1]) : 5;  // Default to 5 if not found
  };

  const duration = extractDurationFromText(tripData);

  // Parse itinerary text into structured data with error handling
  const parseDays = (text) => {
    try {
      // Split by "Day X:" pattern
      const dayPattern = /Day\s+\d+:/gi;
      const dayMatches = [...text.matchAll(dayPattern)];
      
      if (dayMatches.length === 0) {
        return [{ dayNum: 1, activities: [text] }];
      }
      
      const days = [];
      
      // Process each day section
      for (let i = 0; i < dayMatches.length; i++) {
        const currentMatch = dayMatches[i];
        const nextMatch = dayMatches[i + 1];
        
        const startIndex = currentMatch.index;
        const endIndex = nextMatch ? nextMatch.index : text.length;
        
        const daySection = text.substring(startIndex, endIndex);
        const dayHeader = daySection.match(/Day\s+(\d+):/i);
        const dayNum = dayHeader ? parseInt(dayHeader[1]) : i + 1;
        
        // Get content after the "Day X:" header
        const headerEndIndex = daySection.indexOf(':') + 1;
        const content = daySection.substring(headerEndIndex).trim();
        
        // Split content into paragraphs/activities, filtering out empty lines
        const paragraphs = content.split(/\n+/).filter(p => p.trim() !== '').map(p => {
          // Clean up any markdown symbols and fix time labels with asterisks
          let cleanedText = p.replace(/^\*\*|\*\*$|^\#\#|\#|^\*|\*$/g, '').trim();
          // Remove asterisks from time labels like **Morning:**
          cleanedText = cleanedText.replace(/\*\*([\w\s]+):\*\*/g, '$1:');
          return cleanedText;
        });
        
        days.push({ dayNum, activities: paragraphs });
      }
      
      return days;
    } catch (error) {
      console.error("Error parsing trip data:", error);
      // Return a default day if parsing fails
      return [{ dayNum: 1, activities: ["Arrive in Bangalore", "Check in at hotel", "Explore the city"] }];
    }
  };

  const days = parseDays(tripData);

  // Categorize activities into main activities, dining, notes and optional
  const categorizeActivities = (activities) => {
    const result = {
      mainActivities: [],
      dining: [],
      notes: [],
      optional: [],
      accommodation: []
    };

    activities.forEach(activity => {
      const text = String(activity).toLowerCase();
      
      // Extract accommodations
      if (text.includes('accommodation:') || (text.includes('accommodation') && !text.includes('note:')) ||
          text.includes('hotel:') || text.includes('stay at')) {
        result.accommodation.push(activity);
      }
      // Extract any notes (could be implementation notes or general trip notes)
      else if (text.includes('note:') || text.startsWith('note ') || text.includes('tip:')) {
        result.notes.push(activity);
      }
      // Extract dining recommendations
      else if (text.includes('dinner:') || text.includes('lunch:') || text.includes('breakfast:') || 
               text.includes('restaurant') || text.includes('cuisine') || text.includes('eat at') ||
               text.includes('food') || text.includes('dining') || text.includes('café') || 
               text.includes('cafe') || text.includes('coffee')) {
        result.dining.push(activity);
      }
      // Extract optional activities
      else if (text.includes('optional:') || text.includes('alternative:') || 
               text.includes('you can also') || text.includes('alternatively')) {
        result.optional.push(activity);
      }
      // Everything else is a main activity
      else {
        result.mainActivities.push(activity);
      }
    });

    return result;
  };

  // Function to get icon for activity
  const getActivityIcon = (activity) => {
    const text = String(activity).toLowerCase();
    
    // Check for time of day labels
    if (text.startsWith('morning:')) {
      return <Sun className="text-amber-700" />;
    } else if (text.startsWith('afternoon:')) {
      return <Sun className="text-amber-700" />;
    } else if (text.startsWith('evening:')) {
      return <Sunset className="text-amber-700" />;
    } else if (text.startsWith('night:')) {
      return <Moon className="text-amber-700" />;
    } else if (text.startsWith('dinner:') || text.includes('restaurant') || text.includes('cuisine')) {
      return <ChefHat className="text-amber-700" />;
    } else if (text.startsWith('lunch:') || text.startsWith('breakfast:')) {
      return <Utensils className="text-amber-700" />;
    } else if (text.includes('note:') || text.includes('tip:')) {
      return <AlertCircle className="text-amber-700" />;
    } else if (text.includes('optional:') || text.includes('alternative:')) {
      return <Lightbulb className="text-amber-700" />;
    }
    // Then check for activity types
    else if (text.includes('accommodation') || text.includes('hotel') || text.includes('stay') || text.includes('hostel')) {
      return <Hotel className="text-amber-700" />;
    } else if (text.includes('airport') || text.includes('arrive') || text.includes('flight') || text.includes('depart')) {
      return <Plane className="text-amber-700" />;
    } else if (text.includes('café') || text.includes('cafe') || text.includes('coffee')) {
      return <Coffee className="text-amber-700" />;
    } else {
      return <Map className="text-amber-700" />;
    }
  };

  // Format activity text to style time labels differently
  const formatActivityText = (activity) => {
    // Clean up asterisks and bold markers from any part of the text
    let cleanText = String(activity).replace(/\*\*/g, '');
    
    // Look for label patterns like "Morning:" or "Dinner:" at the beginning of the text
    const labelPattern = /^(Morning|Afternoon|Evening|Night|Dinner|Lunch|Breakfast|Note|Optional|Accommodation|Tip):/i;
    const match = cleanText.match(labelPattern);
    
    if (match) {
      const label = match[1];
      const content = cleanText.substring(match[0].length).trim();
      
      return (
        <>
          <span className="font-semibold text-amber-800">{label}: </span>
          <span>{content}</span>
        </>
      );
    }
    
    return cleanText.trim();
  };

  // Helper to render a section with consistent styling
  const renderSection = (title, items, icon, bgColor, borderColor, showIfEmpty = false) => {
    if (!showIfEmpty && items.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h4 className="text-lg font-medium text-amber-800 mb-3 flex items-center">
          {icon}
          {title}
        </h4>
        {items.length > 0 ? (
          <div className={`${bgColor} rounded-lg p-4 border ${borderColor} shadow-sm`}>
            {items.map((item, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <p className="text-gray-700">{formatActivityText(item)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={`${bgColor} rounded-lg p-4 border ${borderColor} shadow-sm text-gray-500 italic text-center`}>
            No {title.toLowerCase()} information available
          </div>
        )}
      </div>
    );
  };

  // Function to determine accommodation type based on budget per person per day
  const getAccommodationType = (budget, days, people) => {
    const perPersonPerDay = budget / (days * people);
    
    if (perPersonPerDay >= 10000) return 'Luxury Hotels';
    if (perPersonPerDay >= 5000) return 'Premium Hotels';
    if (perPersonPerDay >= 2000) return 'Mid-range Hotels';
    return 'Budget Hotels';
  };

  // Get accommodation type based on budget
  const accommodationType = getAccommodationType(
    answers?.budget || 50000,
    answers?.days || 5,
    answers?.people || 2
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-[#D6C0B3]"
    >
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-amber-700 opacity-90"></div>
        <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-10 h-full flex flex-col justify-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Your Trip to {destination}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Discover the magic of your upcoming adventure
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Itinerary */}
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-amber-700 p-6 flex items-center">
                <Calendar className="w-8 h-8 text-white mr-4" />
                <h2 className="text-2xl font-bold text-white">Your Itinerary</h2>
              </div>
              <div className="p-6">
                {days.length > 0 ? (
                  days.map((day, index) => {
                    const categorizedActivities = categorizeActivities(day.activities);
                    
                    return (
                      <div key={index} className={`mb-8 ${index !== days.length - 1 ? "border-b border-amber-100 pb-8" : ""}`}>
                        <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center bg-amber-50 p-3 rounded-lg shadow-sm">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            {day.dayNum}
                          </span>
                          Day {day.dayNum}
                        </h3>
                        
                        {/* Accommodation Section */}
                        {renderSection(
                          "Accommodation", 
                          categorizedActivities.accommodation, 
                          <Hotel className="w-5 h-5 mr-2" />, 
                          "bg-purple-50", 
                          "border-purple-100"
                        )}
                        
                        {/* Main Activities Section */}
                        {categorizedActivities.mainActivities.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-lg font-medium text-amber-800 mb-3 flex items-center">
                              <Map className="w-5 h-5 mr-2" />
                              Main Activities
                            </h4>
                            <div className="space-y-4 pl-4 border-l-2 border-amber-100 mb-6 bg-amber-50 p-4 rounded-r-lg shadow-sm">
                              {categorizedActivities.mainActivities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex items-start mb-4 last:mb-0">
                                  <div className="bg-amber-100 p-1 rounded-full -ml-7 border-2 border-amber-100">
                                    {getActivityIcon(activity)}
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-gray-700">{formatActivityText(activity)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Dining Recommendations */}
                        {renderSection(
                          "Dining Recommendations", 
                          categorizedActivities.dining, 
                          <ChefHat className="w-5 h-5 mr-2" />, 
                          "bg-orange-50", 
                          "border-orange-100"
                        )}
                        
                        {/* Optional Activities */}
                        {renderSection(
                          "Optional Activities", 
                          categorizedActivities.optional, 
                          <Lightbulb className="w-5 h-5 mr-2" />, 
                          "bg-blue-50", 
                          "border-blue-100"
                        )}
                        
                        {/* Travel Notes */}
                        {renderSection(
                          "Travel Notes", 
                          categorizedActivities.notes, 
                          <Info className="w-5 h-5 mr-2" />, 
                          "bg-green-50", 
                          "border-green-100"
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No itinerary data available. Add some activities to your trip!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            {/* Trip Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-[#493628] mb-4">Trip Summary</h3>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{answers?.days || 5} Days</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Travelers</p>
                  <p className="font-medium">{answers?.people || 2} People</p>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Wallet className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">₹{(answers?.budget || 50000).toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Hotel className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Accommodations</p>
                  <p className="font-medium">{accommodationType}</p>
                </div>
              </div>
            </div>

            {/* Weather Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-[#493628] mb-4">Weather Forecast</h3>
              {/* Add weather content */}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Itinerary;