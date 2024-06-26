import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Users from "./pages/admin/Users";
import Settings from "./pages/Settings";
import Login from "./pages/authentication/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import SideBar from "./ui/SideBar";
import AddProject from "./pages/productOwner/AddProject";
import SignUp from "./pages/authentication/SignUp";
import MyProjects from "./pages/productOwner/MyProjects";
import Requirments from "./features/myprojects/requirments/Requirments";
import MyProjectsLayout from "./ui/MyProjectsLayout";
import Reviews from "./features/myprojects/reviews/Reviews";
import Navbar from "./ui/Navbar";
import Dashboard from "./pages/productOwner/Dashboard";
import AddRequirement from "./features/myprojects/requirments/AddRequirement";
import Layout from "./ui/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import UserInfoContext, { UserInfoProvider } from "./contexts/UserInfoContext";
import PrivateRoute from "./utils/PrivateRoute";
import AddUser from "./features/users/AddUser";
import AddReqWay from "./features/myprojects/requirments/AddReqWay";
import AddReqFile from "./features/myprojects/requirments/AddReqFile";
import AddReviewFile from "./features/myprojects/reviews/AddReviewFile";
import Categories from "./pages/admin/Categories";
import AddCategory from "./features/categories/AddCategory";
import { useState } from "react";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryProjects from "./features/categories/CategoryProjects";
import SourcesList from "./features/myprojects/reviews/SourcesList";
import ProjectDashboard from "./features/dashboard/ProjectDashboard";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const { userInfo } = useState(UserInfoContext);
  const userType = JSON.parse(localStorage.getItem("user"))?.type;
  // console.log(userType);
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <UserInfoProvider>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              <div className="main-layout">
                <Routes>
                  <Route
                    path=""
                    element={<PrivateRoute element={<AppLayout />} />}
                  >
                    <Route index element={<Navigate replace to="/" />} />

                    <Route path="users" element={<Layout />}>
                      <Route index element={<Users />} />
                      <Route path="add-user" element={<AddUser />} />
                    </Route>

                    <Route path="product-owner-dashboard" element={<Layout />}>
                      <Route index element={<Dashboard />} />
                      <Route
                        path=":project_id/:project_title/dashboard"
                        element={<ProjectDashboard />}
                      />
                    </Route>

                    <Route
                      path="admin-dashboard"
                      element={<AdminDashboard />}
                    />
                    <Route path="add-project" element={<AddProject />} />

                    <Route path="my-projects" element={<MyProjectsLayout />}>
                      <Route index element={<MyProjects />} />
                      <Route
                        path=":project_id/:project_title/requirements"
                        element={<Layout />}
                      >
                        <Route index element={<Requirments />} />

                        <Route path="add-requirments" element={<Layout />}>
                          <Route index element={<AddReqWay />} />
                          <Route path="form" element={<AddRequirement />} />
                          <Route path="file" element={<AddReqFile />} />
                        </Route>
                      </Route>
                      <Route
                        path=":project_id/:project_title/reviews"
                        element={<Layout />}
                      >
                        <Route index element={<Reviews />} />
                        <Route path="add-reviews" element={<AddReviewFile />} />
                        <Route path="sources" element={<SourcesList />} />
                      </Route>
                    </Route>
                    <Route path="settings" element={<Settings />} />

                    {/* admin pages */}
                    <Route path="users" element={<Users />} />
                    <Route path="categories" element={<Layout />}>
                      <Route index element={<Categories />} />
                      <Route path="add-category" element={<AddCategory />} />
                      <Route
                        path=":category_id/projects"
                        element={<CategoryProjects />}
                      />
                    </Route>
                  </Route>

                  <Route path="login" element={<Login />} />
                  <Route path="sign-up" element={<SignUp />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            </QueryClientProvider>
          </UserInfoProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
