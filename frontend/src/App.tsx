import { Routes, Route, Link } from 'react-router-dom';

const HomePage = () => <h2>Головна сторінка</h2>;
const WineriesPage = () => <h2>Сторінка виноробень</h2>;

function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/">Головна</Link>
            </li>
            <li>
              <Link to="/wineries">Виноробні</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-content">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wineries" element={<WineriesPage />} />
          </Routes>
        </div>
      </main>

      <footer className="app-footer">Wine-project Created by ...</footer>
    </div>
  );
}

export default App;
