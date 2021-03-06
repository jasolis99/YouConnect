import styles from './styles.module.css'
import Link from 'next/link'

export default function Avatar({ src, displayName, withName }) {
  return (
    <div className={styles.container}>
      {/* <img className={styles.avatar} src={src} title={displayName} /> */}
      <Link href="/home">
        <a>
          <img
            className={styles.avatar}
            src="https://lh3.googleusercontent.com/ogw/ADea4I4lp6yReB3jXjxFmR-c-gss9uY8XjtA6vcNQBRm=s83-c-mo"
            title={displayName}
          />
          {withName && <strong>{displayName}</strong>}
        </a>
      </Link>
    </div>
  )
}
