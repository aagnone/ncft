import BlogPreview from '../components/BlogPreview'
import Header from '../components/Header'
import Mission from '../components/Mission'
import Section from '../components/Section'
import { db, postToJSON } from '../lib/firebase'
import Head from 'next/head'
const LIMIT = 5

export default function Home(props) {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>New Castle Federation of Teachers</title>
      </Head>
      <Header />
      <Section>
        <BlogPreview posts={props.posts} />
      </Section>
      <Section fullWidth>
        <Mission />
      </Section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const postsQuery = db
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(postToJSON)

  return {
    props: { posts }, // will be passed to the page component as props
  }
}
