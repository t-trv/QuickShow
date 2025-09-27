import { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../libs/dateFormat';
import { useAppContext } from '../../context/AppContext';

function ListBookings() {
    const currency = import.meta.env.VITE_CURRENCY;
    const { axios, user, getToken } = useAppContext();

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get('/api/admin/all-bookings', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });

            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error('Error while fetching bookings');
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            getAllBookings();
        }
    }, [user]);

    return !isLoading ? (
        <>
            <Title text1={'List'} text2={'Bookings'} />
            <div className="max-w-4xl mt-6 overflow-x-auto">
                <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
                    <thead>
                        <tr className="bg-primary/20 text-left text-white">
                            <th className="p-2 font-medium pl-5">User Name</th>
                            <th className="p-2 font-medium">Movie Name</th>
                            <th className="p-2 font-medium">Show Time</th>
                            <th className="p-2 font-medium">Seats</th>
                            <th className="p-2 font-medium">Amount</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm font">
                        {bookings.map((item, index) => (
                            <tr key={index} className="border-b border-primary/20 bg-primary/5 even:bg-primary/10">
                                <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
                                <td className="p-2 min-w-45">{item.show.movie.title}</td>
                                <td className="p-2 min-w-45">{dateFormat(item.show.showDateTime)}</td>
                                <td className="p-2 min-w-45">{item.bookedSeats.join(', ')}</td>
                                <td className="p-2 min-w-45">
                                    {currency}
                                    {item.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : (
        <Loading />
    );
}

export default ListBookings;
