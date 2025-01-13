import { firestore } from '../config/firebase';

interface Category {
  id: string;
  laundryId: string;
  name: string;
  description: string;
  published: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const categoryCollection = firestore.collection('categories');

export const createCategory = async (category: Category) => {
  const timestamp = new Date().toISOString();
  category.createdAt = timestamp;
  category.updatedAt = timestamp;
  const docRef = await categoryCollection.add(category);
  return docRef.id;
};

export const getCategoryById = async (id: string) => {
  const doc = await categoryCollection.doc(id).get();
  return doc.exists ? (doc.data() as Category) : null;
};

export const updateCategory = async (id: string, category: Partial<Category>) => {
  category.updatedAt = new Date().toISOString();
  await categoryCollection.doc(id).update(category);
};

export const deleteCategory = async (id: string) => {
  await categoryCollection.doc(id).delete();
};
