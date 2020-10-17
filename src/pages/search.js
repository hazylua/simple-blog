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
  const [searchPage, setSearchPage] = useState(1)
  const maxResultsPerPage = 3

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
      <button
        style={{
          backgroundColor: "#ebebeb",
          border: "solid 2px black",
          marginRight: "10px",
          borderRadius: "2px",
          width: "50px",
          fontFamily: "Segoe UI",
        }}
        onClick={() => setSearchPage(pageValue)}
      >
        {pageValue}
      </button>
    )
  }

  const PageRow = ({ maxResultsPerPage, queryResultNum }) => {
    var buttons = []
    for (var i = 1; i <= Math.ceil(queryResultNum / maxResultsPerPage); i++) {
      buttons.push(<PageSelect pageValue={i} />)
    }
    return (
      <div>
        {buttons.map(button => {
          return button
        })}
      </div>
    )
  }

  return (
    <Layout>
      <div className="main-body">
        <h3>Search Results</h3>
        <div>
          {results
            .filter((item, i) => {
              return (
                i >= maxResultsPerPage * (searchPage - 1) &&
                i < searchPage * maxResultsPerPage
              )
            })
            .map(post => {
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
          <button onClick={() => setSearchPage(searchPage + 1)}>
            Next Page
          </button>{" "}
          <button onClick={() => setSearchPage(searchPage - 1)}>
            Previous Page
          </button>
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
