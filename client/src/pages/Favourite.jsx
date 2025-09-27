import React from 'react';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import { useAppContext } from '../context/AppContext';

function Favourite() {
    const { favouriteMovies } = useAppContext();

    return favouriteMovies.length > 0 ? (
        <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
            <BlurCircle top="150px" left="0px" />
            <BlurCircle bottom="50px" right="50px" />
            <h1 className="text-lg font-medium my-4">Your Favourite Movies</h1>
            <div className="flex flex-wrap max-sm:justify-center gap-8">
                {favouriteMovies.map((show) => (
                    <MovieCard movie={show} key={show._id} />
                ))}
            </div>
        </div>
    ) : (
        <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[20vh]">
            <h1 className="text-3xl font-bold text-center">No favourite movies available</h1>
        </div>
    );
}

export default Favourite;
