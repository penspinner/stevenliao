import * as React from 'react'

/**
 * An enhanced `<details>` component that's intended to be used as a menu (a bit
 * like a menu-button).
 */
export const Details = React.forwardRef<
  HTMLDetailsElement,
  React.DetailsHTMLAttributes<HTMLDetailsElement>
>((props, forwardedRef) => {
  const { onToggle, onMouseDown, onTouchStart, onFocus, open, ...rest } = props
  const [isOpen, setIsOpen] = React.useState(false)
  const clickRef = React.useRef<boolean>(false)
  const focusRef = React.useRef<boolean>(false)

  React.useEffect(() => {
    if (isOpen) {
      const clickHandler = () => {
        if (!clickRef.current) setIsOpen(false)
        clickRef.current = false
      }
      const focusHandler = () => {
        if (!focusRef.current) setIsOpen(false)
        focusRef.current = false
      }
      document.addEventListener('mousedown', clickHandler)
      document.addEventListener('touchstart', clickHandler)
      document.addEventListener('focusin', focusHandler)
      return () => {
        document.removeEventListener('mousedown', clickHandler)
        document.removeEventListener('touchstart', clickHandler)
        document.removeEventListener('focusin', focusHandler)
      }
    }
  }, [isOpen])

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <details
      ref={forwardedRef}
      open={open ?? isOpen}
      onToggle={(event) => {
        onToggle && onToggle(event)
        if (event.defaultPrevented) return
        setIsOpen(event.currentTarget.open)
      }}
      onMouseDown={(event) => {
        onMouseDown && onMouseDown(event)
        if (event.defaultPrevented) return
        if (isOpen) clickRef.current = true
      }}
      onTouchStart={(event) => {
        onTouchStart && onTouchStart(event)
        if (event.defaultPrevented) return
        if (isOpen) clickRef.current = true
      }}
      onFocus={(event) => {
        onFocus && onFocus(event)
        if (event.defaultPrevented) return
        if (isOpen) focusRef.current = true
      }}
      {...rest}
    />
  )
})

Details.displayName = 'Details'
