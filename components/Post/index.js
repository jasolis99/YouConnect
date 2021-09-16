import FakeTweet from 'fake-tweet'
import useTimeAgo from 'hooks/useTimeAgo'
import Link from 'next/link'

export default function Posts({ post, status }) {
  if (status) {
    Object.assign(post.date, post.firebaseDate)
  } else {
    const timeago = useTimeAgo(post.firebaseDate)
    post.date = timeago
  }
  return (
    <>
      <Link href={`/status/[id]`} as={`/status/${post.id}`}>
        <a>
          <FakeTweet config={post} />
        </a>
      </Link>
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
        `}
      </style>
    </>
  )
}
