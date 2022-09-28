import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import {
  Button,
  ButtonGroup,
  Card,
  Tooltip
} from '@mui/material';
import imgBlur from 'assets/404-error.png';
import SearchBar from 'components/searchBar/SearchBar';
import { IMovie } from 'interface/Movies';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { setLoading } from 'redux/reducer/commonSlice';
import { getListMovie } from 'services/MovieService';
import { abbreviateNumber } from 'utils/util';
import "./Movies.scss";

type LazyMovie = {
  items: IMovie[],
  hasMore: boolean,
}

const MAX_RECORD = 10000;

const Movies = () => {
  const { t } = useTranslation()
  const imgUrl = process.env.REACT_APP_URL_IMG
  const [mode, setMode] = useState(false)
  const [movies, setMovies] = useState<LazyMovie>({
    items: [],
    hasMore: true,
  })
  const indexPage = useRef(1)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    getListMovies()
  }, [])

  const loadImages = (target: any) => {
    target.src = target.dataset.src;
  };

  useEffect(() => {
    const imageElements = document.querySelectorAll(".lazy_image");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, imgObserver) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-img");
              imgObserver.unobserve(entry.target);
              loadImages(entry.target);
            }
          });
        },
        {
          threshold: 0
        }
      );

      imageElements.forEach(imageElement => {
        observer.observe(imageElement);
      });
    } else {
      imageElements.forEach(loadImages);
    }
  }, [movies.items])

  const handleSwitchMode = () => {
    setMode(!mode)
  }

  const getListMovies = async () => {
    indexPage.current === 1 && dispatch(setLoading(true))
    try {
      indexPage.current += 1;
      const { results }: any = await getListMovie(indexPage.current)
      if (!results) return;
      const data = results.map((item: IMovie) => {
        return {
          ...item,
          poster_path: `${imgUrl}w342${item.poster_path}`
        }
      })
      setMovies({
        items: movies.items.concat(data),
        hasMore: _.size(movies.items) < MAX_RECORD ? true : false,
      })
    } catch (error: any) {
      let { message } = error
      toast.error(message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const showDetailMovie = (value: IMovie) => {
    navigate(`movie/${value.id}`)
  }

  return (
    <div>
      <div className='flex justify-between my-2'>
        <SearchBar />
        <ButtonGroup variant="contained" aria-label="outlined primary button group">

          <Tooltip title={t('page.movies.grid')}>
            <Button variant={mode ? "outlined" : 'contained'} startIcon={<GridViewIcon />} onClick={handleSwitchMode}>
            </Button>
          </Tooltip>
          <Tooltip title={t('page.movies.list')}>
            <Button variant={mode ? "contained" : 'outlined'} startIcon={<ListIcon />} onClick={handleSwitchMode}>
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <InfiniteScroll
        dataLength={movies.items.length}
        next={getListMovies}
        hasMore={movies.hasMore}
        loader={<h4></h4>}
        height={'calc(100vh - 12rem)'}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className={!mode ? "grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2" : 'grid gap-4'}>
          {movies.items.map((item) => (
            <Card sx={{ maxWidth: '100%', display: mode ? 'flex' : '' }} key={item.id} className="cursor-pointer" onClick={() => { showDetailMovie(item) }}>
              <img
                src={imgBlur}
                className="lazy_image skeleton object-contain fade-img"
                style={{ backgroundColor: '#aaa', height: '20vh', width: !mode ? '100%' : '35vw' }}
                data-src={item.poster_path}
                onLoad={(e: any) => {
                  if (e) {
                    setTimeout(() => {
                      e.target.classList.remove('fade-img')
                    }, 1000)
                  }
                }}
                alt="#"
              />
              <div className='p-2.5 w-full h-full'>
                <div className='text-left font-semibold text-1-line'>{item.original_title}</div>
                <p className='text-left m-0 text-2-line text-xs'>{item.overview}</p>
                <div className='flex justify-between mt-1'>
                  <p className='m-0 text-sm opacity-50 self-start'>{item.release_date}</p>
                  <p className='m-0 text-sm opacity-50 self-end'>{abbreviateNumber(item.popularity, 0)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Movies