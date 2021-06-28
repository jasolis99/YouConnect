import AppLayout from 'components/AppLayout'
import Avatar from 'components/Avatar'
import FakeTweet from 'fake-tweet'
import { fetchLastPosts } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'

export default function Home() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()
  useEffect(() => {
    user && fetchLastPosts().then(setTimeline)
    console.log(timeline)
  }, [user])
  return (
    <>
      <AppLayout>
        <div className="header">
          <Avatar />
          <h2>Inicio</h2>
        </div>
        <div>
          {timeline.map((post) => {
            post.date = 'hoy'
            // eslint-disable-next-line react/jsx-key
            return <FakeTweet config={post} />
          })}
        </div>
        <nav>
          <img src="/twitterhome_104282.png" />
          <img src="/search_104498.png" />
        </nav>
      </AppLayout>
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
        `}
      </style>
    </>
  )
}
