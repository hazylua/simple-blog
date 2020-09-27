import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  const { title, description } = data.site.siteMetadata

  return (
    <Layout>
      <div className="container">
        <div className="box banner" />
        <div className="row home">
          <div className="box home-landing">
            <h3 className="box__title">Home</h3>
            <div className="box__body">
              <p>{description}</p>
              <p>
                Et cillum ipsum Lorem sunt aliqua sunt amet cupidatat eiusmod
                nostrud.
              </p>
              <p>
                Laborum officia veniam ullamco esse qui. Reprehenderit ea
                ullamco est veniam aliquip veniam adipisicing duis. Laborum quis
                magna mollit dolore in nisi mollit culpa in nostrud.
              </p>
              <p>
                Excepteur eiusmod laboris minim nisi sint excepteur occaecat
                cillum ex pariatur non eiusmod. Nisi adipisicing nostrud
                exercitation ipsum cillum labore enim excepteur qui Lorem. Eu et
                tempor tempor duis sunt sunt. Aute ea voluptate eiusmod non qui
                quis fugiat ad. Labore esse cillum et ut est exercitation. Non
                aliqua ea est dolor ea velit in elit consequat reprehenderit
                mollit.
              </p>
            </div>
          </div>
          <div className="box home-history">
            <h3 className="box__title">Post History</h3>
            <div className="box__body">
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
        </div>
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
