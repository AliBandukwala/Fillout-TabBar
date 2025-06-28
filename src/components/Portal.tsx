// src/components/Portal.tsx
import { createPortal } from 'react-dom'
import { type ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

export default function Portal({ children }: Props) {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setContainer(document.getElementById('portal-root'))
  }, [])

  if (!container) return null
  return createPortal(children, container)
}
