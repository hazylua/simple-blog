import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "src/components/Layout"
import SearchBar from "src/components/SearchBar"

import "./styles/index.css"

const Home = ({ title, description }) => {
  return (
    <div className="home-container light-bg border">
      <h2>Home - {title}</h2>
      <div>
        <p>{description}</p>
      </div>
    </div>
  )
}

const PostHistory = () => {
  const listSize = 3
  return (
    <div className="history-container light-bg border">
      <SearchBar size={30} />
      <h2 className="title-bordered">Post History</h2>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const { title, description } = data.site.siteMetadata

  return (
    <Layout>
      <div className="index-wrapper">
        <Home title={title} description={description} />
        <PostHistory />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default IndexPage
