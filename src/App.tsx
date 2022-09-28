import { USER } from 'constants/common'
import { useRoutes } from 'react-router-dom'
import routes from 'routes/routes'
import { getLocalStorage } from 'utils/localStorage'
import BarLoader from 'react-spinners/BarLoader'
import './App.scss'
import { CSSProperties } from 'react'
import { useAppSelector } from 'redux/hooks'

const override: CSSProperties = {
  width: '100%',
  zIndex: 10001,
  position: 'absolute',
  top: '0px',
}

function App() {
  const isAuthentication = getLocalStorage(USER)
  const routing = useRoutes(routes(isAuthentication))
  const loading = useAppSelector((state) => state.common.loading)

  return (
    <div className="App">
      <BarLoader color="#dc3545" loading={loading} cssOverride={override} />
      {routing}
    </div>
  )
}

export default App
