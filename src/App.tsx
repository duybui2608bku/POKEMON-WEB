import useRouteElement from "./useRouterElement";
const App = () => {
  const routeElements = useRouteElement();
  return <>{routeElements}</>;
};

export default App;
