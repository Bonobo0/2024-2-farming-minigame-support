"use client";

import { useState, useRef } from "react";
import { encryptFile } from "./actions";
import Hero from "@/components/hero/Hero";

export default function StreamingAssetsPageContent() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleEncrypt = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const encryptedBuffer = await encryptFile(formData);

      // ArrayBuffer를 Blob으로 변환
      const blob = new Blob([encryptedBuffer]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `encrypted-${file.name}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Encryption failed:", error);
    }
    setIsLoading(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <Hero
        title="StreamingAssets 파일 암호화"
        description="Unity 프로젝트의 StreamingAssets 파일을 안전하게 암호화하세요. AES-256-CBC 암호화 방식을 사용하여 파일을 보호합니다."
      />
      <div className="card bg-base-100 shadow-xl max-w-xl mx-auto border border-base-300">
        <div className="card-body">
          <div className="space-y-6">
            <div className="stats shadow mb-4">
              <div className="stat">
                <div className="stat-title">암호화 방식</div>
                <div className="stat-value text-primary text-2xl">
                  AES-256-CBC
                </div>
                <div className="stat-desc">고급 암호화 표준</div>
              </div>
            </div>

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
                accept=".json,.txt,.bytes,.bundle"
                ref={fileInputRef}
              />
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center gap-4 cursor-pointer"
              >
                <div className="text-4xl">📁</div>
                <span className="link link-primary text-lg">
                  파일을 선택하거나 여기에 드래그하세요
                </span>
                <div className="text-sm text-base-content/70">
                  지원 형식: JSON, TXT, BYTES, BUNDLE
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    <span>{file.name}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleEncrypt}
              disabled={!file || isLoading}
              className={`btn btn-primary w-full ${
                isLoading ? "loading" : ""
              } btn-lg`}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  암호화 중...
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
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                    />
                  </svg>
                  암호화 및 다운로드
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
