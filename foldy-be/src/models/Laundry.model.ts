import { firestore } from '../config/firebase';

interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface Slogan {
  title: string;
  subtitle: string;
}

interface PayoutInfo {
  bankName: string;
  bankCode: string;
  recipientName: string;
  accountNumber: string;
  paypalId: string;
  upiId: string;
}

interface Laundry {
  id: string;
  affiliateId: string;
  name: string;
  logo: string;
  coverImage: string;
  rating: number;
  certificateCode: string;
  mobileNumber: string;
  slogan: Slogan;
  businessAddress: string;
  pincode: string;
  landmark: string;
  geoLocations: GeoLocation[];
  serviceAreas: string[];
  openingHours: {
    day: string;
    timeSlots: {
      start: string;
      end: string;
    }[];
  }[];
  tags: string[];
  shortDescription: string;
  cancelPolicy: string;
  serviceChargeType: string;
  storeCharge: number;
  minOrderPrice: number;
  payoutInfo: PayoutInfo;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const laundryCollection = firestore.collection('laundries');

export const createLaundry = async (laundry: Laundry) => {
  const timestamp = new Date().toISOString();
  laundry.createdAt = timestamp;
  laundry.updatedAt = timestamp;
  const docRef = await laundryCollection.add(laundry);
  return docRef.id;
};

export const getLaundryById = async (id: string) => {
  const doc = await laundryCollection.doc(id).get();
  return doc.exists ? (doc.data() as Laundry) : null;
};

export const updateLaundry = async (id: string, laundry: Partial<Laundry>) => {
  laundry.updatedAt = new Date().toISOString();
  await laundryCollection.doc(id).update(laundry);
};

export const deleteLaundry = async (id: string) => {
  await laundryCollection.doc(id).delete();
};
