import { firestore } from '../config/firebase';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscountValue: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const couponCollection = firestore.collection('coupons');

export const createCoupon = async (coupon: Coupon) => {
  const timestamp = new Date().toISOString();
  coupon.createdAt = timestamp;
  coupon.updatedAt = timestamp;
  const docRef = await couponCollection.add(coupon);
  return docRef.id;
};

export const getCouponById = async (id: string) => {
  const doc = await couponCollection.doc(id).get();
  return doc.exists ? (doc.data() as Coupon) : null;
};

export const updateCoupon = async (id: string, coupon: Partial<Coupon>) => {
  coupon.updatedAt = new Date().toISOString();
  await couponCollection.doc(id).update(coupon);
};

export const deleteCoupon = async (id: string) => {
  await couponCollection.doc(id).delete();
};
