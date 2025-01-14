import { firestore } from '../config/firebase';

interface MasterAdmin {
  userId: string;
  companyName?: string;
  vatNumber?: string;
  fiscalCode?: string;
  billingAddress?: string;
  billingEmail?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

const masterAdminCollection = firestore.collection('masterAdmins');

export const createMasterAdmin = async (masterAdmin: Partial<MasterAdmin>) => {
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

export const getMasterAdminByUserId = async (userId: string) => {
  const querySnapshot = await masterAdminCollection.where('userId', '==', userId).get();
  if (querySnapshot.empty) {
    return null;
  }
  const doc = querySnapshot.docs[0];
  return doc.data() as MasterAdmin;
};

export const updateMasterAdmin = async (id: string, masterAdmin: Partial<MasterAdmin>) => {
  console.log("Updating master admin:", masterAdmin);
  console.log("ID:", id);
  masterAdmin.updatedAt = new Date().toISOString();
  await masterAdminCollection.doc(id).update(masterAdmin);
};

export const updateMasterAdminByUserId = async (userId: string, masterAdmin: Partial<MasterAdmin>) => {
  const querySnapshot = await masterAdminCollection.where('userId', '==', userId).get();
  if (querySnapshot.empty) {
    throw new Error(`No MasterAdmin found with userId: ${userId}`);
  }
  const doc = querySnapshot.docs[0];
  masterAdmin.updatedAt = new Date().toISOString();
  await masterAdminCollection.doc(doc.id).update(masterAdmin);
};

export const deleteMasterAdmin = async (id: string) => {
  await masterAdminCollection.doc(id).delete();
};
