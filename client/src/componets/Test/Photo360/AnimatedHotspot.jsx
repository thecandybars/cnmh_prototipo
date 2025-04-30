const AnimatedHotspot = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      .arrow {
        animation: bounce 1s ease-in-out infinite;
      }
    `}</style>
    <circle cx="12" cy="12" r="12" fill="black" />
    <path
      className="arrow"
      fill="#63b0a4"
      d="M7.41,15.41 L12,10.83 l4.59,4.58 L18,14 l-6,-6 l-6,6 z"
    />
  </svg>
);

export default AnimatedHotspot;
