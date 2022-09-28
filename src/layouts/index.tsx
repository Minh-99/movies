import { PaletteMode } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from 'App'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

const Layout = () => {
  const isDark = useAppSelector((state) => state.common.dark)

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {

        }
        : {

        }),
    },
  })

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(isDark ? 'dark' : 'light'),
        breakpoints: {
          values: {
            xs: 0,
            sm: 400,
            md: 600,
            lg: 900,
            xl: 1200,
          },
        },
      }),
    [isDark]
  )
  const { name } = useParams()

  useEffect(() => {
    console.log(name)
  }, [name])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

export default Layout
