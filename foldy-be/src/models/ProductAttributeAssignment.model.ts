import { firestore } from '../config/firebase';

interface ProductAttributeAssignment {
  id: string;
  productId: string;
  laundryId: string;
  attributeId: string;
  customPrice: number;
  customTime: number;
  discount: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const productAttributeAssignmentCollection = firestore.collection('productAttributeAssignments');

export const createProductAttributeAssignment = async (assignment: ProductAttributeAssignment) => {
  const timestamp = new Date().toISOString();
  assignment.createdAt = timestamp;
  assignment.updatedAt = timestamp;
  const docRef = await productAttributeAssignmentCollection.add(assignment);
  return docRef.id;
};

export const getProductAttributeAssignmentById = async (id: string) => {
  const doc = await productAttributeAssignmentCollection.doc(id).get();
  return doc.exists ? (doc.data() as ProductAttributeAssignment) : null;
};

export const updateProductAttributeAssignment = async (id: string, assignment: Partial<ProductAttributeAssignment>) => {
  assignment.updatedAt = new Date().toISOString();
  await productAttributeAssignmentCollection.doc(id).update(assignment);
};

export const deleteProductAttributeAssignment = async (id: string) => {
  await productAttributeAssignmentCollection.doc(id).delete();
};
