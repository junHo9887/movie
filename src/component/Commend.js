import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Commend.css';
import { Navigation } from 'swiper/modules';


function Commend() {
  const [genreMovies, setGenreMovies] = useState({
    Emotion: [],
    action: [],
    horror: [],
  });

  useEffect(() => {
    async function fetchMoviesByGenre() {
      const apiKey =  process.env.REACT_APP_API_KEY;
      const language = 'ko-KR';

      // 감성 장르의 영화 데이터 가져오기
      const EmotionResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&with_genres=18&page=1`
      );

      // 액션 장르의 영화 데이터 가져오기
      const actionResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&with_genres=28&page=1`
      );

      // 공포 장르의 영화 데이터 가져오기
      const horrorResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&with_genres=27&page=1`
      );

      const EmotionMovies = EmotionResponse.data.results.slice(0, 12);
      const actionMovies = actionResponse.data.results.slice(0, 12);
      const horrorMovies = horrorResponse.data.results.slice(0, 12);

      setGenreMovies({
        Emotion: EmotionMovies,
        action: actionMovies,
        horror: horrorMovies,
      });
    }

    fetchMoviesByGenre();
  }, []);

  return (
    <section className='c'>
      <div className='c_inner'>
        <h1>장르별</h1>
        <div className='j_content'>
          {/* 감성 장르 Swiper */}
          <div className='j_box'>
            <nav>감성적인 영화</nav>
            <Swiper slidesPerView={1} loop={true} navigation={true} modules={[Navigation]} className="mySwiper">
              {genreMovies.Emotion.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Link to={`/sub/${movie.id}`} state={{ movieData: movie }}>
                    <div className='j_item'>
                      <nav>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                        />
                        <span>자세히보기</span>
                      </nav>
                      <h2>{movie.title}</h2>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* 액션 장르 Swiper */}
          <div className='j_box'>
            <nav>액션영화</nav>
            <Swiper slidesPerView={1} loop={true} className="mySwiper" navigation={true} modules={[Navigation]}>
              {genreMovies.action.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Link to={`/sub/${movie.id}`} state={{ movieData: movie }}>
                    <div className='j_item'>
                      <nav>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                        />
                        <span>자세히보기</span>
                      </nav>
                      <h2>{movie.title}</h2>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* 공포 장르 Swiper */}
          <div className='j_box'>
            <nav>공포영화</nav>
            <Swiper slidesPerView={1} loop={true} className="mySwiper" navigation={true} modules={[Navigation]}>
              {genreMovies.horror.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Link to={`/sub/${movie.id}`} state={{ movieData: movie }}>
                    <div className='j_item'>
                      <nav>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                        />
                        <span>자세히보기</span>
                      </nav>
                      <h2>{movie.title}</h2>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Commend;