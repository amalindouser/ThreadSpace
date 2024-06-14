import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddThread from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import Homepage from './pages/Homepage'; // Ensure this matches the export in Homepage.jsx
import Login from './pages/LoginPage';
import NotFound from './components/NotFoundThread';
import Register from './pages/RegisterPage';
import Authentication from './components/Authentication';

const queryClient = new QueryClient();

const routes = createRoutesFromElements(
  <Route path="/" errorElement={<NotFound />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route element={<Authentication />}>
      <Route index element={<Homepage />} />
      <Route path="thread/:id" element={<DetailPage />} />
      <Route path="add" element={<AddThread />} />
    </Route>
  </Route>,
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
