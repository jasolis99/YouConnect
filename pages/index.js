import Head from 'next/head'
import { useState } from 'react'
import { GithubLoginButton } from 'react-social-login-buttons'
import AppLayout from 'components/AppLayout'
// import Avatar from 'components/Avatar'
import { loginWithGithub } from 'firebase/client'
import { colors } from 'styles/theme.js'
import useUser from 'hooks/useUser'

export default function Home() {
  const user = useUser()
  // eslint-disable-next-line no-unused-vars
  const [code, setCode] = useState('c810fbb27ae9a60e99f42db02e0e9a26')
  const [showButton, setShowButton] = useState(false)

  const handleClick = () => {
    loginWithGithub()
  }
  const handleChange = (e) => {
    if (e.target.value === code) setShowButton(true)
    else setShowButton(false)
  }
  return (
    <>
      <Head>
        <title>c845d9965c9e42b37b02b53080f50317</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="secretCode">{code}</div>
      <AppLayout>
        <section>
          <img src="/logo.png" />
          <h1>YouConnect</h1>
          <h2>Don´t enter if you don´t know where you are</h2>
          <div>
            {user === null ? (
              <div onClick={handleClick}>
                <GithubLoginButton />
              </div>
            ) : (
              <>
                <div className="code">
                  <h4>
                    Welcome {user.displayName}. Introduce the secret key to
                    access the web.
                  </h4>
                  <input type="text" onChange={handleChange} />
                  {showButton && <button>Access</button>}
                </div>
              </>
            )}
          </div>
        </section>
      </AppLayout>
      <style jsx>
        {`
          .backgroundMatrix {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: 0;
            display: block;
          }
          .secretCode {
            position: absolute;
            top: 65%;
            left: 10%;
            opacity: 0;
          }
          .secretCode:hover {
            opacity: 1;
          }
          .code {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h4 {
            text-align: center;
          }
          input {
            width: 50%;
            padding: 5px;
          }
          section {
            position: relative;
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
            z-index: 99999999;
            padding: 0 15px;
          }
          img {
            width: 300px;
          }
          h1 {
            color: ${colors.primary};
            font-weight: 800;
            margin-bottom: 16px;
          }
          h2 {
            color: ${colors.secondary};
            font-size: 21px;
            margin: 0;
          }
          div {
            margin-top: 16px;
          }
          button {
            margin-top: 15px;
            width: 25%;
          }
        `}
      </style>
    </>
  )
}
