import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const Result = ({ title, date, excerpt, path }) => {
  return (
    <div
      style={{
        borderBottom: "1px dotted rgb(15, 15, 15)",
        marginBottom: "1.45rem",
        paddingBottom: "1rem",
      }}
    >
      <h4 style={{ marginBottom: "1rem", color: "rgb(15, 15, 15)" }}>
        {title}
      </h4>
      <Link
        to={path}
        style={{
          textDecoration: "none",
          color: "rebbecapurple",
        }}
      >
        Read More
      </Link>
    </div>
  )
}

const Search = ({ location, data }) => {
  const { edges } = data.allMarkdownRemark
  const [resultPages, setResultPages] = useState([])
  const query = location.state
    ? new RegExp(location.state.query, "i")
    : new RegExp("", "i")

  const createPages = () => {
    var maxResultsPerPage = 3
    var pageResults = edges.filter(post =>
      query.test(post.node.frontmatter.title)
    )
    var maxNumPages = Math.ceil(pageResults.length / maxResultsPerPage)
    var pageNumber = 1
    for (
      var i = 0;
      i < maxNumPages * maxResultsPerPage;
      i += maxResultsPerPage
    ) {
      pageNumber += 1
      var pagePosts = pageResults.slice(i, maxResultsPerPage + i)
      // console.log(
      //   i,
      //   pagePosts.map(post => post.node.frontmatter.title)
      // )
    }
  }

  useEffect(() => {
    createPages()
  })

  return (
    <Layout>
      <div className="main-body">
        <h3>Search Results</h3>
        <div>
          {edges.map(post => {
            const { title, date, excerpt, path } = post.node.frontmatter
            if (query.test(title)) {
              return (
                <Result
                  title={title}
                  date={date}
                  excerpt={excerpt}
                  key={`${date}__${title}`}
                  path={path}
                />
              )
            }
          })}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query SearchQuery {
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
  }
`

export default Search
