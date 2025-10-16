 const ProfileButton = ({ variant = 'default', className = '', children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 flex flex-col h-auto p-4 gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Standard Tailwind CSS color variants
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    primaryAction: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 focus:ring-blue-500 shadow-lg hover:shadow-cyan-500/40",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400",
    ghost: "text-gray-600 hover:bg-red-100 hover:text-red-600 focus:ring-red-400",
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default ProfileButton;