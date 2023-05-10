interface Button {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({ label, type = "button", onClick }: Button) => {
  return (
    <button
      type={type}
      className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
      onClick={onClick}
    >
      <span className="w-full">{label}</span>
    </button>
  );
};

export default Button;
