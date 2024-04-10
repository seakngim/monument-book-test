import React, { useState } from "react";
import LayoutComponet from "../layout";
import { Route, Routes } from "react-router-dom";
import AboutUsComponent from "../component/about-us/aboutUsComponent";
import BookComponent from "../component/book/BookComponent";
import HomeComponent from "../component/home/HomeComponent";
import ContactComponent from "../component/ContactComponent";
import CartComponent from "../component/CartComponent";
import NotFound from "../component/NotFoundComponent";
import SignIn from "../component/auth/SigninComponent";
import SignUp from "../component/auth/SignupComponent";
import AdminComponent from "../component/admin/adminComponent";
import ListAdminComponent from "../component/admin/dashboard";
import DetailComponent from "../component/admin/detailComponent";
import BooksOfTheWeek from "../component/admin/homepage/booksOfTheWeek";
import BestSellingBooks from "../component/admin/homepage/bestSellingBooks";
import Newarrivals from "../component/admin/homepage/newarrivals";
import FeatureAuthor from "../component/admin/homepage/featureAuthor";
import OurActivities from "../component/admin/homepage/ourActivities";
import ProtectedRoute from "./ProtectedRoute";
import ViewComponent from "../component/ViewComponent";
import CheckOutComponent from "../component/CheckOutComponent";
import CreateNewComponent from "../component/admin/createNewComponent";
import ListProduct from "../component/admin/listProduct";
import CreateNewAuthorComponent from "../component/admin/CreateNewAuthorComponent";
import CategoryComponent from "../component/category/CategoryComponent";
import BestSellingComponent from "../component/home/component/BestSellingComponent";
import NewArrivalsComponent from "../component/home/component/NewArrivals";
import CategoriesComponent from "../component/admin/CategoriesComponent";
import BookByCategory from "../component/category/component/BookByCategory";
import OrderComponent from "../component/OrderComponent";
import FavoriteComponent from "../component/FavoriteComponent";
import BookFilterComponent from "../component/book/BookFilterComponent";
import EditeBookComponent from "../component/admin/EditeBookComponent";
import AuthorComponent from "../component/AuthorComponent";
import ViewAuthorComponent from "../component/ViewAuthorComponent"
import UserProfile from "../component/auth/UserProfile";
import EdituserProfile from "../component/auth/EdituserProfile";
import ListAllPurcharse from "../component/admin/ListAllPurcharse";
import AddPurchaseComponent from "../component/admin/AddPurchaseComponent";
import SupplierList from "../component/admin/SupplierListComponent";
import AddSupplierComponent from "../component/admin/AddSupplierComponent";
import SupplierListComponent from "../component/admin/SupplierListComponent";
import EditCardComponent from "../component/credditCard/EditCardComponent";
import { CreditCard } from "../redux/slices/CreditCardSlice";
import CreditCardComponent from "../component/credditCard/CardComponent";
import AuthorListComponent from "../component/admin/AuthorListComponent";
import CategoryCpmponentList from "../component/admin/CategoryCpmponentList";

const RouterComponentPublic = () => {
  const [listData, setListData] = useState();
  const [newData, setNewData] = useState();
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<NotFound URL="/" />} />
      <Route element={<LayoutComponet />}>
        <Route path="/authors" element={<AuthorComponent />} />
        <Route path="/authors/view/:id" element={<ViewAuthorComponent />} />
        <Route path="/book" element={<BookComponent />} />
        <Route path="/book/:filter" element={<BookFilterComponent />} />
        <Route path="/order" element={<OrderComponent />} />
        <Route path="/favorite" element={<FavoriteComponent />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/editProfile" element={<EdituserProfile />} />
        <Route path="/book/view/:id" element={<ViewComponent />} />
        <Route path="/checkout/:id" element={<CheckOutComponent />} />
        <Route path="/card/update/:id" element={<EditCardComponent />} />
        <Route path="/card/add" element={<CreditCardComponent />} />
        <Route path="/about-us" element={<AboutUsComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
        <Route path="/cart" element={<CartComponent />} />
        <Route index path="/" element={<HomeComponent />} />
        <Route index path="/category" element={<CategoryComponent />} />
        <Route index path="/home/best-salling" element={<BestSellingComponent />} />
        <Route index path="/home/new-arrivals" element={<NewArrivalsComponent />} />
        <Route index path="/category/:id" element={<BookByCategory />} />
      </Route>
      <Route element={<ProtectedRoute isLogged={localStorage.getItem("token") ? true : false} />}>

        <Route path="/dashboard" element={<AdminComponent />}>
          <Route index element={<ListAdminComponent listData={listData} setListData={setListData} />} />
          <Route path="detail" element={<DetailComponent />} />
          <Route path="booksOfTheWeek" element={<BooksOfTheWeek />} />
          <Route path="bestSellingBooks" element={<BestSellingBooks />} />
          <Route path="newArrivals" element={<Newarrivals />} />
          <Route path="edit/:id" element={<EditeBookComponent />} />
          <Route path="featureAuthor" element={<FeatureAuthor />} />
          <Route path="ourActivities" element={<OurActivities />} />
          <Route path="list" element={<ListProduct setNewData={setNewData} />} />
          <Route path="createNew" element={<CreateNewComponent setNewData={setNewData} />} />
          <Route path="author" element={<CreateNewAuthorComponent setNewData={setNewData} />} />
          <Route path="author-list" element={<AuthorListComponent setNewData={setNewData} />} />
          <Route path="categorise" element={<CategoriesComponent setNewData={setNewData} />} />
          <Route path="category-list" element={<CategoryCpmponentList setNewData={setNewData} />} />
          <Route path="list-purchase" element={<ListAllPurcharse setNewData={setNewData} />} />
          <Route path="purchase" element={<AddPurchaseComponent setNewData={setNewData} />} />
          <Route path="list-supplier" element={<SupplierListComponent setNewData={setNewData} />} />
          <Route path="supplier" element={<AddSupplierComponent setNewData={setNewData} />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default RouterComponentPublic;
