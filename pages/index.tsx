import React from 'react'
import styles from '../styles/Home.module.css'
import { gql, GraphQLClient } from 'graphql-request'


const QUERY_VIDEOS = gql`
query VideosQuery {
  videos{
    id
    publishedAt
    createdAt
    title
    slug
    descrption
    seen
    tags
    createdBy {
      id
    }
    mp4 {
      id
    }
    thumbnail {
      fileName
      id
      url
    }
    platform{
      id
      title
      slug 
    }

  }
}
`

type videoTypes = {
  id: number
  title: string
  slug: string
  descrption: string
  seen: boolean
  thumbnail: {
    id: string
  }
}


const Home = ({ videos }) => {

  console.log(videos);

  const randomVideo = (videos: any) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  return (
    <>
      <div>
        <img
          src={randomVideo(videos).thumbnail.url}
          alt={randomVideo(videos).thumbnail.title} />
      </div>

      <div className={styles.movieFeed}>

      </div>
    </>
  )
}


export const getStaticProps = async () => {

  const client = new GraphQLClient(process.env.ENDPOINTS, {
    headers: {
      authorization: process.env.GRAPH_CMS_TOKEN
    }
  })
  const data = await client.request(QUERY_VIDEOS)

  return {
    props: {
      videos: data.videos
    }
  }
}

export default Home