import React, { useState } from 'react'

import styles from './Dropdown.module.scss'
import { DropdownItem } from 'types/dropdown'

type Props = {
  dropdownTriggerText: string
  items: DropdownItem[]
  disabled?: boolean
}

const Dropdown: React.FC<Props> = (props: Props) => {
  const [dropdownIsOpen, setDropdownState] = useState(false)

  const onDropdownPress = () => {
    if (props.disabled) {
      return
    }
    setDropdownState(!dropdownIsOpen)
  }

  return (
    <div className={styles.DropdownContainer}>
      <div
        className={`${styles.DropdownTrigger} ${dropdownIsOpen ? styles.OpenDropdownTrigger : ''} ${
          props.disabled ? styles.InactiveDropdownTrigger : ''
        }`}
        onClick={onDropdownPress}
      >
        {props.dropdownTriggerText}
      </div>

      {dropdownIsOpen && (
        <ul className={styles.DropdownMenuList}>
          {props.items.map((item: DropdownItem, index: number) => {
            return (
              <li key={`${item.label}-${index}`} className={styles.DropdownItemContainer}>
                <input
                  value={`> ${item.label}`}
                  type='submit'
                  className={styles.DropdownItemButton}
                  onClick={() => {
                    onDropdownPress()
                    item.callback()
                  }}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
