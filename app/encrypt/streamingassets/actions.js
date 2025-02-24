"use server";

import crypto from "crypto";

export async function encryptFile(formData) {
  const file = formData.get("file");
  const buffer = await file.arrayBuffer();

  // Rijndael 설정을 위한 상수
  const RIJNDAEL_BLOCK_SIZE = 16; // 블록 크기: 128 bits (16 bytes)
  const RIJNDAEL_KEY_SIZE = 32; // 키 크기: 256 bits (32 bytes)

  // 32바이트(256비트) 키 생성
  const keyHash = crypto
    .createHash("sha256")
    .update(process.env.STREAMING_ASSETS_ENCRYPTION_KEY)
    .digest();

  // 16바이트 IV 생성
  const iv = crypto.randomBytes(RIJNDAEL_BLOCK_SIZE);

  // Rijndael 알고리즘 설정
  // aes-256-cbc는 Rijndael에서:
  // - 블록 크기: 128비트 (16바이트)
  // - 키 크기: 256비트 (32바이트)
  // - 운영 모드: CBC
  const cipher = crypto.createCipheriv("aes-256-cbc", keyHash, iv);

  // PKCS7 패딩 (Rijndael 블록 크기에 맞춤)
  cipher.setAutoPadding(true);

  // 암호화 수행
  let encrypted = cipher.update(Buffer.from(buffer));
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // 메타데이터 추가
  const version = Buffer.from([0x01]); // 버전 정보
  const blockSize = Buffer.from([RIJNDAEL_BLOCK_SIZE]); // 블록 크기 (16바이트)
  const keySize = Buffer.from([RIJNDAEL_KEY_SIZE]); // 키 크기 (32바이트)

  // 최종 버퍼 구성: [버전][블록크기][키크기][IV][암호화된 데이터]
  const resultBuffer = Buffer.concat([
    version,
    blockSize,
    keySize,
    iv,
    encrypted,
  ]);

  return resultBuffer;
}
