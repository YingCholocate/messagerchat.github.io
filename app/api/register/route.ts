import { getUserByEmail, createUser } from '@/app/db/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const user = await getUserByEmail(email);
  if (user) {
    throw new Error('user has existed').message;
  }
  const newuser = await createUser({
    email,
    name,
    password,
  });

  return NextResponse.json(newuser);
}
