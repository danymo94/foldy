import { firestore } from '../config/firebase';

interface TimeSlot {
  id: string;
  laundryId: string;
  startTime: string;
  endTime: string;
  maxOrders: number;
  discountPercentage: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const timeSlotCollection = firestore.collection('timeSlots');

export const createTimeSlot = async (timeSlot: TimeSlot) => {
  const timestamp = new Date().toISOString();
  timeSlot.createdAt = timestamp;
  timeSlot.updatedAt = timestamp;
  const docRef = await timeSlotCollection.add(timeSlot);
  return docRef.id;
};

export const getTimeSlotById = async (id: string) => {
  const doc = await timeSlotCollection.doc(id).get();
  return doc.exists ? (doc.data() as TimeSlot) : null;
};

export const updateTimeSlot = async (id: string, timeSlot: Partial<TimeSlot>) => {
  timeSlot.updatedAt = new Date().toISOString();
  await timeSlotCollection.doc(id).update(timeSlot);
};

export const deleteTimeSlot = async (id: string) => {
  await timeSlotCollection.doc(id).delete();
};
