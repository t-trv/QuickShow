import { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import { CheckIcon, Delete, StarIcon } from 'lucide-react';
import { kConverter } from '../../libs/kConverter';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

function AddShows() {
    const currency = import.meta.env.VITE_CURRENCY;
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [dateTimeSelection, setDateTimeSelection] = useState({});
    const [dateTimeInput, setDateTimeInput] = useState('');
    const [showPrice, setShowPrice] = useState('');
    const [addingShow, setAddingShow] = useState(false);

    const { axios, user, getToken, img_base_url } = useAppContext();

    const fetchNowPlayingMovies = async () => {
        try {
            const { data } = await axios.get('/api/show/now-playing', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });

            if (data.success) {
                setNowPlayingMovies(data.movies);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDateTimeAdd = () => {
        if (!dateTimeInput) return toast.error('Please select date and time first!');
        const [date, time] = dateTimeInput.split('T');
        if (!date || !time) return toast.error('Missing date or time, please select again!');

        setDateTimeSelection((prev) => {
            const times = prev[date] || [];
            if (!times.includes(time)) {
                toast.success('Successfully!');
                return { ...prev, [date]: [...times, time] };
            }

            toast.success('Successfully!');
            return prev;
        });
    };

    const handleRemoveTime = (date, time) => {
        setDateTimeSelection((prev) => {
            const filteredTimes = prev[date].filter((t) => t !== time);
            if (filteredTimes.length === 0) {
                const { [date]: _, ...rest } = prev;
                return rest;
            }
            return {
                ...prev,
                [date]: filteredTimes,
            };
        });
    };

    const hanldeSubmit = async () => {
        try {
            setAddingShow(true);

            if (!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice) {
                return toast.error('Missing required field!');
            }

            const showsInput = Object.entries(dateTimeSelection).map(([date, time]) => ({
                date,
                time,
            }));

            const payload = {
                movieId: selectedMovie,
                showsInput,
                showPrice: Number(showPrice),
            };

            console.log(payload);

            const { data } = await axios.post('/api/show/add', payload, {
                headers: { Authorization: `Bearer ${await getToken()}` },
            });

            if (data.success) {
                toast.success(data.message);
                setSelectedMovie(null);
                setDateTimeSelection({});
                setShowPrice('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log('Submission error: ', error);
            toast.error('Submission error, please try again!');
        }

        setAddingShow(false);
    };

    useEffect(() => {
        if (user) {
            fetchNowPlayingMovies();
        }
    }, [user]);

    return nowPlayingMovies.length > 0 ? (
        <>
            <Title text1={'Add'} text2={'Shows'} />
            <p className="mt-10 text-lg font-medium">Now Playing Movies </p>

            <div className="overflow-x-auto pb-4">
                <div className="group flex flex-wrap gap-4 mt-4 w-max">
                    {nowPlayingMovies.map((movie) => (
                        <div
                            onClick={() => setSelectedMovie(movie.id)}
                            key={movie.id}
                            className="relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 "
                        >
                            <div className="relative rounded-lg overflow-hidden">
                                <img
                                    src={`${img_base_url}${movie.poster_path}`}
                                    alt="Show image"
                                    className="w-full object-cover brightness-90"
                                />
                                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                                    <p className="flex items-center gap-1 text-gray-400">
                                        <StarIcon className="lucide lucide-star w-4 h-4 text-primary fill-primary" />
                                        {movie.vote_average.toFixed(1)}
                                    </p>
                                    <p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>
                                </div>
                            </div>
                            {selectedMovie === movie.id && (
                                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                                    <CheckIcon className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            )}
                            <p className="font-medium truncate">{movie.title}</p>
                            <p className="text-gray-400 text-sm">{movie.release_date}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Show Price */}
            <div className="mt-8">
                <label htmlFor="" className="block text-sm font-medium mb-2">
                    Show Price
                </label>
                <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
                    <p className="text-gray-400 text-sm">{currency}</p>
                    <input
                        onChange={(e) => setShowPrice(e.target.value)}
                        min={0}
                        placeholder="Enter show price"
                        className="outline-none"
                        type="number"
                        value={showPrice}
                    />
                </div>
            </div>

            {/* Date and time select */}
            <div className="mt-6">
                <label htmlFor="" className="block text-sm font-medium mb-2">
                    Select Date and Time
                </label>
                <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
                    <input
                        type="datetime-local"
                        value={dateTimeInput}
                        onChange={(e) => setDateTimeInput(e.target.value)}
                        className="outline-none rounded-md"
                    />
                    <button
                        onClick={handleDateTimeAdd}
                        className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
                    >
                        Add Time
                    </button>
                </div>
            </div>

            {/* Display selected times */}
            {Object.keys(dateTimeSelection).length > 0 && (
                <div className="mt-6">
                    <h2 className="mb-2">Selected Date-Time</h2>
                    <ul className="space-y-3">
                        {Object.entries(dateTimeSelection).map(([date, times]) => (
                            <li key={date}>
                                <div className="font-medium">{date}</div>
                                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                                    {times.map((time) => (
                                        <div
                                            key={time}
                                            className="border border-primary px-2 py-1 flex items-center rounded"
                                        >
                                            <span>{time}</span>
                                            <Delete
                                                onClick={() => handleRemoveTime(date, time)}
                                                className=" ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                                                strokeWidth={2}
                                                width={15}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={hanldeSubmit}
                disabled={addingShow}
                className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
            >
                Add Show
            </button>
        </>
    ) : (
        <div></div>
    );
}

export default AddShows;
