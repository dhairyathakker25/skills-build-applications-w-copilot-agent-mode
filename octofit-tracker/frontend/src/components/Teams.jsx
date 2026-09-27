import CollectionTable from './CollectionTable.jsx'

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
  return <CollectionTable collection="teams" title="Teams" eyebrow="02 / COMMUNITY" columns={columns} />
}

export default Teams