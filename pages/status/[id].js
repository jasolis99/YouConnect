import Posts from 'components/Post'

export default function PostPage(props) {
  return (
    <>
      <Posts post={props} status />
    </>
  )
}
export async function getServerSideProps(context) {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/posts/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: '/home' }).end()
  }
}
