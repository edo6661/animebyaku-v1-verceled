import { motion } from 'framer-motion';
import { IoStarSharp } from 'react-icons/io5';
import { Genre } from '../type';
type Props = {
    hover?: boolean;
    episodes?: number;
    rank?: number;
    source?: string;
    type?: string;
    year?: number;
    score?: number;
    status?: string;
    chapters?: number;
    genres?: Genre[]
    studios?: Genre[]
    title: string;
    votes?: number
    favorites?: number
}
const HomeImageHovered = ({ hover, episodes, rank, source, type, year, score, status, chapters, genres, studios, title, votes, favorites }: Props) => {
    const divVars = {
        hidden: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { duration: 0.2, delay: 0.2 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, delay: 0.2 }
        }
    }

    const hovered = hover ? 'hoveredImgAnime sm:-bottom-26  ' : 'hidden'

    return (
        <motion.div
            className={`${hovered} `}
            variants={divVars}
            initial="hidden"
            animate={hover ? "animate" : "hidden"}
            exit="exit"
        >
            <p className='hoverImageTitle'>{title} </p>
            <hr className='my-1' />
            {episodes !== null && type !== '' && <p>{episodes} {type}</p>}
            {source !== '' && <p>{source}</p>}
            {studios?.length && <p>{studios[0].name}</p>}
            {status?.length && <p>Status {status}</p>}
            {chapters && <p>Chapters {chapters}</p>}
            {year && <p>{year}</p>}
            {votes && (
                <p>{votes}</p>
            )}
            {favorites && (
                <p>{favorites} Fav</p>
            )}
            <div className='genres'>
                {genres?.length && genres?.map((genre) =>
                    <span key={genre.mal_id} className='text-center'>{genre.name.split(" ").join(", ")}</span>
                )}
            </div>
            {rank && rank && rank !== null && score !== null && score && (
                <div className="flexBetween items-center ">
                    <p>#{rank}</p>
                    <div className='relative right-0 flex items-center'>
                        <IoStarSharp size={18} />
                        <p className='ml-1'>{score}</p>
                    </div>
                </div>
            )}

        </motion.div>
    )
}

export default HomeImageHovered