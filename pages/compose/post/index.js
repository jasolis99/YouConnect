/* eslint-disable no-unused-vars */
import AppLayout from 'components/AppLayout'
import Avatar from 'components/Avatar'
import firebase from 'firebase'
import { addPost } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Compose() {
  const user = useUser()
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addPost({
      user: {
        nickname: 'yamahonda99',
        name: user.displayName,
        avatar: user.photoURL,
        verified: false,
        locked: false,
      },
      display: 'default',
      text: message,
      image: '',
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      app: 'Twitter for Web',
      retweets: 0,
      quotedTweets: 0,
      likes: 0,
      userID: user.uid,
    }).then(() => router.push('/home'))
  }
  return (
    <>
      <AppLayout>
        <div className="contanierCompose">
          <div>
            <Avatar />
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              placeholder="What do you wanna say?"
              value={message}
            ></textarea>
            <button disabled={!message.length}>Enviar</button>
          </form>
        </div>
      </AppLayout>
      <style jsx>
        {`
          .contanierCompose {
            padding: 30px;
            display: flex;
          }
          textarea {
            width: 100%;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom: #ddd 1px solid;
            resize: none;
            min-height: 200px;
            font-family: 'system-ui';
            font-size: 21px;
            padding: 15px;
            outline: none;
          }
          form {
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
