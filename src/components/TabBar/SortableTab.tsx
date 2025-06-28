import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'

import Tab from "../Tab"

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
    <div ref={setNodeRef} style={style} role="tab" aria-selected={active} tabIndex={active ? 0 : -1}>
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

export default SortableTab