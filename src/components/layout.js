import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div>
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>

        <a href="https://www.linkedin.com/in/mattgroff/">Connect with me on LinkedIn</a>
        <br/>
        <a href="mailto:mattlgroff@gmail.com">Send me an email</a>
      </div>

    )
  } else {
    header = (
      <div>
        <Link className="header-link-home" to="/">
          {title}
        </Link>
        <br/>
        <a href="https://www.linkedin.com/in/mattgroff/">Connect with me on LinkedIn</a>
        <br/>
        <a href="mailto:mattlgroff@gmail.com">Send me an email</a>
      </div>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
