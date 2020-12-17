import React, { useState } from "react"
import { graphql, Link, navigate } from "gatsby"

import Layout from "src/components/Layout"
import SearchBar from "src/components/SearchBar"

import "./styles/index.css"

const Home = ({ title, description }) => {
  return (
    <div className="home-container light-bg border">
      <h2>Home - {title}</h2>
      <div className="home__description">
        <p>{description}</p>
      </div>
      <div className="info__body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan
          quam vel justo semper, eget pharetra diam aliquam. Integer nec tortor
          at dui tempor auctor. Maecenas nibh nisl, volutpat at sapien ac,
          laoreet eleifend nisi.
        </p>
        <p>
          Duis sollicitudin lectus pharetra metus hendrerit, et sagittis neque
          egestas. Quisque porttitor, velit ac volutpat aliquet, lorem sapien
          fermentum ligula, ut dictum risus ipsum id ante. Pellentesque
          fringilla venenatis ante, condimentum blandit purus. Nunc facilisis,
          nibh vel sagittis rhoncus, urna nunc feugiat nisl, id dictum lorem ex
          id arcu.
        </p>
        <p>
          Aenean blandit eleifend pellentesque. Quisque ultricies finibus diam,
          vitae tempor leo aliquet at.
        </p>
        <p>
          Nulla nec tortor lectus. Aenean placerat, mi vitae maximus egestas,
          sapien lacus condimentum mauris, eget elementum diam lorem vitae
          turpis.
        </p>
        <p>
          Vestibulum sed iaculis dui. Fusce dignissim eros est, semper sagittis
          nulla congue eget. Sed tincidunt facilisis maximus.
        </p>
      </div>
    </div>
  )
}

const PostHistory = ({ edges }) => {
  const [query, setQuery] = useState("")

  const handleEnterDown = e => {
    console.log(e.target)
    if (e.key === "Enter") {
      e.preventDefault()
      navigate("/search", { state: { query } })
    }
  }

  const handleChange = e => {
    console.log(e.target)
    setQuery(e.target.value)
  }

  const listSize = 3
  return (
    <div className="history-container light-bg border">
      <SearchBar
        handleChange={e => handleChange(e)}
        handleEnterDown={e => handleEnterDown(e)}
        size={30}
      />
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
            const { path } = edge.node
            const { title, date } = edge.node.context
            return (
              <div className="history-post" key={path}>
                <Link to={path}>{title}</Link>
                <small>
                  <p>{date}</p>
                </small>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const { title, description } = data.site.siteMetadata
  const { edges } = data.allSitePage

  return (
    <Layout>
      <div className="index-wrapper">
        <Home title={title} description={description} />
        <PostHistory edges={edges} />
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
    allSitePage(filter: { path: { regex: "/posts/" } }) {
      edges {
        node {
          id
          path
          context {
            slug
            title
            date
            author
          }
        }
      }
    }
  }
`

export default IndexPage
