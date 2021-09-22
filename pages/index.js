import BlogPreview from '../components/BlogPreview'
import Header from '../components/Header'
import Mission from '../components/Mission'
import Section from '../components/Section'
import {db, postToJSON} from '../lib/firebase'
const LIMIT = 5

export default function Home(props) {
  return (
    <div className="overflow-hidden">
      <Header />
      <Section>
        <BlogPreview posts={props.posts}/>
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
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}