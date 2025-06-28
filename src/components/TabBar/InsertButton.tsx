import { HiPlus } from "react-icons/hi";

function InsertButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative flex items-center justify-center w-6 hover:w-16 transition-[width] duration-300 ease-in-out group">
      <div className="w-full border-t border-dashed border-gray-300" />
      <button
        onClick={onClick}
        className="absolute bg-white rounded-full border border-gray-300 w-5 h-5 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Insert tab"
      >
        <HiPlus className="w-3 h-3" />
      </button>
    </div>
  )
}

export default InsertButton
