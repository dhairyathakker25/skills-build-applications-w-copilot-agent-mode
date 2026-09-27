import CollectionTable from './CollectionTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim().replace(/-8000$/, '')
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { key: 'name', label: 'Team' },
  {
    key: 'memberIds',
    label: 'Members',
    render: (team) => <span className="number-cell">{team.memberIds?.length ?? 0}</span>,
  },
  {
    key: 'score',
    label: 'Season points',
    render: (team) => <span className="points-cell">{team.score ?? 0} <small>pts</small></span>,
  },
]

function Teams() {
  return <CollectionTable collection="teams" endpoint={endpoint} title="Teams" eyebrow="02 / COMMUNITY" columns={columns} />
}

export default Teams