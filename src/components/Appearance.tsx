import { IconButton, Tooltip } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { setDark } from 'redux/reducer/commonSlice'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from 'utils/localStorage'
import { MODE } from '../layouts/constant'

function Appearance() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const dark = useAppSelector((state) => state.common.dark)

  useEffect(() => {
    const localAppearance = getLocalStorage(MODE)
    if (localAppearance) {
      dispatch(setDark(localAppearance))
    }
  }, [])

  const toggleMode = () => {
    dispatch(setDark(!dark))
    setLocalStorage(MODE, !dark)
  }

  return (
    <div>
      <Tooltip title={t(dark ? 'menu.lightMode' : 'menu.darkMode')}>
        <IconButton onClick={toggleMode}>
          {dark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default Appearance
