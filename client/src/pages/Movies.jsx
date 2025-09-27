import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import { useAppContext } from '../context/AppContext';

function Movies() {
    const { axios, user, getToken } = useAppContext();

    const [shows, setShows] = useState([]);

    const fetchShowsData = async () => {
        const { data } = await axios.get('/api/show/all', {
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
        });
        if (data.success) {
            setShows(data.shows);
        } else {
            toast.error('Error while fetching active shows');
        }
    };

    useEffect(() => {
        fetchShowsData();
    }, [user]);

    return shows.length > 0 ? (
        <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
            <BlurCircle top="150px" left="0px" />
            <BlurCircle bottom="50px" right="50px" />
            <h1 className="text-lg font-medium my-4">Now Showing</h1>
            <div className="flex flex-wrap max-sm:justify-center gap-8">
                {shows.map((show) => (
                    <MovieCard movie={show} key={show._id} />
                ))}
            </div>
        </div>
    ) : (
        <div>
            <h1 className="text-3xl font-bold text-center">No movies available</h1>
        </div>
    );
}

export default Movies;
