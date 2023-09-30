import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Link} from 'react-router-dom'
import 'swiper/css/navigation';
import '../css/Home.css';
import { Navigation } from 'swiper/modules';

function Swiper2() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    async function fetchRecommendedMovies() {
      const apiKey = process.env.REACT_APP_API_KEY;
      const language = 'ko-KR';
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=${language}&page=1`
      );
      const new12Movies = response.data.results.slice(0, 12);
      setRecommendedMovies(new12Movies);
    }

    fetchRecommendedMovies();
  }, []);

  return (
    <div className='h_inner'>
      <h1>베스트10</h1>
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

export default Swiper2;