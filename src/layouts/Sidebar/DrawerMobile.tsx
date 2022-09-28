import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Navigation } from 'routes/navigate'

interface Props {
  isOpen: boolean
  listMenu: Navigation[]
  callback: (val: boolean) => void
  toggleMenu: (val: Navigation) => void
}

const DrawerMobile = (props: Props) => {
  const { isOpen, listMenu, callback, toggleMenu } = props
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    setDrawerOpen(isOpen)
  }, [isOpen])

  const toggleDrawer = (): void => {
    setDrawerOpen(!drawerOpen)
    callback(drawerOpen)
  }

  const handleClickMenu = (value: Navigation) => {
    toggleMenu(value)
    if (value?.children) return
    setDrawerOpen(!drawerOpen)
    callback(drawerOpen)
  }

  const checkActiveUrl = (path: string): boolean => {
    const pathUrl = `/${path}`
    const currentUrl = `${location.pathname}`
    return pathUrl === currentUrl
  }

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 250 }}>
        <List>
          {listMenu.map((item, index: number) => (
            <ListItem disablePadding sx={{ display: 'block' }} key={index}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
                selected={checkActiveUrl(item.path)}
                onClick={() => {
                  handleClickMenu(item)
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={t(`navigate.${item.label}`)}
                  sx={{ opacity: drawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default DrawerMobile
