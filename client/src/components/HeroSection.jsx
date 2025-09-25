import { Calendar1Icon, Clock } from 'lucide-react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url('/backgroundImage.png')] bg-cover bg-center h-screen">
            <img src={assets.marvelLogo} alt="Marvel Logo" className="max-h-11 lg:h-11 mt-20" />
            <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold f-w-600 max-w-110">
                Guardians <br />
                of the Galaxy
            </h1>

            <div className="flex items-center gap-4 text-gray-300">
                <span>Action | Adventure | Sci-Fi</span>
                <div className="flex items-center gap-1">
                    <Calendar1Icon className="w-4.5 h-4.5" /> 2018
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-4.5 h-4.5" /> 2h 8m
                </div>
            </div>

            <p className="max-w-md text-gray-300">
                In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people
                meet in London and try to stop a conspiracy.
            </p>

            <button
                onClick={() => {
                    navigate('/movies');
                }}
                className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
            >
                Explore Movies
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right w-5 h-5"
                    aria-hidden="true"
                >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
            </button>
        </div>
    );
}

export default HeroSection;
