export default function Hero({ title, description }) {
  return (
    <div className="hero bg-base-100 shadow-lg py-8 mb-8">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="py-4 text-base-content/70">{description}</p>
        </div>
      </div>
    </div>
  );
}
