import prisma from '@/app/libs/prismadb';
import getSession from './getSession';

const getUsers = async () => {
  const session = await getSession();
  console.log('session', session);
  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    console.log('user', users);

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
