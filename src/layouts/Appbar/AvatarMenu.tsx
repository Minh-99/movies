import { Logout } from '@mui/icons-material'
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { USER } from 'constants/common'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorage } from 'utils/localStorage'

const AvatarMenu = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    removeLocalStorage(USER)
    navigate('login')
  }

  return (
    <div>
      <IconButton onClick={handleMenu} size="small" aria-haspopup="true">
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AvatarMenu
