import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, Wallet, ArrowRight, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate, useLocation } from 'react-router-dom';
import { tripsService } from '../services/tripsService';
import { auth } from '../service/firebaseConfig';

const API_KEY = "AIzaSyAapFYjM80sNoEQecwVzW-gfHaujskUe8c";

const CreateTrip = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.destination || "India";

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    days: 3,
    budget: 50000,
    people: 2,
  });
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleCreateTrip();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSliderChange = (value, field) => {
    setAnswers(prev => ({
      ...prev,
      [field]: Math.round(value)
    }));
  };

  const steps = [
    {
      title: 'How many days?',
      description: 'Choose the duration of your adventure',
      icon: <Calendar className="w-6 h-6 text-[#AB886D]" />,
      component: (
        <div className="flex flex-col items-center space-y-6">
          <input
            type="range"
            min="1"
            max="20"
            value={answers.days}
            onChange={(e) => handleSliderChange(e.target.value, 'days')}
            className="w-full max-w-sm h-2 bg-[#D6C0B3] rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-3xl font-bold text-[#AB886D]">
            {answers.days} {answers.days === 1 ? 'day' : 'days'}
          </div>
        </div>
      ),
    },
    {
      title: "What's your budget?",
      description: 'Set your comfortable spending limit',
      icon: <Wallet className="w-6 h-6 text-[#AB886D]" />,
      component: (
        <div className="flex flex-col items-center space-y-6">
          <input
            type="range"
            min="10000"
            max="500000"
            step="5000"
            value={answers.budget}
            onChange={(e) => handleSliderChange(e.target.value, 'budget')}
            className="w-full max-w-sm h-2 bg-[#D6C0B3] rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-3xl font-bold text-[#AB886D]">
            ₹{answers.budget.toLocaleString('en-IN')}
          </div>
        </div>
      ),
    },
    {
      title: 'How many people?',
      description: 'Select the number of travelers',
      icon: <Users className="w-6 h-6 text-[#AB886D]" />,
      component: (
        <div className="flex flex-col items-center space-y-6">
          <input
            type="range"
            min="1"
            max="10"
            value={answers.people}
            onChange={(e) => handleSliderChange(e.target.value, 'people')}
            className="w-full max-w-sm h-2 bg-[#D6C0B3] rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-3xl font-bold text-[#AB886D]">
            {answers.people} {answers.people === 1 ? 'person' : 'people'}
          </div>
        </div>
      ),
    },
  ];

  const handleCreateTrip = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const prompt = `Create a detailed ${answers.days}-day travel itinerary for ${destination} for ${answers.people} people with a budget of ₹${answers.budget}. 
      Include:
      - Day-wise breakdown
      - Recommended accommodations within budget
      - Popular tourist attractions
      - Local dining recommendations
      - Travel tips and cultural notes
      Format with clear day headers and categorized activities.`;

      const result = await model.generateContent(prompt);
      const tripData = result.response.text();

      // Use Firebase auth user ID
      if (auth.currentUser) {
        const tripDetails = {
          destination,
          tripData,
          answers
        };
        
        await tripsService.createTrip(tripDetails, auth.currentUser.uid);
      }

      navigate('/itin', { state: { destination, tripData, answers } });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create trip plan. Please try again.");
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#E4E0E1] to-[#D6C0B3] py-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-white/30 rounded-full mb-4">
            <MapPin className="w-8 h-8 text-[#493628]" />
          </div>
          <h2 className="text-4xl font-bold text-[#493628]">
            Plan Your Trip to {destination}
          </h2>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6"
        >
          <Progress 
            value={((currentStep + 1) / steps.length) * 100} 
            className="h-2 mb-8" 
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="mb-8"
            >
              <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="space-y-2">
                  <div className="flex items-center space-x-3">
                    {steps[currentStep].icon}
                    <CardTitle className="text-2xl font-bold text-[#493628]">
                      {steps[currentStep].title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600">{steps[currentStep].description}</p>
                </CardHeader>
                <CardContent className="py-8">
                  {steps[currentStep].component}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="bg-white hover:bg-gray-100"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={loading}
              className="bg-[#493628] hover:bg-[#AB886D] text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Trip...
                </>
              ) : (
                <>
                  {currentStep === steps.length - 1 ? 'Create Trip' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateTrip;
