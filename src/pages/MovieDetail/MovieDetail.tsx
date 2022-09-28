
import { ImageList, ImageListItem, ImageListItemBar, Skeleton, Typography } from '@mui/material';
import imgBlur from 'assets/404-error.png';
import { IMovie } from 'interface/Movies';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { setLoading } from 'redux/reducer/commonSlice';
import { getListCasts, getListVideos, getMovieDetailById } from 'services/MovieService';

const MovieDetail = () => {
    const { t } = useTranslation()
    const imgUrl = process.env.REACT_APP_URL_IMG
    const videoUrl = process.env.REACT_APP_URL_YOUTUBE
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState<IMovie>();
    const [casts, setCasts] = useState<any[]>([]);
    const [videos, setVideos] = useState<any[]>([]);
    const dispatch = useAppDispatch()
    useEffect(() => {
        getMovieDetail()
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
                            imgObserver.unobserve(entry.target);
                            loadImages(entry.target);
                        }
                    });
                },
                {
                    threshold: 1
                }
            );

            imageElements.forEach(imageElement => {
                observer.observe(imageElement);
            });
        } else {
            imageElements.forEach(loadImages);
        }
    }, [casts, movieInfo])

    const getMovieDetail = async () => {
        dispatch(setLoading(true))
        try {
            const result: any = await getMovieDetailById(id ?? '')
            const { cast }: any = await getListCasts(id ?? '')
            const { results }: any = await getListVideos(id ?? '')
            setTimeout(() => {
                setMovieInfo(result)
                setCasts(cast)
                setVideos(results)
                dispatch(setLoading(false))

            }, 1000)
        } catch (error: any) {
            const { message } = error
            toast.error(message)
            dispatch(setLoading(false))
        }
    }

    return (
        <div>
            <div className="flex flex-wrap -mx-2 mb-8">
                <div className="w-full lg:w-1/4 px-2 mb-4">
                    <div className="text-sm text-grey-dark flex items-center justify-center">
                        {
                            movieInfo?.poster_path ? <img alt='' src={imgBlur} style={{ height: '65vh', width: '100%', backgroundColor: '#aaa' }} className="lazy_image skeleton object-contain" data-src={`${imgUrl}w342${movieInfo?.poster_path}`} />
                                : <Skeleton variant="rectangular" width={'100%'} height={'65vh'} />
                        }
                    </div>
                </div>
                <div className="w-full lg:w-1/2 px-2">
                    <div className="text-sm text-grey-dark text-left">
                        <Typography variant='h3'>{movieInfo?.title}</Typography>
                        {!movieInfo?.title && <Skeleton variant="text" sx={{ fontSize: '5rem', height: '4rem', width: '20rem' }} />}
                        <Typography variant='h5'>{t('page.movieDetails.overview')}:</Typography>
                        <div className='text-5-line'>{movieInfo?.overview}</div>
                        {!movieInfo?.overview && <Skeleton variant="rounded" width={'100%'} height={100} />}
                        <Typography variant='h6'>{t('page.movieDetails.voteAverage')} : {movieInfo?.vote_average.toFixed(1) || 0}</Typography>
                        <Typography variant='h6'>{t('page.movieDetails.voteCount')} :  {movieInfo?.vote_count || 0}</Typography>
                        <Typography variant='h5'>{t('page.movieDetails.cast')}</Typography>

                        <div className='w-full flex items-center justify-center'>
                            <ImageList
                                style={{ width: '27rem' }}
                                sx={{
                                    gridAutoFlow: "column",
                                    gridTemplateColumns: "repeat(auto-fill,minmax(7rem,1fr)) !important",
                                    gridAutoColumns: "minmax(7rem, 1fr)"
                                }}
                            >
                                {casts.map((item, index) => (
                                    <ImageListItem key={index}>
                                        <img style={{ height: '150px' }} src={`${imgUrl}w342${item.profile_path}`}
                                            onError={({ currentTarget }) => {
                                                currentTarget.src = imgBlur;
                                            }} />
                                        <ImageListItemBar title={item.name} />
                                    </ImageListItem>
                                ))}
                                {!_.size(casts) && <Skeleton variant="rounded" width={'27rem'} height={100} />}
                            </ImageList>
                        </div>
                    </div>
                </div>
                <div className="w-full  lg:w-1/4 px-2 mb-4" >
                    <div className="text-sm text-grey-dark text-left">
                        <Typography variant='h5'>{t('page.movieDetails.trailers')}</Typography>
                        <div style={{ height: '50vh' }} className='overflow-auto'>
                            {
                                videos.map((v, index) => (
                                    <iframe className='p-2 w-full' key={index} title={videoUrl + v.key} src={videoUrl + v.key} allowFullScreen />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default MovieDetail
