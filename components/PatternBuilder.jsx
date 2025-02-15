"use client";
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";

export default function PatternBuilder({ monster_data }) {
  const [patterns, setPatterns] = useState([]);
  const [monsters, setMonsters] = useState(monster_data);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPattern, setCurrentPattern] = useState({
    patternType: 0,
    startTime: 0.0,
    duration: 0.0,
    monsterCount: 1,
    radius: 0.0,
    wiggle: 0.0,
    angle: 0.0,
    monsterName: "",
  });
  const fileInputRef = useRef(null);

  // 패턴을 시작 시간 기준으로 정렬하는 함수
  const sortPatternsByStartTime = (patterns) => {
    return [...patterns].sort((a, b) => a.startTime - b.startTime);
  };

  // localStorage에서 패턴 불러오기
  useEffect(() => {
    try {
      const savedPatterns = window.localStorage.getItem("spawnPatterns");
      if (savedPatterns) {
        const patterns = JSON.parse(savedPatterns);
        setPatterns(sortPatternsByStartTime(patterns));
      }
    } catch (error) {
      console.error("Error loading saved patterns:", error);
    }
  }, []);

  // 자동 저장 로직
  useEffect(() => {
    try {
      const saveToLocalStorage = () => {
        window.localStorage.setItem("spawnPatterns", JSON.stringify(patterns));
      };

      const intervalId = setInterval(saveToLocalStorage, 3000);
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Error saving patterns:", error);
    }
  }, [patterns]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPattern((prev) => ({
      ...prev,
      [name]:
        name === "monsterName"
          ? value
          : name === "monsterCount" || name === "patternType"
          ? parseInt(value)
          : parseFloat(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPattern.monsterName) {
      alert("몬스터를 선택해주세요.");
      return;
    }

    // 새 패턴을 추가하고 시작 시간 기준으로 정렬
    const newPatterns = sortPatternsByStartTime([...patterns, currentPattern]);
    setPatterns(newPatterns);

    setCurrentPattern({
      patternType: 0,
      startTime: 0.0,
      duration: 0.0,
      monsterCount: 1,
      radius: 0.0,
      wiggle: 0.0,
      angle: 0.0,
      monsterName: "",
    });
  };

  const handleRemoveLast = () => {
    if (patterns.length > 0) {
      setPatterns(patterns.slice(0, -1));
    }
  };

  const handleExportJson = () => {
    const jsonString = JSON.stringify(patterns, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = "spawn_patterns.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedPatterns = JSON.parse(e.target?.result);

        // 데이터 유효성 검사
        const isValid = importedPatterns.every(
          (pattern) =>
            typeof pattern === "object" &&
            "monsterName" in pattern &&
            monster_data[pattern.monsterName] // 존재하는 몬스터인지 확인
        );

        if (!isValid) {
          alert("유효하지 않은 패턴 데이터입니다.");
          return;
        }

        // 임포트한 패턴도 시작 시간 기준으로 정렬
        const sortedPatterns = sortPatternsByStartTime(importedPatterns);
        setPatterns(sortedPatterns);
        localStorage.setItem("spawnPatterns", JSON.stringify(sortedPatterns));
      } catch (error) {
        console.error("Error importing JSON:", error);
        alert("JSON 파일 처리 중 오류가 발생했습니다.");
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteAll = () => {
    setPatterns([]);
    localStorage.removeItem("spawnPatterns");
    setShowDeleteModal(false);
  };

  const handleDeletePattern = (index) => {
    const newPatterns = patterns.filter((_, i) => i !== index);
    setPatterns(newPatterns);
  };

  return (
    <div className="min-h-screen w-full flex justify-center p-4">
      <div className="w-full max-w-[75%]">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">스폰 패턴 생성기</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">패턴 타입</span>
                  </label>
                  <input
                    type="number"
                    name="patternType"
                    value={currentPattern.patternType}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">시작 시간</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="startTime"
                    value={currentPattern.startTime}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">지속 시간</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="duration"
                    value={currentPattern.duration}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">몬스터 수</span>
                  </label>
                  <input
                    type="number"
                    name="monsterCount"
                    value={currentPattern.monsterCount}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">반경</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="radius"
                    value={currentPattern.radius}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">흔들림</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="wiggle"
                    value={currentPattern.wiggle}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">각도</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="angle"
                    value={currentPattern.angle}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">몬스터 이름</span>
                  </label>
                  <select
                    name="monsterName"
                    value={currentPattern.monsterName}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">몬스터 선택</option>
                    {Object.entries(monsters).map(([name, korName]) => (
                      <option key={name} value={name}>
                        {korName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!currentPattern.monsterName}
                >
                  패턴 추가
                </button>
                <button
                  type="button"
                  onClick={handleRemoveLast}
                  className="btn btn-secondary"
                >
                  마지막 패턴 제거
                </button>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="btn btn-accent"
                >
                  JSON 파일로 내보내기
                </button>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImportJson}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-info"
                >
                  JSON 파일 불러오기
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="btn btn-error"
                >
                  전체 삭제
                </button>
              </div>
            </form>

            <div className="divider">생성된 패턴</div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>몬스터</th>
                    <th>타입</th>
                    <th>시작</th>
                    <th>지속</th>
                    <th>수량</th>
                    <th>반경</th>
                    <th>흔들림</th>
                    <th>각도</th>
                    <th>동작</th>
                  </tr>
                </thead>
                <tbody>
                  {patterns.map((pattern, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{monsters[pattern.monsterName]}</td>
                      <td>{pattern.patternType}</td>
                      <td>{pattern.startTime}</td>
                      <td>{pattern.duration}</td>
                      <td>{pattern.monsterCount}</td>
                      <td>{pattern.radius}</td>
                      <td>{pattern.wiggle}</td>
                      <td>{pattern.angle}</td>
                      <td>
                        <button
                          onClick={() => handleDeletePattern(index)}
                          className="btn btn-error btn-xs"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* JSON 데이터 (숨김 처리) */}
            <textarea
              className="hidden"
              value={JSON.stringify(patterns, null, 2)}
              readOnly
            />
          </div>
        </div>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAll}
          title="패턴 전체 삭제"
          confirmText="삭제"
        >
          <p>모든 패턴을 삭제하시겠습니까?</p>
          <p className="text-sm text-gray-500 mt-2">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </Modal>
      </div>
    </div>
  );
}
