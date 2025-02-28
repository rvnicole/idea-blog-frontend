import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./view/Home";
import Account from "./view/Account";
import Config from "./view/Config";
import Post from "./view/Post";
import Profile from "./view/Profile";
import Login from "./view/auth/Login";
import Register from "./view/auth/Register";
import Search from "./view/Search";
import ConfirmAccount from "./view/auth/ConfirmAccount";
import RestorePassword from "./view/auth/RestorePassword";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} index/>
                    <Route path="/account" element={<Account />} />
                    <Route path="/config" element={<Config />}/> 
                    <Route path="/post/:id" element={<Post />}/> 
                    <Route path="/profile/:id" element={<Profile />}/> 
                    <Route path="/search" element={<Search />} />
                </Route>

                <Route element={<AuthLayout />}>
                   <Route path="/auth/login" element={<Login />} />
                   <Route path="/auth/register" element={<Register />} />
                   <Route path="/auth/confirm-account/:id" element={<ConfirmAccount />} />
                   <Route path="/auth/restore-password" element={<RestorePassword />} />
                </Route>
            </Routes>
       </BrowserRouter> 
    )
}