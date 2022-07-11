import { GetServerSideProps } from "next"
import { gql, GraphQLClient } from 'graphql-request'

type video = {
  id: number
  title: string
  slug: string
  descrption: string
  seen: boolean
  tags: string[]
}

const Movie = (video: video) => {
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

export default Movie


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query

  const QUERY_VIDEO = gql`
query querySingleVideo($slug: String! ) {
video(where: { 
  slug: $slug
   }){
    id
    title
    slug
    descrption
    seen
    tags
    mp4 {
        id
        }
    thumbnail {
        id
        }
    platform {
        id
        title
        slug
        }
    }
}

`
  const variables = {
    slug
  }

  const client = new GraphQLClient(process.env.ENDPOINTS, {
    headers: {
      authorization: process.env.GRAPH_CMS_TOKEN
    }
  })

  const data = await client.request(QUERY_VIDEO, variables)
  console.log(data)

  return {
    props: {
      movie: "movie here"
    }
  }
}