export const Card = ({ className = '', children }) => (
  <div className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-md ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ className = '', children }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);