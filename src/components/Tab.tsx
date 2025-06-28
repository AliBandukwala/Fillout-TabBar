import { useState, useRef, useEffect, useCallback } from 'react'
import {
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlineDotsVertical,
} from 'react-icons/hi'
import SettingsMenu from './SettingsMenu'
import Portal from './Portal'

type Props = {
  label: string
  active: boolean
  onClick: () => void
  dragAttributes?: React.HTMLAttributes<HTMLDivElement>
  dragListeners?: {
    onPointerDown?: (e: React.PointerEvent) => void
  }
}

export default function Tab({
  label,
  active,
  onClick,
  dragAttributes = {},
  dragListeners = {},
}: Props) {
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const menuRef = useRef<HTMLDivElement>(null)
  const startPos = useRef<{ x: number; y: number } | null>(null)
  const wasDragged = useRef(false)

  // Choose icon based on tab label semantics
  const Icon = label.toLowerCase().includes('info')
    ? HiOutlineInformationCircle
    : label.toLowerCase().includes('end')
    ? HiOutlineCheckCircle
    : HiOutlineDocumentText

  // Tailwind style configuration
  const baseStyles =
    'inline-flex items-center text-sm rounded-lg border font-medium focus:outline-none transition-all duration-200 relative'

  const dynamicStyles = active
    ? 'bg-white text-black border-gray-200 shadow-sm pr-10 pl-4 py-1.5'
    : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200 px-4 py-1.5'

  const iconColor = active ? 'text-[#F59D0E]' : 'text-gray-400'

  // Detect outside clicks to auto-close menu
  useEffect(() => {
    if (!showMenu) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showMenu])

  // Handle tab drag + click logic
  const handlePointerDown = (e: React.PointerEvent) => {
    startPos.current = { x: e.clientX, y: e.clientY }
    wasDragged.current = false
    dragListeners?.onPointerDown?.(e)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startPos.current) return
    const dx = Math.abs(e.clientX - startPos.current.x)
    const dy = Math.abs(e.clientY - startPos.current.y)
    if (dx > 3 || dy > 3) wasDragged.current = true
  }

  const handlePointerUp = () => {
    if (!wasDragged.current) {
      onClick()
      setShowMenu(false)
    }
    startPos.current = null
  }

  // Handle menu button click with dynamic position logic
  const handleOptionsClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const rect = e.currentTarget.getBoundingClientRect()
    const menuWidth = 200
    const viewportWidth = window.innerWidth
    const shouldFlip = rect.left + menuWidth > viewportWidth

    setMenuPosition({
      top: rect.bottom + 4,
      left: shouldFlip ? rect.right - menuWidth : rect.left,
    })

    setShowMenu(true)
  }, [])

  return (
    <div
      className="transition-all duration-300 relative inline-flex items-center"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
    >
      {/* Main tab body with drag + click events */}
      <div
        {...dragAttributes}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`${baseStyles} ${dynamicStyles} cursor-grab`}
      >
        <Icon className={`w-6 h-6 mr-2 ${iconColor}`} />
        {label}
      </div>

      {/* Options menu button and popup */}
      {active && (
        <>
          <button
            type="button"
            className="tab-menu-trigger absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
            onClick={handleOptionsClick}
            aria-label="Open tab menu"
          >
            <HiOutlineDotsVertical className="w-4 h-4 text-gray-500" />
          </button>

          {showMenu && (
            <Portal>
              <div
                ref={menuRef}
                style={{
                  position: 'absolute',
                  top: menuPosition.top,
                  left: menuPosition.left,
                  zIndex: 9999,
                }}
                className="shadow-lg transition-all duration-150 transform scale-100 opacity-100 animate-fade-in"
              >
                <SettingsMenu />
              </div>
            </Portal>
          )}
        </>
      )}
    </div>
  )
}
