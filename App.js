import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './Pages/Home';
import { Error } from './Pages/Error';
import { EmployeeList } from './Pages/EmployeeList'
import { EmployeeProvider } from './Context/EmployeeProvider'; // Importer le fournisseur de contexte
import { Header } from './Componnents/Header';
import { Footer } from './Componnents/Footer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Header /> <Home /> <Footer /></div>,
    errorElement: <Error />,
  },
  {
    path: 'employee-list',
    element: <div><Header /> <EmployeeList /> <Footer /></div>,
    errorElement: <Error />
  }
]);

function App() {

  return (
    // On enveloppe les composants dans le ThemeProvider pour rendre accessible l'état 'theme' dans tout les composants de l'application.
    <EmployeeProvider>
      <div>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </div>
    </EmployeeProvider>
  );
}

export default App;

