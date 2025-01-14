import { firestore } from '../config/firebase';

interface Affiliate {
  userId: string;
  vatNumber: string;
  companyName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  website: string;
  commissionRate: number;
  fixedFee: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const affiliateCollection = firestore.collection('affiliates');

export const createAffiliate = async (affiliate: Affiliate) => {
  const timestamp = new Date().toISOString();
  affiliate.createdAt = timestamp;
  affiliate.updatedAt = timestamp;
  const docRef = await affiliateCollection.add(affiliate);
  return docRef.id;
};

export const getAffiliateById = async (id: string) => {
  const doc = await affiliateCollection.doc(id).get();
  return doc.exists ? (doc.data() as Affiliate) : null;
};

export const updateAffiliate = async (id: string, affiliate: Partial<Affiliate>) => {
  affiliate.updatedAt = new Date().toISOString();
  await affiliateCollection.doc(id).update(affiliate);
};

export const updateAffiliateByUserId = async (userId: string, affiliate: Partial<Affiliate>) => {
  const querySnapshot = await affiliateCollection.where('userId', '==', userId).get();
  if (querySnapshot.empty) {
    throw new Error(`No Affiliate found with userId: ${userId}`);
  }
  const doc = querySnapshot.docs[0];
  affiliate.updatedAt = new Date().toISOString();
  await affiliateCollection.doc(doc.id).update(affiliate);
};

export const deleteAffiliate = async (id: string) => {
  await affiliateCollection.doc(id).delete();
};

export const getAffiliateByUserId = async (userId: string) => {
  const querySnapshot = await affiliateCollection.where('userId', '==', userId).get();
  if (querySnapshot.empty) {
    return null;
  }
  const doc = querySnapshot.docs[0];
  return doc.data() as Affiliate;
};

export const getAllAffiliates = async () => {
  const querySnapshot = await affiliateCollection.get();
  return querySnapshot.docs.map(doc => doc.data() as Affiliate);
};
