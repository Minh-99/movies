import * as React from 'react'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import flagChina from 'assets/images/icons/china.png'
import flagJapan from 'assets/images/icons/japan.png'
import flagAmerican from 'assets/images/icons/united-states-of-america.png'
import flagVietNam from 'assets/images/icons/vietnam.png'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { getLocalStorage, setLocalStorage } from 'utils/localStorage'
import { LANGUAGE } from '../layouts/constant'
import { Language } from 'interface/layout'

const languages: Language[] = [
  { label: 'English', value: 'vn', icon: flagAmerican },
  { label: 'Tiếng Việt', value: 'vi', icon: flagVietNam },
  { label: '日本語', value: 'ja', icon: flagJapan },
  { label: '简体字', value: 'vn', icon: flagChina },
]

export default function SelectLanguage() {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(languages[0])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  React.useEffect(() => {
    const localLanguage = getLocalStorage(LANGUAGE)
    if (localLanguage) {
      handleClose(localLanguage)
    }
  }, [])

  const handleClose = (data: Language) => {
    setAnchorEl(null)
    if (!data.value) return
    i18n.changeLanguage(data.value)
    setLocalStorage(LANGUAGE, data)
    setLanguage(data)
  }

  return (
    <div>
      <Tooltip title={t('language')}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color="primary"
          aria-label=""
        >
          <img src={language.icon} width="25" height="25" />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {languages.map((language, idx) => {
          return (
            <MenuItem key={idx} onClick={() => handleClose(language)}>
              <img
                className="mr-2"
                src={language.icon}
                width="25"
                height="25"
              />
              {language.label}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
