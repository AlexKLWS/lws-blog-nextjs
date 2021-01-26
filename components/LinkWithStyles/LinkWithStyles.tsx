import React from 'react'
import { useRouter } from 'next/router'

type Props = {
  href: string
  className?: string
  children?: React.ReactNode
  ariaLabel?: string
}

const LinkWithStyles = ({ children, href, className, ariaLabel }: Props) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a aria-label={ariaLabel} href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default LinkWithStyles
