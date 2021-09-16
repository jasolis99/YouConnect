/* eslint-disable no-unused-vars */
import Avatar from 'components/Avatar'
import firebase from 'firebase'
import { addPost, uploadImage } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Compose() {
  const months = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dec',
  ]

  const user = useUser()
  const [message, setMessage] = useState('')
  const [dragging, setDragging] = useState(false)
  const [image, setImage] = useState(null)
  const [imageToSend, setImageToSend] = useState(null)
  const router = useRouter()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }
  const getMinutes = (d) => {
    if (d.getMinutes().length < 2) return '0' + d.getMinutes()
    else return d.getMinutes()
  }

  const handleDragEnter = (e) => {
    setDragging(true)
  }
  const handleDragLeave = (e) => {
    setDragging(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    setImageToSend(e.dataTransfer.files[0])
    setImage(URL.createObjectURL(e.dataTransfer.files[0]))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const d = new Date()
    let task = null
    if (imageToSend) {
      task = uploadImage(imageToSend)
    }
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
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
            image: url,
            date: (
              d.getHours() +
              ':' +
              getMinutes(d) +
              ' · ' +
              d.getUTCDate() +
              ' ' +
              months[d.getMonth()] +
              ' ' +
              d.getFullYear()
            ).toString(),
            firebaseDate: firebase.firestore.Timestamp.fromDate(new Date()),
            app: 'Twitter for Web',
            retweets: 0,
            quotedTweets: 0,
            likes: 0,
            userID: user.uid,
          }).then(() => router.push('/home'))
        })
      }
      task.on('state_changed', onProgress, onError, onCompleted)
    } else {
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
        image: null,
        date: (
          d.getHours() +
          ':' +
          getMinutes(d) +
          ' · ' +
          d.getUTCDate() +
          ' ' +
          months[d.getMonth()] +
          ' ' +
          d.getFullYear()
        ).toString(),
        firebaseDate: firebase.firestore.Timestamp.fromDate(new Date()),
        app: 'Twitter for Web',
        retweets: 0,
        quotedTweets: 0,
        likes: 0,
        userID: user.uid,
      }).then(() => router.push('/home'))
    }
  }

  return (
    <>
      <div className="containerCompose">
        <div>
          <Avatar />
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="What do you wanna say?"
            value={message}
          ></textarea>
          {image && <img src={image} />}
          <button disabled={!message.length}>Enviar</button>
        </form>
      </div>
      <style jsx>
        {`
          .containerCompose {
            padding: 30px;
            display: flex;
          }
          textarea {
            width: 100%;
            border: ${dragging === true
              ? '3px dashed #09f'
              : '3px solid transparent'};
            border-radius: 10px;
            resize: none;
            min-height: 200px;
            font-family: 'system-ui';
            font-size: 21px;
            padding: 15px;
            outline: none;
          }
          img {
            border-radius: 10px;
            height: auto;
            width: 100%;
          }
          form {
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
