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
import { getAuthUser } from "./utils/localAuth";

const queryClient = new QueryClient();

const user = getAuthUser();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Header />}>
        <Route element={<RouteGuard user={user} />}>
          <Route index element={<ProductPage />} />
        </Route>
      </Route>
      <Route path='/'>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
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
