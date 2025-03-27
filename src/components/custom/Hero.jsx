import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';

function Hero() {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const initializeAutocomplete = () => {
      try {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['(cities)'],
          componentRestrictions: { country: 'in' },
          fields: ['name', 'formatted_address']
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place) {
            setDestination(place.formatted_address || place.name);
          }
        });

        const keydownListener = (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        };

        inputRef.current.addEventListener('keydown', keydownListener);

        return () => {
          if (autocomplete) {
            google.maps.event.clearListeners(autocomplete, 'place_changed');
          }
          inputRef.current?.removeEventListener('keydown', keydownListener);
        };
      } catch (error) {
        console.error('Error initializing autocomplete:', error);
      }
    };

    if (window.google && window.google.maps) {
      initializeAutocomplete();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.addEventListener('load', initializeAutocomplete);
      document.head.appendChild(script);

      return () => {
        script.removeEventListener('load', initializeAutocomplete);
        document.head.removeChild(script);
      };
    }
  }, []);

  // ... (rest of the component remains the same)
}

export default Hero;