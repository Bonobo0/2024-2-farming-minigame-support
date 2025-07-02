"use server";

import crypto from "crypto";

export async function decryptFile(formData) {
  const file = formData.get("file");
  const buffer = await file.arrayBuffer();
  const data = Buffer.from(buffer);

  // 메타데이터 파싱
  const version = data.readUInt8(0);
  const blockSize = data.readUInt8(1);
  const keySize = data.readUInt8(2);

  // 메타데이터 검증
  if (version !== 0x01 || blockSize !== 16 || keySize !== 32) {
    throw new Error("잘못된 파일 형식이거나 지원하지 않는 암호화 방식입니다.");
  }

  // IV와 암호화된 데이터 추출
  const iv = data.subarray(3, 3 + blockSize);
  const encryptedData = data.subarray(3 + blockSize);

  // 32바이트(256비트) 키 생성 (암호화와 동일한 환경변수 사용)
  const keyHash = crypto
    .createHash("sha256")
    .update(process.env.STREAMING_ASSETS_ENCRYPTION_KEY)
    .digest();

  // 복호화 수행
  const decipher = crypto.createDecipheriv("aes-256-cbc", keyHash, iv);
  decipher.setAutoPadding(true);

  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted;
}
