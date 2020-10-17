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
  const [results, setResults] = useState([])
  // const [searchPage, setSearchPage] = useState(0)

  // Get all posts.
  const { edges } = data.allMarkdownRemark
  // Get query passed through search from header. If empty, query is "".
  const query = location.state
    ? new RegExp(location.state.query, "i")
    : new RegExp("", "i")

  // Create pages on first render.
  const getSearchResults = () => {
    // Filter through posts by title. Returns an array.
    var searchResults = edges.filter(post =>
      query.test(post.node.frontmatter.title)
    )
    // Set results in page state.
    setResults(searchResults)
  }

  // Runs everytime the query updates.
  useEffect(() => {
    getSearchResults()
  }, [location])

  return (
    <Layout>
      <button onClick={() => console.log(results)}>Big Test Button</button>
      <div className="main-body">
        <h3>Search Results</h3>
        <div>
          {results.map(post => {
            const { title, date, excerpt, path } = post.node.frontmatter
            return (
              <Result
                title={title}
                date={date}
                excerpt={excerpt}
                key={`${date}__${title}`}
                path={path}
              />
            )
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
