import { firestore } from '../config/firebase';

interface User {
  id: string;
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

export const createUser = async (user: User) => {
  const timestamp = new Date().toISOString();
  user.createdAt = timestamp;
  user.updatedAt = timestamp;
  const docRef = await userCollection.add(user);
  return docRef.id;
};

export const getUserById = async (id: string) => {
  const doc = await userCollection.doc(id).get();
  return doc.exists ? (doc.data() as User) : null;
};

export const updateUser = async (id: string, user: Partial<User>) => {
  user.updatedAt = new Date().toISOString();
  await userCollection.doc(id).update(user);
};

export const deleteUser = async (id: string) => {
  await userCollection.doc(id).delete();
};
