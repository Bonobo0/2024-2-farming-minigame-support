"use client";

import { useState, useEffect } from "react";
import {
  SUB_WEAPON_TYPES,
  ATTACK_DIRECTION_TYPES,
} from "@/constants/weaponTypes";
import Modal from "@/components/Modal";

export default function SubWeaponBuilder() {
  const [showCode, setShowCode] = useState(false);
  const [weapons, setWeapons] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    weaponType: "0",
    weaponGrade: "0",
    maxWeaponGrade: "4",
    displayWeaponAttackDirectionType: "근접",
    weaponAttackDirectionType: "0",
    attackDamage: "35",
    attackRange: "1",
    attackSpeed: "0.5",
    attackIntervalInSeconds: "0",
    attackTarget: "1",
    projectileSpeed: "3",
    projectileCount: "1",
  });

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    try {
      const savedWeapons = window.localStorage.getItem("subWeapons");
      if (savedWeapons) {
        setWeapons(JSON.parse(savedWeapons));
      }
    } catch (error) {
      console.error("Error loading saved weapons:", error);
    }
  }, []);

  // 자동 저장
  useEffect(() => {
    try {
      window.localStorage.setItem("subWeapons", JSON.stringify(weapons));
    } catch (error) {
      console.error("Error saving weapons:", error);
    }
  }, [weapons]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updates = { [name]: value };

      // weaponAttackDirectionType가 변경되면 displayWeaponAttackDirectionType도 자동 업데이트
      if (name === "weaponAttackDirectionType") {
        const directionType = ATTACK_DIRECTION_TYPES.find(
          (type) => type.id === parseInt(value)
        );
        if (directionType) {
          updates.displayWeaponAttackDirectionType = directionType.name;
        }
      }

      return { ...prev, ...updates };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWeapons([...weapons, formData]);
    setFormData({
      displayName: "",
      weaponType: formData.weaponType,
      weaponGrade: "0",
      maxWeaponGrade: "4",
      displayWeaponAttackDirectionType: "근접",
      weaponAttackDirectionType: "0",
      attackDamage: "35",
      attackRange: "1",
      attackSpeed: "0.5",
      attackIntervalInSeconds: "0",
      attackTarget: "1",
      projectileSpeed: "3",
      projectileCount: "1",
    });
  };

  const handleDeleteAll = () => {
    setWeapons([]);
    setShowDeleteModal(false);
  };

  const handleDeleteWeapon = (index) => {
    setWeapons(weapons.filter((_, i) => i !== index));
  };

  const handleExportJson = () => {
    const jsonString = JSON.stringify(weapons, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "sub_weapons.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">선택 무기 생성기</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">무기 이름</span>
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">무기 타입</span>
                  </label>
                  <select
                    name="weaponType"
                    value={formData.weaponType}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    {SUB_WEAPON_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">무기 등급</span>
                  </label>
                  <input
                    type="number"
                    name="weaponGrade"
                    value={formData.weaponGrade}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="0"
                    max="4"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">최대 등급</span>
                  </label>
                  <input
                    type="number"
                    name="maxWeaponGrade"
                    value={formData.maxWeaponGrade}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="1"
                    max="4"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">공격 방향 타입</span>
                  </label>
                  <select
                    name="weaponAttackDirectionType"
                    value={formData.weaponAttackDirectionType}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    {ATTACK_DIRECTION_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">공격력</span>
                  </label>
                  <input
                    type="number"
                    name="attackDamage"
                    value={formData.attackDamage}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">공격 범위</span>
                  </label>
                  <input
                    type="number"
                    name="attackRange"
                    value={formData.attackRange}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">공격 속도</span>
                  </label>
                  <input
                    type="number"
                    name="attackSpeed"
                    value={formData.attackSpeed}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="0"
                    step="0.125"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">공격 간격(초)</span>
                  </label>
                  <input
                    type="number"
                    name="attackIntervalInSeconds"
                    value={formData.attackIntervalInSeconds}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">공격 대상</span>
                  </label>
                  <input
                    type="number"
                    name="attackTarget"
                    value={formData.attackTarget}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="0"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">발사체 속도</span>
                  </label>
                  <input
                    type="number"
                    name="projectileSpeed"
                    value={formData.projectileSpeed}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">발사체 개수</span>
                  </label>
                  <input
                    type="number"
                    name="projectileCount"
                    value={formData.projectileCount}
                    onChange={handleChange}
                    className="input input-bordered"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button type="submit" className="btn btn-primary">
                  무기 추가
                </button>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="btn btn-accent"
                >
                  JSON 내보내기
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

            <div className="divider">생성된 무기 목록</div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>이름</th>
                    <th>타입</th>
                    <th>등급</th>
                    <th>공격력</th>
                    <th>범위</th>
                    <th>속도</th>
                    <th>발사체 수</th>
                    <th>동작</th>
                  </tr>
                </thead>
                <tbody>
                  {weapons.map((weapon, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{weapon.displayName}</td>
                      <td>
                        {
                          SUB_WEAPON_TYPES.find(
                            (t) => t.id === parseInt(weapon.weaponType)
                          )?.name
                        }
                      </td>
                      <td>
                        {weapon.weaponGrade}/{weapon.maxWeaponGrade}
                      </td>
                      <td>{weapon.attackDamage}</td>
                      <td>{weapon.attackRange}</td>
                      <td>{weapon.attackSpeed}</td>
                      <td>{weapon.projectileCount}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteWeapon(index)}
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

            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="btn btn-outline mt-4"
            >
              {showCode ? "코드 미리 보기 숨기기" : "코드 미리 보기"}
            </button>
            {showCode && (
              <div className="mockup-code mt-4">
                <pre>
                  <code>{JSON.stringify(weapons, null, 2)}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAll}
          title="무기 데이터 전체 삭제"
          confirmText="삭제"
        >
          <p>모든 무기 데이터를 삭제하시겠습니까?</p>
          <p className="text-sm text-gray-500 mt-2">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </Modal>
      </div>
    </div>
  );
}
