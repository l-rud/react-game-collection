import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="app">
        <header className="header">
          <h1>Game Collection</h1>
        </header>

        <nav className="top-menu">
          <ul>
            <li><Link to="/">Matching Memory Game</Link></li>
            <li><Link to="/tic-tac-toe">Tic-Tac-Toe</Link></li>
            <li><Link to="/candy-crush">Candy Crush</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <div className="content">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
};

export default Layout;