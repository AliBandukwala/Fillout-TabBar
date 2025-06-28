import {
  HiFlag,
  HiOutlinePencilAlt,
  HiOutlineDocumentDuplicate,
  HiOutlineDuplicate,
  HiOutlineTrash,
} from 'react-icons/hi'

export default function SettingsMenu() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md w-64 z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-[#FAFBFC] px-4 py-2">
        <h3 className="text-md font-semibold text-gray-900">Settings</h3>
      </div>

      {/* Divider below header */}
      <hr className="border-gray-300" />

      {/* Action list */}
      <ul className="text-sm text-gray-800 space-y-2 p-4 pt-3">
        <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
          <HiFlag className="text-blue-600 w-5 h-5" />
          Set as first page
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
          <HiOutlinePencilAlt className="text-gray-500 w-5 h-5" />
          Rename
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
          <HiOutlineDocumentDuplicate className="text-gray-500 w-5 h-5" />
          Copy
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
          <HiOutlineDuplicate className="text-gray-500 w-5 h-5" />
          Duplicate
        </li>
        <hr className="border-gray-200 my-2" />
        <li className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-red-50 p-1 rounded">
          <HiOutlineTrash className="w-5 h-5" />
          Delete
        </li>
      </ul>
    </div>
  )
}
