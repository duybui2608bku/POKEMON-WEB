import { useRoutes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import ListPokemon from './Pages/ListPokemon/ListPokemon'
import Header from './Layouts/Header/Header'
import DetailPokemon from './Pages/DetailPokemon/DetailPokemon'

const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <Header />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: 'pokemon',
          element: <ListPokemon />
        },
        {
          path: ':id',
          index: true,
          element: <DetailPokemon />
        }
      ]
    }
  ])
  return routeElement
}

export default useRouteElement
