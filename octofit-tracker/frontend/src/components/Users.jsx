import CollectionTable from './CollectionTable.jsx'

const columns = [
  { key: 'displayName', label: 'Student' },
  { key: 'username', label: 'Handle' },
  { key: 'email', label: 'Email' },
  { key: 'grade', label: 'Grade' },
]

function Users() {
  return <CollectionTable collection="users" title="Students" eyebrow="01 / PEOPLE" columns={columns} />
}

export default Users