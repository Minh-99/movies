import { SvgIconProps } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
export interface Navigation {
  icon: (props: SvgIconProps) => JSX.Element
  id: number
  label?: string
  isShowDetail?: boolean
  path: string
  children?: Navigation[]
  index?: number
}
export const Navigate: Navigation[] = [
  {
    id: 1,
    label: 'home',
    icon: HomeIcon,
    path: '',
  },
  // {
  //   id: 2,
  //   icon: DashboardIcon,
  //   label: 'Dashboard',
  //   path: 'dashboard',
  // },
]
