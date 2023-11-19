import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EmojiReactions from '../../components/EmojiReactions';
import HeaderSingleAnime from '../../components/HeaderSingleAnime';
import TemporaryError from '../../components/TemporaryError';
import TemporaryLoading from '../../components/TemporaryLoading';
import Button from '../../components/style/Button';
import useMangaReview from '../../hooks/manga/useMangaReviews';
import useSingleManga from '../../hooks/manga/useSingleManga';

const MangaReviews = () => {
    const { mal_id } = useParams()

    const [toggle, setToggle] = useState<Record<string, boolean>>({});

    const { reviews, isLoading, isError, error } = useMangaReview(mal_id ?? '')

    const { manga, isLoading: loadingAnime, isError: isErrorAnime, error: errorAnime } = useSingleManga(mal_id ?? '')

    if (isLoading || loadingAnime) <TemporaryLoading />
    if (isError || error || isErrorAnime || errorAnime) <TemporaryError message={error ?? ''} />

    const noReview = !reviews.length && !isLoading && <h2 className="text-center font-semibold sm:text-3xl text-2xl">0 reviews from api</h2>

    // !(prev[mal_id] || false) digunakan untuk membalik nilai toggle[mal_id]. Jika toggle[mal_id] belum pernah diatur sebelumnya, itu akan dianggap false.
    const handleToggle = (mal_id: string) => {
        setToggle(prev => ({ ...prev, [mal_id]: !(prev[mal_id] || false) }));
    }

    return (
        <section className="secondWrapper">
            <article className="containerAllAnime">
                <div className="containerImageAnime">
                    <HeaderSingleAnime mal_id={mal_id ?? ''} image={manga?.images.webp.image_url ?? ''} />
                </div>
                <div className="containerAnimeReviews">
                    {noReview}
                    {reviews
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 15)
                        .map((r) => {
                            const { user, date, review, mal_id: mal, reactions, score, tags } = r;
                            const { image_url } = user.images.webp;
                            return (
                                <div className="innerAnimeReviews" key={mal}>
                                    <div className="detailsAnimeReviews">
                                        <a href={user.url} target="_blank">
                                            <img src={image_url} alt={user.username} className="profileImg hover:opacity-80 duration-150" />
                                        </a>
                                        <div className="secondDetailsAnimeReviews">
                                            <a href={user.url} target="_blank">
                                                <p className="font-semibold text-xl hover:opacity-80 duration-150 ">{user.username}</p>
                                            </a>

                                            <p className=" ">{date.split("T")[0]}</p>
                                        </div>
                                        <div className=" flex-1 text-end secondDetailsAnimeReviews ">
                                            <p className="text-pinky">Score {score}</p>
                                            <p className=" text-greenish">{tags[0]}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='review'>{`${toggle[mal] ? review : review.slice(0, 668)}...`}</p>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={() => handleToggle(mal.toString())}
                                            className='btn' rounded='xl'>
                                            {toggle[mal] ? 'Show Less' : 'Show More'}
                                        </Button>
                                    </div>
                                    <div className="reactionsContainer">
                                        {<EmojiReactions reactions={reactions} />}
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </article>

        </section >)
}

export default MangaReviews
