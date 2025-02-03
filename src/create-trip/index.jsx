import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const CreateTrip = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    days: 1,
    budget: 1000,
    people: 1,
  });

  const steps = [
    {
      title: 'How many days are you thinking of for this trip?',
      component: (
        <div className="flex flex-col items-center">
          <Slider
            defaultValue={[answers.days]}
            min={1}
            max={20}
            step={1}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, days: Math.round(value[0]) }))}
          />
          <div className="mt-4 text-blue-600 font-medium">
            {answers.days} days
          </div>
        </div>
      ),
    },
    {
      title: "What's your budget?",
      component: (
        <div className="flex flex-col items-center">
          <Slider
            defaultValue={[answers.budget]}
            min={1000}
            max={100000}
            step={1000}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, budget: Math.round(value[0]) }))}
          />
          <div className="mt-4 text-blue-600 font-medium">
            ₹{answers.budget.toLocaleString('en-IN')}
          </div>
        </div>
      ),
    },
    {
      title: 'How many people are joining?',
      component: (
        <div className="flex flex-col items-center">
          <Slider
            defaultValue={[answers.people]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, people: Math.round(value[0]) }))}
          />
          <div className="mt-4 text-blue-600 font-medium">
            {answers.people}
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDone = () => {
    console.log('Final answers:', answers);
  };

  return (
    <div className="flex justify-end h-screen pt-10 pr-10">
      <div className="w-full max-w-2xl">
        <h2 className="font-bold text-2xl">Tell us about your travel preferences</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Provide some basic information, and our trip planner will generate a customized itinerary.
        </p>

        <div className="mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {steps[currentStep].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  {steps[currentStep].component}

                  <div className="flex justify-between mt-8">
                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Previous
                      </Button>
                    )}
                    {currentStep === steps.length - 1 ? (
                      <Button
                        variant="default"
                        onClick={handleDone}
                        className="px-6 py-2 rounded text-white bg-green-600 hover:bg-green-700"
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={handleNext}
                        className="px-6 py-2 rounded text-white bg-gray-900 hover:bg-gray-800"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;