import { firestore } from '../config/firebase';

interface Product {
  id: string;
  laundryId: string;
  name: string;
  price: number;
  discount: number;
  published: boolean;
  image: string;
  categoryIds: string[];
  createdAt: string;
  updatedAt: string;
}

const productCollection = firestore.collection('products');

export const createProduct = async (product: Product) => {
  const timestamp = new Date().toISOString();
  product.createdAt = timestamp;
  product.updatedAt = timestamp;
  const docRef = await productCollection.add(product);
  return docRef.id;
};

export const getProductById = async (id: string) => {
  const doc = await productCollection.doc(id).get();
  return doc.exists ? (doc.data() as Product) : null;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  product.updatedAt = new Date().toISOString();
  await productCollection.doc(id).update(product);
};

export const deleteProduct = async (id: string) => {
  await productCollection.doc(id).delete();
};
