import "./style.css";

function Header({ address }) {
  return (
    <header >
      <h1>De-Vote</h1>
      <p>{ address }</p>
    </header>
  )
}

export default Header;