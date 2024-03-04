import '../css/Home.css';
import ReactPlayer from 'react-player'
import Swiper1 from './Swiper1';
import Swiper2 from './Swiper2';
import Commend from './Commend';
import Sub from './Sub';
import { Link } from 'react-router-dom';
/* 영상 출처 https://www.youtube.com/watch?v=p-XYgNKT7-o */ 

function Home() {
  return (
    <section className='home'>
      <div className='h_movie'>
      <div className='home_main'>
        <div className='main_inner'>  
        <nav>
          <h3>오펜하이머</h3>
          <p> 천재 과학자의 핵개발 프로젝트.</p>
          <Link to={`/sub/${872585}`}><div>자세히보기</div></Link>
        </nav>  
        <ReactPlayer
          url={'/videoo/[오펜하이머] 세상을 바꾼 순간.mp4'}
          width='1150px'
          height='500px'
          playing={true}
          muted={true}
          controls={true}
          loop={true}
        />
        </div>
      </div>
      <Swiper1/>
      <Swiper2/>
      <Commend/>
      </div>
    </section>
  );
}

export default Home;