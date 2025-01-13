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

export const deleteAffiliate = async (id: string) => {
  await affiliateCollection.doc(id).delete();
};
