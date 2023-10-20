import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Header from "./components/Layout/Header";
import { ProductsProvider } from "./context/ProductContext";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Header />}>
        <Route index element={<ProductPage />} />
      </Route>
      <Route path='/'>
        <Route path='/login' element={<LoginPage />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </QueryClientProvider>
  );
}

export default App;
