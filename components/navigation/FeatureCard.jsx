import NavLink from "./NavLink";

export default function FeatureCard({
  href,
  icon,
  title,
  description,
  isComingSoon = false,
}) {
  return (
    <NavLink href={href} className="group">
      <div className="h-full p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
        </div>
        <p className="text-slate-600 mb-4">{description}</p>
        {isComingSoon ? (
          <div className="badge badge-neutral">Coming Soon</div>
        ) : (
          <span className="text-blue-500 group-hover:translate-x-1 transition-transform inline-flex items-center">
            시작하기
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
              <path
                d="M13.75 6.75L19.25 12L13.75 17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12H4.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    </NavLink>
  );
}
