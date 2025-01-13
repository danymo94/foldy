import { firestore } from '../config/firebase';

interface ProductAttribute {
  id: string;
  laundryId: string;
  name: string;
  description: string;
  defaultPrice: number;
  defaultTime: number;
  createdAt: string;
  updatedAt: string;
}

const productAttributeCollection = firestore.collection('productAttributes');

export const createProductAttribute = async (productAttribute: ProductAttribute) => {
  const timestamp = new Date().toISOString();
  productAttribute.createdAt = timestamp;
  productAttribute.updatedAt = timestamp;
  const docRef = await productAttributeCollection.add(productAttribute);
  return docRef.id;
};

export const getProductAttributeById = async (id: string) => {
  const doc = await productAttributeCollection.doc(id).get();
  return doc.exists ? (doc.data() as ProductAttribute) : null;
};

export const updateProductAttribute = async (id: string, productAttribute: Partial<ProductAttribute>) => {
  productAttribute.updatedAt = new Date().toISOString();
  await productAttributeCollection.doc(id).update(productAttribute);
};

export const deleteProductAttribute = async (id: string) => {
  await productAttributeCollection.doc(id).delete();
};
