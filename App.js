import './App.css';
// import { Counter } from './counter';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './Pages/Home';
import { Error } from './Pages/Error';
import { EmployeeList } from './Pages/EmployeeList'
import { ThemeProvider } from './Context/ThemeProvider'; // Importer le fournisseur de contexte

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: 'employee-list',
    element: <EmployeeList />,
    errorElement: <Error />
  }
]);

function App() {

  return (
    // On enveloppe les composants dans le ThemeProvider pour rendre accessible l'état 'theme' dans tout les composants de l'application.
    <ThemeProvider>
      <div>
        <div className="App">
          {/* <Counter /> */}
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
