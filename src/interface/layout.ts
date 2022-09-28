export interface Language {
  label: string
  value: string
  icon: string
}

export interface TypeRouter extends ItemRoute {
  isShowList?: boolean
  children?: ItemRoute[]
}

export interface ItemRoute {
  id: number
  label: string
  path: string
  element?: React.ReactNode
  isRequireAuth: boolean
}
