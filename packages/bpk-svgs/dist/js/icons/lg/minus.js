import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M4 15c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2" /></svg>;
  }

}