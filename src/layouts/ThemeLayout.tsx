import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Card, SvgIcon } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import logo from 'assets/images/logo.jpg'
import Appearance from 'components/Appearance'
import SelectLanguage from 'components/selectLanguage'
import useScreenWidth from 'hooks/useScreenWidth'
import DrawerMobile from 'layouts/Sidebar/DrawerMobile'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Navigate, Navigation } from 'routes/navigate'

const drawerWidth = 240
const drawerWidthMobile = 50

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,

  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - ${drawerWidthMobile + 16}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const ThemeLayout = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const widthSize: number = useScreenWidth()
  const [listMenu, setListMenu] = useState(Navigate)
  const location = useLocation()
  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    isMobile ? setOpen(true) : setOpen(!open)
  }

  useEffect(() => {
    if (widthSize < 980) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [widthSize])

  const handleCallback = (val: boolean) => {
    setOpen(!val)
  }

  const handleToggleMenuItem = (value: Navigation) => {
    if (value.children) {
      const cloneMenu = [...listMenu]
      const findIndex = cloneMenu.findIndex((item) => item.id === value.id)
      cloneMenu[findIndex].isShowDetail = !value.isShowDetail
      setListMenu(cloneMenu)
    } else {
      navigate(value.path || '')
    }
  }

  const checkActiveUrl = (path: string): boolean => {
    const pathUrl = `/${path}`
    const currentUrl = `${location.pathname}`
    return pathUrl === currentUrl
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} style={isMobile ? { width: '100%' } : {}}>
        <Card
          className="w-full flex justify-between p-3 pl-5 pr-5"
          style={{
            borderRadius: 0,
            boxShadow:
              '0px 1px 10px rgb(0 0 0 / 12%), 0px 4px 5px rgb(0 0 0 / 14%), 0px 2px 4px -1px rgb(0 0 0 / 20%) !important',
          }}
        >
          <IconButton
            className="ml-2 shadow"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            {!open ? (
              !isMobile ? (
                <MenuOpenIcon />
              ) : (
                <MenuIcon />
              )
            ) : !isMobile ? (
              <MenuIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
          <div className="flex">
            <SelectLanguage />
            <Appearance />
          </div>
        </Card>
      </AppBar>
      {isMobile && (
        <DrawerMobile
          isOpen={open}
          listMenu={listMenu}
          toggleMenu={handleToggleMenuItem}
          callback={handleCallback}
        />
      )}
      {!isMobile && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <img src={logo} alt="#" style={{ height: '50px', width: "100%", }} className="object-contain" />
          </DrawerHeader>
          <List>
            {listMenu.map((item, index: number) => (
              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                key={index}
                selected={checkActiveUrl(item.path)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => {
                    handleToggleMenuItem(item)
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <SvgIcon component={item.icon} />
                  </ListItemIcon>

                  <ListItemText
                    primary={t(`navigate.${item.label}`)}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className="p-2">
          <Outlet />
        </div>
      </Box>
    </Box>
  )
}

export default ThemeLayout
