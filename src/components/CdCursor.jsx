import { useEffect, useRef } from 'react'

// A spinning CD that follows the mouse. Position is written straight to the
// element's style (through a ref) instead of state, so moving the mouse does
// not re-render the whole app dozens of times per second.
function CdCursor() {
  const discRef = useRef(null)

  useEffect(() => {
    function handleMove(event) {
      const disc = discRef.current
      if (!disc) return
      disc.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      // Spin faster over anything clickable.
      const overClickable = event.target.closest('button, a, input, label')
      disc.classList.toggle('fast', Boolean(overClickable))
      disc.classList.add('visible')
    }

    function handleLeave() {
      discRef.current?.classList.remove('visible')
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div ref={discRef} className="cd-cursor" aria-hidden="true">
      <div className="cd-disc" />
    </div>
  )
}

export default CdCursor
