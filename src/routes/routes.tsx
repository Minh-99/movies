import ThemeLayout from 'layouts/ThemeLayout'
import MovieDetail from 'pages/MovieDetail'
import Movies from 'pages/Movies'

const routes = (isLoggedIn: boolean) => [
  {
    path: '/',
    element: <ThemeLayout />,
    children: [
      {
        index: true,
        element: <Movies />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />
      }
    ],
  },
  {
    path: '*',
    element: <div>404 - Not found</div>,
  },
]

export default routes
