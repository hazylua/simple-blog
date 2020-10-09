import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const AboutSite = ({ title, description }) => {
  return (
    <div style={{ maxWidth: "70%", marginRight: "2rem" }}>
      <h3>Home - {title}</h3>
      <div>
        <p>{description}</p>
        <p>
          Reprehenderit id dolore aliquip aute ex commodo non sint elit ad magna
          consequat sunt Lorem.
        </p>
        <p>
          Reprehenderit qui deserunt aliqua dolore nostrud laboris. Amet veniam
          voluptate quis eiusmod culpa. Irure aliqua fugiat nisi sint labore
          non. Est qui eu nulla aliquip labore qui aliquip. Laboris deserunt
          voluptate non aute. Duis do aliquip voluptate reprehenderit mollit
          laborum excepteur amet elit ea occaecat pariatur.
        </p>
      </div>
    </div>
  )
}

const PostHistory = ({ edges }) => {
  return (
    <div>
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

const Banner = ({ image }) => {
  return (
    <img
      alt="home_banner"
      src={image}
      style={{
        height: "15%",
        width: "100%",
        backgroundColor: "rgb(241, 241, 241)",
        objectFit: "cover",
      }}
    />
  )
}

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  const { title, description } = data.site.siteMetadata
  const image = data.image.publicURL

  return (
    <Layout>
      <Banner image={image} />
      <div className="container" style={{ maxWidth: "80%", margin: "auto" }}>
        <div className="row">
          <AboutSite title={title} description={description} />
          <PostHistory edges={edges} />
        </div>
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
