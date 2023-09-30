import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../css/Search.css';
import { Link } from 'react-router-dom';

function Search() {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  // useLocation 훅을 사용하여 현재 URL의 쿼리 매개변수를 가져옵니다.
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    async function fetchRecommendedMovies() {
      const apiKey = 'a8ae0e2315e7873b57ce202808bb57d6';
      const language = 'ko-KR';
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=${language}&page=1`
      );
      const new12Movies = response.data.results.slice(0, 12);
      setRecommendedMovies(new12Movies);
    }

    fetchRecommendedMovies();

    // 검색어가 쿼리 매개변수로 전달되었을 때 검색 수행
    if (searchQuery) {
      searchMovies(searchQuery);
    }
  }, [searchQuery]); // searchQuery가 변경될 때마다 useEffect가 실행됩니다.

  const searchMovies = async (searchQuery) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const language = 'ko-KR';
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=${language}`
    );
    const filteredMovies = response.data.results.filter((movie) => movie.vote_average < 19);

    setMovies(filteredMovies);
  };
  return (
    <div className='movie'>
      <div className='inner'>
        <h1>영화 검색</h1>
        <ul className='ul'>
          {movies.map((movie) => (
            <Link to={`/sub/${movie.id}`} state={{ movieData: movie }} key={movie.id}>
              <li>
                <nav>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <span>자세히보기</span>
                </nav>
                <h2>{movie.title}</h2>
                <p>평점: {movie.vote_average}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;