import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../css/Home.css';
import { Navigation } from 'swiper/modules';

function Swiper1() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    async function fetchRecommendedMovies() {
      const apiKey = process.env.REACT_APP_API_KEY;
      const language = 'ko-KR';
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=${language}&page=1`
      );
      const best12Movies = response.data.results.slice(0, 12);
      setRecommendedMovies(best12Movies);
    }

    fetchRecommendedMovies();
  }, []);

  return (
    <div className='h_inner'>
      <h1>개봉중인영화</h1>
      <div className='swiper_inner'>
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={5} className="mySwiper">
          {recommendedMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link to={`/sub/${movie.id}`} state={{ movieData: movie }}>
                <div className='h_item'>
                  <nav>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <span>자세히보기</span>
                    <p>{movie.vote_average}</p>
                  </nav>
                  <h2>{movie.title}</h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Swiper1;