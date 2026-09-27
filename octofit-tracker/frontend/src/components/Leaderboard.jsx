import CollectionTable from './CollectionTable.jsx'

const columns = [
  {
    key: 'rank',
    label: 'Rank',
    render: (_entry, index) => <span className={`rank-cell${index === 0 ? ' rank-first' : ''}`}>{String(index + 1).padStart(2, '0')}</span>,
  },
  { key: 'userId', label: 'Student ID', render: (entry) => String(entry.userId ?? '—').slice(-8) },
  { key: 'period', label: 'Period' },
  { key: 'points', label: 'Points', render: (entry) => <span className="points-cell">{entry.points ?? 0} <small>pts</small></span> },
]

function Leaderboard() {
  return <CollectionTable collection="leaderboard" title="Leaderboard" eyebrow="04 / SEASON STANDINGS" columns={columns} />
}

export default Leaderboard