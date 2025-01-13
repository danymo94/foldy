import { firestore } from '../config/firebase';

interface Benefits {
  discountPercentage: number;
  freeDelivery: boolean;
  prioritySupport: boolean;
}

interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  benefits: Benefits;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const subscriptionCollection = firestore.collection('subscriptions');

export const createSubscription = async (subscription: Subscription) => {
  const timestamp = new Date().toISOString();
  subscription.createdAt = timestamp;
  subscription.updatedAt = timestamp;
  const docRef = await subscriptionCollection.add(subscription);
  return docRef.id;
};

export const getSubscriptionById = async (id: string) => {
  const doc = await subscriptionCollection.doc(id).get();
  return doc.exists ? (doc.data() as Subscription) : null;
};

export const updateSubscription = async (id: string, subscription: Partial<Subscription>) => {
  subscription.updatedAt = new Date().toISOString();
  await subscriptionCollection.doc(id).update(subscription);
};

export const deleteSubscription = async (id: string) => {
  await subscriptionCollection.doc(id).delete();
};
