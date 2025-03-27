import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, Wallet, ArrowRight, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate, useLocation } from 'react-router-dom';
import { tripsService } from '../services/tripsService';
import { auth } from '../service/firebaseConfig';

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
    // ... (previous steps code remains the same)
  ];

  const handleCreateTrip = async () => {
    setLoading(true);
    try {
      // Use environment variable for API key
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
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

  // ... (rest of the component remains the same)
};

export default CreateTrip;