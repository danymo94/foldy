import { firestore } from '../config/firebase';

interface User {
  id?: string;
  email: string;
  passwordHash: string;
  role: 'MASTER_ADMIN' | 'AFFILIATE' | 'CUSTOMER';
  fullName: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const userCollection = firestore.collection('users');

export const createUser = async (user: User): Promise<string> => {
  const timestamp = new Date().toISOString();
  user.createdAt = timestamp;
  user.updatedAt = timestamp;
  const docRef = await userCollection.add(user);
  return docRef.id;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const doc = await userCollection.doc(id).get();
  return doc.exists ? (doc.data() as User) : null;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<void> => {
  user.updatedAt = new Date().toISOString();
  await userCollection.doc(id).update(user);
};

export const deleteUser = async (id: string): Promise<void> => {
  await userCollection.doc(id).delete();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const querySnapshot = await userCollection.where('email', '==', email).get();
  if (querySnapshot.empty) {
    return null;
  }
  const doc = querySnapshot.docs[0];
  return doc.exists ? (doc.data() as User) : null;
};
