import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { bindActionCreators, createStore } from "redux"

import rootReducer from "src/store/reducers"
import { Snackbars } from "src/components/Snackbar"

import Header from "../Header"
import Navbar from "../Navbar"
import Main from "../Main"
import Footer from "../Footer"

import "./Layout.css"

const store = createStore(rootReducer)

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query metadataQuery {
      site {
        siteMetadata {
          title
          repo
        }
      }
    }
  `)

  return (
    <>
      {/* <Snackbars /> */}
      <Header siteTitle={data.site.siteMetadata.title} />
      <Navbar />
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Main children={children} />
        <Footer
          siteTitle={data.site.siteMetadata.title}
          siteRepo={data.site.siteMetadata.repo}
        />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
