import {
  HiFlag,
  HiOutlinePencilAlt,
  HiOutlineDocumentDuplicate,
  HiOutlineDuplicate,
  HiOutlineTrash,
} from 'react-icons/hi'

export default function SettingsMenu() {
  return (
    <div
      role="menu"
      aria-label="Tab Settings"
      className="bg-white rounded-xl border border-gray-200 shadow-md w-64 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-[#FAFBFC] px-4 py-2">
        <h3 className="text-md font-semibold text-gray-900">Settings</h3>
      </div>

      <hr className="border-gray-300" />

      {/* Actions */}
      <ul className="text-sm text-gray-800 space-y-2 p-4 pt-3" role="none">
        <li role="none">
          <button
            type="button"
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded text-left"
            role="menuitem"
          >
            <HiFlag className="text-blue-600 w-5 h-5" />
            Set as first page
          </button>
        </li>

        <li role="none">
          <button
            type="button"
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded text-left"
            role="menuitem"
          >
            <HiOutlinePencilAlt className="text-gray-500 w-5 h-5" />
            Rename
          </button>
        </li>

        <li role="none">
          <button
            type="button"
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded text-left"
            role="menuitem"
          >
            <HiOutlineDocumentDuplicate className="text-gray-500 w-5 h-5" />
            Copy
          </button>
        </li>

        <li role="none">
          <button
            type="button"
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded text-left"
            role="menuitem"
          >
            <HiOutlineDuplicate className="text-gray-500 w-5 h-5" />
            Duplicate
          </button>
        </li>

        <hr className="border-gray-200 my-2" />

        <li role="none">
          <button
            type="button"
            className="w-full flex items-center gap-2 text-red-500 hover:bg-red-50 p-1 rounded text-left"
            role="menuitem"
          >
            <HiOutlineTrash className="w-5 h-5" />
            Delete
          </button>
        </li>
      </ul>
    </div>
  )
}
