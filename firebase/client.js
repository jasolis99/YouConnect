import firebase from 'firebase'
import { firebaseConfig } from './userCredentials'

firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => onChange(user))
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addPost = (info) => {
  return db.collection('posts').add(info)
}

export const fetchLastPosts = () => {
  return db
    .collection('posts')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return {
          id,
          ...data,
        }
      })
    })
}
