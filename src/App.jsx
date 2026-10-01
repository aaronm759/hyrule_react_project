import { Routes, Route, Link, NavLink } from 'react-router';
import Homepage from './pages/homepage';
import Search from './pages/search';
import Details from './pages/getDetails';
import styles from './App.module.css';

function App() {
  const navClass = ({ isActive }) =>
    `${styles.header__link} ${isActive ? styles.header__linkActive : ''}`;

  return (
    <div className={styles.app}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <header className={styles.header}>
        <h2 className={styles.header__title}>
          <Link to="/" className={styles.header__brand}>Hyrule Compendium</Link>
        </h2>
        <nav className={styles.header__nav} aria-label="Main navigation">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/search" className={navClass}>Search</NavLink>
        </nav>
      </header>
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Hyrule Compendium</p>
      </footer>
    </div>
  );
}

export default App;