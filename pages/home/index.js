import Avatar from 'components/Avatar'
import Posts from 'components/Post'
import { fetchLastPosts } from 'firebase/client'
import useUser from 'hooks/useUser'
import HomeIcon from 'Icons/home'
import NewPost from 'Icons/newPost'
import Search from 'Icons/search'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()
  useEffect(() => {
    if (user) {
      const unsuscribe = fetchLastPosts(setTimeline)
      return () => unsuscribe && unsuscribe()
    }
  }, [user])
  return (
    <>
      <div className="header">
        <Avatar />
        <h2>Inicio</h2>
      </div>
      <div>
        {timeline.map((post) => {
          // eslint-disable-next-line react/jsx-key
          return <Posts post={post} />
        })}
      </div>
      <nav>
        <Link href="/home">
          <a>
            <HomeIcon width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/home">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/post">
          <a>
            <NewPost width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
      <style jsx>
        {`
          .header {
            position: sticky;
            top: 0;
            width: 100%;
            display: flex;
            align-items: center;
            padding: 5px;
            border-bottom: #bbb 1px solid;
            background-color: #fff;
          }
          h2 {
            margin-left: 1rem;
          }
          nav {
            position: sticky;
            bottom: 0;
            height: 50px;
            width: 100%;
            border-top: #bbb 1px solid;
            padding: 10px 0;
            display: flex;
            justify-content: space-around;
            background-color: #fff;
          }
          nav a:hover {
            background: radial-gradient(#0099ff22 15%, transparent 16%);
            background-size: 180px 180px;
            background-position: center;
          }
        `}
      </style>
    </>
  )
}
