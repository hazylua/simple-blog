import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const AboutSite = ({ title, description }) => {
  return (
    <div style={{ maxWidth: "35%" }}>
      <h3>Home - {title}</h3>
      <div>
        <p>{description}</p>
      </div>
    </div>
  )
}

const PostHistory = ({ edges }) => {
  return (
    <div style={{ flewGrow: "1.7" }}>
      <h3>Post History</h3>
      <div>
        <div>
          {edges.map(edge => {
            const { frontmatter } = edge.node
            return (
              <div key={frontmatter.path}>
                <Link to={frontmatter.path}>{frontmatter.title}</Link>
                &nbsp;
                <small>
                  {" "}
                  <em>published on</em> {frontmatter.date}
                </small>
                <p>{frontmatter.excerpt}</p>
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
  const image = data.image.publicURL

  return (
    <Layout>
      <img className="banner" alt="home_banner" src={image} />
      <div className="container" style={{ maxWidth: "1000px", margin: "auto" }}>
        {/* <div className="row">
          {" "} */}
        <AboutSite title={title} description={description} />
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
    image: file(base: { eq: "banner.jpg" }) {
      publicURL
    }
  }
`

export default IndexPage
