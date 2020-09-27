import React from "react"
import Layout from "../components/layout"
const Merch = () => {
  return (
    <Layout>
      <div
        className="box"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <h3 className="box__title">Merchandise</h3>
        <div
          className="box__body"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="box" style={{ border: "2px solid grey" }}>
            <img src="https://via.placeholder.com/150x200" />
          </div>
          <div className="box" style={{ border: "2px solid grey" }}>
            <img src="https://via.placeholder.com/150x200" />
          </div>
          <div className="box" style={{ border: "2px solid grey" }}>
            <img src="https://via.placeholder.com/150x200" />
          </div>
          <div className="box" style={{ border: "2px solid grey" }}>
            <img src="https://via.placeholder.com/150x200" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyMerchQuery {
    image: file(base: { eq: "album.jpg" }) {
      publicURL
    }
  }
`

export default Merch
