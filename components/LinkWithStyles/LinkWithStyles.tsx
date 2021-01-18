import React from 'react'
import { useRouter } from 'next/router'

type Props = {
  href: string
  className?: string
  children?: React.ReactNode
}

const LinkWithStyles = ({ children, href, className }: Props) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default LinkWithStyles
