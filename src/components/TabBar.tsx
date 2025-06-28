import { useState } from 'react'
import Tab from './Tab'
import { HiPlus } from 'react-icons/hi'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const initialTabs = ['Info', 'Details', 'Other', 'Ending']

export default function TabBar() {
  const [tabs, setTabs] = useState(initialTabs)
  const [activeTab, setActiveTab] = useState('Info')

  const insertTabAt = (index: number) => {
    const newLabel = `Page ${tabs.length + 1}`
    const updated = [...tabs.slice(0, index), newLabel, ...tabs.slice(index)]
    setTabs(updated)
    setActiveTab(newLabel)
  }

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = tabs.indexOf(active.id)
      const newIndex = tabs.indexOf(over.id)
      setTabs(arrayMove(tabs, oldIndex, newIndex))
    }
  }

  return (
    <div className="flex flex-row justify-center">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tabs} strategy={horizontalListSortingStrategy}>
          {/* Tab */}
          {tabs.map((tab, index) => (
            <div key={tab} className="flex items-center">
              <SortableTab
                id={tab}
                label={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />

              {/* Dashed line + "+" button */}
              {index < tabs.length - 1 && (
                <div className="relative flex items-center justify-center w-6 hover:w-16 transition-[width] duration-300 ease-in-out group">
                  <div className="w-full border-t border-dashed border-gray-300" />
                  <button
                    onClick={() => insertTabAt(index + 1)}
                    className="absolute bg-white rounded-full border border-gray-300 w-5 h-5 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <HiPlus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </SortableContext>
      </DndContext>

      {/* Add Page button: Add tab at the end */}
      <div className="flex items-center">
        <div className="w-4 h-px border-t border-dashed border-gray-300" />
        <button
          onClick={() => insertTabAt(tabs.length)}
          className="inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg border border-gray-200 bg-white text-black hover:bg-gray-100"
        >
          <HiPlus className="w-4 h-4" />
          Add page
        </button>
      </div>
    </div>
  )
}

// --- Sortable wrapper for each Tab ---
function SortableTab({
  id,
  label,
  active,
  onClick,
}: {
  id: string
  label: string
  active: boolean
  onClick: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style}
    >
      <Tab
        label={label}
        active={active}
        onClick={onClick}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </div>
  )
}
