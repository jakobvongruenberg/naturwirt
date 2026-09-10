import type { ReactNode } from 'react'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenu as DropdownMenuSCN,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@farmers/ui/dropdown-menu'

interface MenuItemBase {
  type: 'label' | 'separator' | 'item' | 'sub'
}

interface MenuLabel extends MenuItemBase {
  type: 'label'
  label: string
}

interface MenuSeparator extends MenuItemBase {
  type: 'separator'
}

interface MenuItem extends MenuItemBase {
  type: 'item'
  label: string
  shortcut?: string
  disabled?: boolean
  onClick?: () => void
}

interface MenuSub extends MenuItemBase {
  type: 'sub'
  label: string
  items: (MenuLabel | MenuSeparator | MenuItem)[]
}

type Menu = MenuLabel | MenuSeparator | MenuItem | MenuSub

interface DropdownMenuProps {
  trigger: ReactNode
  menus: Menu[]
}

export function DropdownMenu({ trigger, menus }: DropdownMenuProps) {
  const renderMenu = (menu: Menu) => {
    switch (menu.type) {
      case 'label':
        return (
          <DropdownMenuLabel key={menu.label}>{menu.label}</DropdownMenuLabel>
        )
      case 'separator':
        return <DropdownMenuSeparator key={Math.random()} /> // Use unique keys for separators
      case 'item':
        return (
          <DropdownMenuItem
            key={menu.label}
            disabled={menu.disabled}
            onClick={menu.onClick}
          >
            {menu.label}
            {menu.shortcut && (
              <DropdownMenuShortcut>{menu.shortcut}</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        )
      case 'sub':
        return (
          <DropdownMenuSub key={menu.label}>
            <DropdownMenuSubTrigger>{menu.label}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {menu.items.map(renderMenu)}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )
      default:
        return null
    }
  }

  return (
    <DropdownMenuSCN>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56 bg-white text-black'>
        {menus.map(renderMenu)}
      </DropdownMenuContent>
    </DropdownMenuSCN>
  )
}
