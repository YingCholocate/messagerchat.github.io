import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import getConfig from 'next/config';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('filename') as unknown as File;
  //   console.log('file', data, file);
  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 这里是你要进行保存的文件目录地址
  const { NODE_ENV_API } = getConfig().publicRuntimeConfig;
  const PUBLICPATH = NODE_ENV_API === 'prod' ? '/tmp' : './public/tmp';
  const path = `${PUBLICPATH}/${file.name}`;

  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true, path: `/tmp/${file.name}` });
}
