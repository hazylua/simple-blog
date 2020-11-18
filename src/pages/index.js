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

const PostHistory = ({ edges }) => {
  const listSize = 3
  return (
    <div className="history-container light-bg border">
      <SearchBar size={30} />
      <h2 className="title-bordered">Post History</h2>
      <div>
        <p>
          <small>
            Showing the latest {listSize} posts. Check out the{" "}
            <Link to="/blog">blog</Link> page for more!
          </small>
        </p>
        <div>
          {edges.slice(0, listSize).map(edge => {
            const { frontmatter } = edge.node
            return (
              <div key={frontmatter.path}>
                <Link to={frontmatter.path}>{frontmatter.title}</Link>
                &nbsp;
                <br />
                <small>
                  {" "}
                  <em>published on</em> {frontmatter.date}
                </small>
                <p>{frontmatter.excerpt}</p>
                <div className="rule fade-bg"></div>
                <br />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  const { title, description } = data.site.siteMetadata

  return (
    <Layout>
      <div className="index-wrapper">
        <Home title={title} description={description} />
        <PostHistory edges={edges} />

        {/* </div> */}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default IndexPage
