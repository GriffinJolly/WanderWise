import { db } from '../service/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const tripsService = {
  async createTrip(tripData, userId) {
    try {
      const tripsRef = collection(db, 'trips');
      const newTrip = {
        destination: tripData.destination,
        itinerary: tripData.tripData,
        days: tripData.answers.days,
        budget: tripData.answers.budget,
        people: tripData.answers.people,
        userId,
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(tripsRef, newTrip);
      return { id: docRef.id, ...newTrip };
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  async getUserTrips(userId) {
    try {
      const tripsRef = collection(db, 'trips');
      const q = query(tripsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching trips:', error);
      throw error;
    }
  }
}; 