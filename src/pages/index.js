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
          The posts are written in markdown and generated dynamically using
          Gatsby and React.
        </p>
        <p>
          If you've ever seen a git repository before, you most likely have
          already seen a markdown file in the form of a "README.md". Markdown is
          easy to learn and to write, and it's contents can be converted to
          HTML, which is what this webpage does for each blog post.
        </p>
        <p>With markdown we can have:</p>
        <ul>
          <li>Paragraphs;</li>
          <li>Headings (h1, h2, h3...);</li>
          <li>
            Text decoration (<b>bold</b>, <em>italics</em>,{" "}
            <del>strikethrough</del>)
          </li>
          <li>Links;</li>
          <li>Images;</li>
          <li>Listings;</li>
          <li>Code blocks;</li>
        </ul>
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
