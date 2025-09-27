import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Movies from './pages/Movies';
import SeatLayout from './pages/SeatLayout';
import MyBookings from './pages/MyBookings';
import Favourite from './pages/Favourite';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import AddShows from './pages/admin/AddShows';
import ListShows from './pages/admin/ListShows';
import ListBookings from './pages/admin/ListBookings';
import { useAppContext } from './context/AppContext';
import { SignIn } from '@clerk/clerk-react';
import Loading from './components/Loading';

function App() {
    const isAdminRoute = useLocation().pathname.startsWith('/admin');

    const { user, isAdmin } = useAppContext();

    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} />
            {/* Nếu là admin thì ẩn Navbar */}
            {!isAdminRoute && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/movies/:id/:date" element={<SeatLayout />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/loading/:nextUrl" element={<Loading />} />
                <Route path="/favourite" element={<Favourite />} />
                {isAdmin && (
                    <Route
                        path="/admin/*"
                        element={
                            user && isAdmin ? (
                                <Layout />
                            ) : (
                                <div className="min-h-screen flex justify-center items-center">
                                    <SignIn fallbackRedirectUrl={'/admin'} />
                                </div>
                            )
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="add-shows" element={<AddShows />} />
                        <Route path="list-shows" element={<ListShows />} />
                        <Route path="list-bookings" element={<ListBookings />} />
                    </Route>
                )}
            </Routes>

            {!isAdminRoute && <Footer />}
        </>
    );
}

export default App;
