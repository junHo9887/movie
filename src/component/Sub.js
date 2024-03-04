import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Sub.css'
import Loading from './Loading';

export default function Sub() {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const language = 'ko-KR'; // 언어 설정을 한국어로 변경
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
        );

        // API에서 받아온 영화 정보를 상태에 설정
        setMovieDetails(response.data);

      } catch (error) {
        console.error('API 데이터를 가져오는 중 오류 발생:', error);
      }
    }

    // 데이터 가져오기 함수 호출
    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <Loading/>;
  }

  return (
    <section className='Sub'>
      <div className='inner'>
      <nav>
      <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}/>
      </nav>
        <div className='h_item'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          <div className='right'>
          <h2>{movieDetails.title}</h2>
          <p>평점: {movieDetails.vote_average}</p>

          {/* 감독, 프로듀서, 배우, 장르, 개봉일, 작품 줄거리 등을 여기에서 활용 */}
          <p>장르: {movieDetails.genres ? movieDetails.genres.map(genre => genre.name).join(', ') : '정보 없음'}</p>
          <p>개봉일: {movieDetails.release_date}</p>
          <p>작품 줄거리: {movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </section>
  );
}