import { firestore } from '../config/firebase';

interface MasterAdmin {
  userId: string;
  companyName: string;
  vatNumber: string;
  fiscalCode: string;
  billingAddress: string;
  billingEmail: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const masterAdminCollection = firestore.collection('masterAdmins');

export const createMasterAdmin = async (masterAdmin: MasterAdmin) => {
  const timestamp = new Date().toISOString();
  masterAdmin.createdAt = timestamp;
  masterAdmin.updatedAt = timestamp;
  const docRef = await masterAdminCollection.add(masterAdmin);
  return docRef.id;
};

export const getMasterAdminById = async (id: string) => {
  const doc = await masterAdminCollection.doc(id).get();
  return doc.exists ? (doc.data() as MasterAdmin) : null;
};

export const updateMasterAdmin = async (id: string, masterAdmin: Partial<MasterAdmin>) => {
  masterAdmin.updatedAt = new Date().toISOString();
  await masterAdminCollection.doc(id).update(masterAdmin);
};

export const deleteMasterAdmin = async (id: string) => {
  await masterAdminCollection.doc(id).delete();
};
