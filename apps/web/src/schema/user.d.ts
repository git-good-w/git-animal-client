/**
 * @deprecated
 */
export interface UserSchema {
  id: string;
  username: string;
  points: string;
  profileImage: string;
}
/**
 * @deprecated
 */
export interface CouponSchema {
  id: string;
  userId: string;
  code: string;
  usedAt: string;
}

/**
 * @deprecated
 */
export interface PetInfoSchema {
  id: string;
  type: string;
  level: string;
  visible: boolean;
}
