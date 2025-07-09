import { Routes, Route } from "react-router-dom";
import Authlayout from "./components/auth/layout";
import Authlogin from "./pages/auth/login";
import Authregister from "./pages/auth/register";
import Adminlayout from "./components/admin/layout";
import Admindashboard from "./pages/admin/dashboard";
import Adminfeatures from "./pages/admin/features";
import Adminorders from "./pages/admin/orders";
import Adminproducts from "./pages/admin/products";
import CheckAuth from "./common/check-auth";

import Shoppinglayout from "./components/shopping-view/layout";
import Shophome from "./pages/shopping-view/home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import ShopAccount from "./pages/shopping-view/account";
import ShopCheckout from "./pages/shopping-view/checkout";
import ShopListing from "./pages/shopping-view/listing";
import ShopPaymentSuccess from "./pages/shopping-view/payment-success";
import ShopPaypalReturn from "./pages/shopping-view/paypal-return";
import ShopSearch from "./pages/shopping-view/search";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if(isLoading) return <Skeleton className="h-[20px] w-[100px] rounded-full" />;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Authlayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Authlogin />} />
          <Route path="register" element={<Authregister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Adminlayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Admindashboard />} />
          <Route path="features" element={<Adminfeatures />} />
          <Route path="orders" element={<Adminorders />} />
          <Route path="products" element={<Adminproducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Shoppinglayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Shophome />} />
          <Route path="account" element={<ShopAccount/>} />
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="listing" element={<ShopListing />} />
          <Route path="payment" element={<ShopPaymentSuccess />} />
          <Route path="paypal" element={<ShopPaypalReturn />} />
          <Route path="search" element={<ShopSearch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
