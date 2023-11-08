import { prisma } from '.';
import bcrypt from 'bcrypt';
interface IUser {
  name: string;
  password: string;
  email: string;
}
export const createUser = (userData: IUser) => {
  console.log(userData);
  const finalUserData = {
    name: userData.name,
    email: userData.email,

    hashedPassword: bcrypt.hashSync(userData.password!, 10),
  };
  return prisma.user.create({
    data: finalUserData,
  });
};

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = (userId: string) => {
  console.log('userid', userId);
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
