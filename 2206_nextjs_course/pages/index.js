import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id,title) => {
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      `/movies/${id}` //유저에게 보일 url -> 쿼리스트링이 url에 다 드러나는 것을 막는 것
    );
  };

  return (
    <div className="container">
      <Seo title="Home" />
        {results?.map((movie) => (
          // 영화 이미지를 클릭했을 때 이동/
          <div  
            onClick={() => onClick(movie.id, movie.original_title)}
            className="movie" 
            key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          
          {/* 영화 텍스트를 클릭했을 때 이동 */}
          <h4> 
            <Link href={{
                pathname: `/movies/${movie.id}`,
                query: {title: movie.original_title,},
              }}
              as={`/movies/${movie.id}`}
              >
              <a>{movie.original_title}</a>
            </Link>
            </h4>
          </div>
        ))}
        <style jsx>{`
            .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 20px;
            gap: 20px;
            }
            .movie img {
            max-width: 100%;
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            }
            .movie:hover img {
            transform: scale(1.05) translateY(-10px);
            }
            .movie h4 {
            font-size: 18px;
            text-align: center;
            }
          `}</style>    
    </div>
  );
}

// 이 함수는 이름이 고정이다. 다른 이름을 쓸 수 없다.
// 서버에서 실행된다. 그리고 리턴하는 값을 page에게 준다.
export async function getServerSideProps() {
    const { results } = await (
      await fetch(`http://localhost:3000/api/movies`)
    ).json();
    return {
      props: {
        results,
      },
    };
  }
