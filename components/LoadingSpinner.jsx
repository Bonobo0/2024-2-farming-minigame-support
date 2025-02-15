export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
      <div className="text-center space-y-4 bg-base-100 p-8 rounded-xl shadow-xl">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="text-lg">데이터를 불러오는 중입니다...</p>
      </div>
    </div>
  );
}
