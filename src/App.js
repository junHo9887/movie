//비디오 출처 https://www.youtube.com/watch?v=sJJRwXnXi9Q
import Search from './component/Search';
import Header from './component/Header'
import Footer from './component/Footer'
import Home from './component/Home'
import Sub from './component/Sub'
import Loading from './component/Loading';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/Search" element={<Search />} />
        <Route path="/" element={<Home />} />
        <Route path="/sub/:movieId" element={<Sub />} />
        <Route path="/Loading" element={<Loading />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;