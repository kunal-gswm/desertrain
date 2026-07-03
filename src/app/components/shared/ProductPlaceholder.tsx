/**
 * ProductPlaceholder — Uniform placeholder for missing product images.
 *
 * Light gray background with a subtle product icon silhouette.
 * Consistent 4:3 aspect ratio across all uses.
 * Makes the catalog look premium even without real photography.
 */
export function ProductPlaceholder({
  category,
  className = "",
}: {
  category?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#F1F3F5] flex items-center justify-center ${className}`}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-[#CBD5E1]"
      >
        <rect
          x="8"
          y="12"
          width="32"
          height="24"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="18" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 32l8-6 6 4 10-8 8 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {category && (
        <span className="sr-only">{category} product image placeholder</span>
      )}
    </div>
  );
}
