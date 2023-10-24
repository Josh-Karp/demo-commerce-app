import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Header from "./components/Layout/Header";
import RouteGuard from "./components/RouteGuard";
import { ProductsProvider } from "./context/ProductContext";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Header />}>
        <Route element={<RouteGuard />}>
          <Route index element={<ProductPage />} />
        </Route>
      </Route>
      <Route path='/auth'>
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/register' element={<RegisterPage />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <RouterProvider router={router} />
        <Toaster position='top-center' />
      </ProductsProvider>
    </QueryClientProvider>
  );
}

export default App;
