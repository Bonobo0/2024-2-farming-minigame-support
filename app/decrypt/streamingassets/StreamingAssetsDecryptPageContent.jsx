"use client";

import { useState, useRef } from "react";
import { decryptFile } from "./actions";
import Hero from "@/components/hero/Hero";

export default function StreamingAssetsDecryptPageContent() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [decryptedContent, setDecryptedContent] = useState(null);
  const [decryptedFileName, setDecryptedFileName] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setDecryptedContent(null);
    setError("");
    
    // 파일명에서 "encrypted-" 접두사 제거
    if (file && file.name.startsWith("encrypted-")) {
      setDecryptedFileName(file.name.substring(10));
    } else {
      setDecryptedFileName(file ? `decrypted-${file.name}` : "");
    }
  };

  const handleDecrypt = async () => {
    if (!file) return;

    setIsLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const decryptedBuffer = await decryptFile(formData);
      setDecryptedContent(decryptedBuffer);
    } catch (error) {
      console.error("Decryption failed:", error);
      setError(error.message || "복호화에 실패했습니다. 올바른 암호화 파일인지 확인해주세요.");
    }
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (!decryptedContent) return;

    const blob = new Blob([decryptedContent]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = decryptedFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handlePreview = () => {
    if (!decryptedContent) return "";

    try {
      // 텍스트 형식으로 미리보기 시도
      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(decryptedContent);
      
      // JSON인지 확인
      try {
        const parsed = JSON.parse(text);
        const jsonString = JSON.stringify(parsed, null, 2);
        // 미리보기는 최대 1000자까지만 표시
        return jsonString.length > 1000 ? jsonString.substring(0, 1000) + "\n..." : jsonString;
      } catch {
        // JSON이 아니면 그냥 텍스트로 표시 (최대 1000자)
        return text.length > 1000 ? text.substring(0, 1000) + "..." : text;
      }
    } catch {
      return "바이너리 파일입니다. 미리보기를 사용할 수 없습니다.";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setDecryptedContent(null);
      setError("");
      
      if (droppedFile.name.startsWith("encrypted-")) {
        setDecryptedFileName(droppedFile.name.substring(10));
      } else {
        setDecryptedFileName(`decrypted-${droppedFile.name}`);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <Hero
        title="StreamingAssets 파일 복호화"
        description="AES-256-CBC로 암호화된 Unity StreamingAssets 파일을 안전하게 복호화하여 원본 파일을 복구합니다."
      />
      <div className="card bg-base-100 shadow-xl max-w-xl mx-auto border border-base-300">
        <div className="card-body">
          <div className="space-y-6">
            <div className="stats shadow mb-4">
              <div className="stat">
                <div className="stat-title">복호화 방식</div>
                <div className="stat-value text-secondary text-2xl">
                  AES-256-CBC
                </div>
                <div className="stat-desc">고급 암호화 표준 복호화</div>
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div
              className="border-2 border-dashed border-base-300 rounded-box p-8 text-center bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="fileInput"
                accept="*"
                ref={fileInputRef}
              />
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center gap-4 cursor-pointer"
              >
                <div className="text-4xl">🔓</div>
                <span className="link link-secondary text-lg">
                  암호화된 파일을 선택하거나 여기에 드래그하세요
                </span>
                <div className="text-sm text-base-content/70">
                  AES-256-CBC로 암호화된 파일만 지원됩니다
                </div>
              </label>
              {file && (
                <div className="mt-4">
                  <div className="alert alert-info shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621 0 1.125-.504 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    <span>{file.name}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleDecrypt}
              disabled={!file || isLoading}
              className={`btn btn-secondary w-full ${
                isLoading ? "loading" : ""
              } btn-lg`}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  복호화 중...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  복호화
                </>
              )}
            </button>

            {decryptedContent && (
              <div className="space-y-4">
                <div className="alert alert-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>복호화가 완료되었습니다!</span>
                </div>

                <div className="bg-base-200 rounded-box p-4">
                  <h3 className="font-semibold mb-2">파일 미리보기:</h3>
                  <div className="bg-base-100 p-3 rounded text-sm font-mono max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap break-words">
                      {handlePreview()}
                    </pre>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="btn btn-primary w-full btn-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  복호화된 파일 다운로드
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
