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

  // Select icon based on label content
  const Icon = label.toLowerCase().includes('info')
    ? HiOutlineInformationCircle
    : label.toLowerCase().includes('end')
    ? HiOutlineCheckCircle
    : HiOutlineDocumentText

  // Tailwind dynamic styles for each state
  const dynamicStyles = active
    ? 'bg-white text-black border-gray-200 shadow-sm pr-10 pl-4 py-1.5'
    : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200 px-4 py-1.5 group focus-visible:bg-white focus-visible:text-black focus-visible:border-gray-200'

  const iconColor = active ? 'text-[#F59D0E]' : 'group-focus-visible:text-[#F59D0E] text-gray-400'

  // Close menu on outside click
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

  // Drag logic
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

  const isInsideMenuTrigger = (target: EventTarget | null): boolean => {
    return (target as HTMLElement)?.closest('.tab-menu-trigger') !== null
  }


  const handlePointerUp = (e: React.PointerEvent) => {
    if (!wasDragged.current && !isInsideMenuTrigger(e.target)) {
      onClick()
      setShowMenu(false)
    }
    startPos.current = null
  }

  // method to select the currently focused
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isInsideMenuTrigger(e.target)) {
      e.preventDefault()
      onClick()
      setShowMenu(false)
    }
  }

  // Show menu near button
  const handleOptionsClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const rect = e.currentTarget.getBoundingClientRect()
    const menuHeight = 200 // Adjust based on actual menu height

    const spaceAbove = rect.top

    // Decide placement based on available space
    const showAbove = spaceAbove > menuHeight

    if (showAbove) {
      setMenuPosition({
        top: rect.top - menuHeight - 4, // 4px spacing
        left: rect.left,
      })
    } else {
      setMenuPosition({
        top: rect.bottom + 4, // Default below
        left: rect.left,
      })
    }

    setShowMenu(true)
  }, [])


  return (
    <>
      <div className="relative inline-flex items-center" tabIndex={-1}>
        {/* Main tab button */}
        <div
          {...dragAttributes}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="tab"
          aria-selected={active}
          className={`group inline-flex items-center text-sm rounded-lg border font-medium focus:outline-none transition-all duration-200 cursor-grab ${dynamicStyles} focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-1 focus-visible:ring-offset-blue-400`}
        >
          <Icon className={`w-6 h-6 mr-2 ${iconColor}`} />
          {label}
        </div>

        {/* 3-dot menu trigger — positioned absolutely */}
        {active && (
          <button
            tabIndex={-1}
            type="button"
            className="tab-menu-trigger absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 focus-visible:hidden"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleOptionsClick(e)
            }}
            aria-label="Open tab menu"
          >
            <HiOutlineDotsVertical className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Settings menu */}
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
  )
}
