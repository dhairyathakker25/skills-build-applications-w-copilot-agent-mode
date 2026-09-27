import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './lib/api.js'
import './App.css'

const navigation = [
  { label: 'Students', path: '/users', index: '01' },
  { label: 'Teams', path: '/teams', index: '02' },
  { label: 'Activities', path: '/activities', index: '03' },
  { label: 'Leaderboard', path: '/leaderboard', index: '04' },
  { label: 'Workouts', path: '/workouts', index: '05' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/users" aria-label="OctoFit Tracker home">
          <img src={octofitLogo} alt="" />
          <span className="brand-name">OctoFit</span>
          <span className="brand-edition">TRACKER</span>
        </a>

        <div className="sidebar-section-label">MOVEMENT HUB</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-index">{item.index}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          <span>API · port 8000</span>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div>
            <span className="school-name">MERGINGTON HIGH</span>
            <span className="topbar-divider">/</span>
            <span className="season-name">Fall movement season</span>
          </div>
          <a className="api-origin" href={API_BASE_URL} target="_blank" rel="noreferrer">
            <span className="status-dot" />
            API connected
          </a>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
