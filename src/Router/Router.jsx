import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Services from "../components/Services/Services";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Myservice from "../components/Myservice/Myservice";
import AddService from "../components/AddService/AddService";
import MyBookings from "../components/MyBookings/MyBookings";
import Profile from "../components/Profile/Profile";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:'/services',
                element:<Services></Services>,
                loader:() => fetch('http://localhost:5000/services')
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/my-service',
                element:<PrivateRoute>
                    <Myservice></Myservice>
                </PrivateRoute>
            },
            {
                path:'/add-service',
                element:<PrivateRoute>
                    <AddService></AddService>
                </PrivateRoute>
            },
            {
                path:'/my-bookings',
                element: <PrivateRoute>
                    <MyBookings></MyBookings>
                </PrivateRoute>
            },
            {
                path:'/profile',
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>
            }
        ]
    }
])