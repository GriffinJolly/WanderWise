import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Wallet } from 'lucide-react';

const CreateTrip = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    days: 1,
    budget: 1000,
    people: 1,
  });

  const steps = [
    {
      title: 'How many days?',
      description: 'Choose the duration of your adventure',
      icon: <Calendar className="w-6 h-6 text-[#AB886D]" />,
      component: (
        <div className="flex flex-col items-center space-y-6">
          <Slider
            defaultValue={[answers.days]}
            min={1}
            max={20}
            step={1}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, days: Math.round(value[0]) }))}
            className="w-full max-w-sm"
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
          <Slider
            defaultValue={[answers.budget]}
            min={1000}
            max={100000}
            step={1000}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, budget: Math.round(value[0]) }))}
            className="w-full max-w-sm"
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
          <Slider
            defaultValue={[answers.people]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, people: Math.round(value[0]) }))}
            className="w-full max-w-sm"
          />
          <div className="text-3xl font-bold text-[#AB886D]">
            {answers.people} {answers.people === 1 ? 'person' : 'people'}
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-screen min-h-screen items-center justify-center bg-[#E4E0E1] px-4 py-8"
    >
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-[#493628] mr-2" />
          <h2 className="font-bold text-3xl bg-gradient-to-r from-[#493628] to-[#AB886D] bg-clip-text text-transparent">
            Travel preferences
          </h2>
        </div>
        <p className="mt-3 text-[#493628] text-xl text-center font-light">
          Customize your perfect journey
        </p>
        
        <div className="mt-16">
          <div className="mb-8 max-w-md mx-auto">
            <Progress 
              value={progressPercentage} 
              max={100} 
              className="h-2 bg-[#D6C0B3]" 
            />
            <div className="mt-2 text-sm text-[#AB886D] text-right">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <Card className="max-w-md mx-auto shadow-lg border-[#D6C0B3] bg-white">
                <CardHeader className="space-y-2 bg-[#D6C0B3]/20">
                  <div className="flex items-center space-x-3">
                    {steps[currentStep].icon}
                    <CardTitle className="text-2xl font-bold text-[#493628]">
                      {steps[currentStep].title}
                    </CardTitle>
                  </div>
                  <p className="text-[#493628]/70">{steps[currentStep].description}</p>
                </CardHeader>
                <CardContent className="py-8 bg-white">
                  {steps[currentStep].component}
                </CardContent>
                <div className="flex justify-between p-6 bg-[#D6C0B3]/20 rounded-b-lg border-t border-[#D6C0B3]">
                  {currentStep > 0 ? (
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      className="px-6 py-2 border-2 border-[#AB886D] text-[#493628] hover:bg-[#D6C0B3]/20 font-medium transition-colors"
                    >
                      Previous
                    </Button>
                  ) : <div />}
                  
                  {currentStep === steps.length - 1 ? (
                    <Link 
                      to="/itin" 
                      state={{ tripDetails: answers }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="default" 
                          className="px-8 py-2 bg-[#493628] hover:bg-[#AB886D] text-white font-medium transition-colors"
                        >
                          Create Itinerary
                        </Button>
                      </motion.div>
                    </Link>
                  ) : (
                    <Button 
                      variant="default" 
                      onClick={handleNext}
                      className="px-8 py-2 bg-[#493628] hover:bg-[#AB886D] text-white font-medium transition-colors"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateTrip;