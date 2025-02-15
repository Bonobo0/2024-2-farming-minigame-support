export default function ComingSoon({ title, message }) {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl mb-4">{title}</h2>
          <div className="badge badge-neutral mb-4">Coming Soon</div>
          <p className="text-base-content/70">{message}</p>
        </div>
      </div>
    </div>
  );
}
