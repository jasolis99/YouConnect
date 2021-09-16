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

export const fetchLastPosts = (callback) => {
  return db
    .collection('posts')
    .orderBy('firebaseDate', 'desc')
    .onSnapshot(({ docs }) => {
      const newPosts = docs.map(mapPostsFromFirebase)
      callback(newPosts)
    })
}
const mapPostsFromFirebase = (doc) => {
  const data = doc.data()
  const id = doc.id
  data.firebaseDate = data.firebaseDate.toDate()
  return {
    id,
    ...data,
  }
}
export const uploadImage = (file) => {
  const storageRef = firebase.storage().ref(`images/${file.name}`)
  const task = storageRef.put(file)
  return task
}
