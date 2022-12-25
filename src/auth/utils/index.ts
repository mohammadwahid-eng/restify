import * as argon from 'argon2';

export const encodePassword = async (plain) => {
  return await argon.hash(plain);
}

export const verifyPassword = async (hash, plain) => {
  return await argon.verify(hash, plain);
}