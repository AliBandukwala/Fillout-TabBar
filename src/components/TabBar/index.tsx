import { useState, useCallback } from 'react'
import { HiPlus } from 'react-icons/hi'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'

import SortableTab from './SortableTab'
import InsertButton from './InsertButton'

// Define a stable structure for tabs
interface TabData {
  id: string
  label: string
}

// Initial tab list with stable IDs
const initialTabs: TabData[] = [
  { id: 'info', label: 'Info' },
  { id: 'details', label: 'Details' },
  { id: 'other', label: 'Other' },
  { id: 'ending', label: 'Ending' },
]

export default function TabBar() {
  const [tabs, setTabs] = useState(initialTabs)
  const [activeTabId, setActiveTabId] = useState(initialTabs[0].id)

  // Insert a new tab at the given index
  const insertTabAt = useCallback((index: number) => {
    const newTab: TabData = {
      id: Date.now().toString(),
      label: `Page ${tabs.length + 1}`,
    }
    const updated = [...tabs.slice(0, index), newTab, ...tabs.slice(index)]
    setTabs(updated)
    setActiveTabId(newTab.id)
  }, [tabs])

  const sensors = useSensors(useSensor(PointerSensor))

  // Handle drag end to reorder tabs
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = tabs.findIndex(t => t.id === active.id)
      const newIndex = tabs.findIndex(t => t.id === over.id)
      setTabs(arrayMove(tabs, oldIndex, newIndex))
    }
  }, [tabs])

  return (
    <div className="flex flex-row justify-center" role="tablist" aria-label="Page Tabs">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tabs.map(t => t.id)} strategy={horizontalListSortingStrategy}>
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center">
              <SortableTab
                id={tab.id}
                label={tab.label}
                active={activeTabId === tab.id}
                onClick={() => setActiveTabId(tab.id)}
              />

              {index < tabs.length - 1 && (
                <InsertButton onClick={() => insertTabAt(index + 1)} />
              )}
            </div>
          ))}
        </SortableContext>
      </DndContext>

      {/* Add tab at end */}
      <div className="flex items-center">
        <div className="w-4 h-px border-t border-dashed border-gray-300" />
        <button
          onClick={() => insertTabAt(tabs.length)}
          className="inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg border border-gray-200 bg-white text-black hover:bg-gray-100"
          aria-label="Add new page"
        >
          <HiPlus className="w-4 h-4" />
          Add page
        </button>
      </div>
    </div>
  )
}
