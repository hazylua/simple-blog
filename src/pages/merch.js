import React from "react"
import Layout from "../components/layout"
const Merch = () => {
  return <Layout></Layout>
}

export const query = graphql`
  query MyMerchQuery {
    image: file(base: { eq: "album.jpg" }) {
      publicURL
    }
  }
`

export default Merch
