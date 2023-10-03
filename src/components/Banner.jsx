import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import axios from "../api/axios";
import "./Banner.css";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    console.log("request:", request);
    // 여러 영화 중 영화 하나의 ID를 가져오기
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;
    // 특정 영화의 더 상세한 정보를 가져오기 ( 비디오 정보도 포함 )
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" }, //mvdb에서 설정한 값
    });
    setMovie(movieDetail);
  };
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  if (isClicked) {
    return (
      <Container>
        <HomeContainer>
          clicked
        </HomeContainer>
      </Container>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
            : "",
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>
          <div className="banner__buttons">
            {movie.videos?.results[0]?.key && (
              <button className="banner__button play" onClick={() => setIsClicked(true)}>
                play
              </button>
            )}
          </div>
          <p className="banner__description">{truncate(movie.overview, 100)}</p>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  }
};

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
