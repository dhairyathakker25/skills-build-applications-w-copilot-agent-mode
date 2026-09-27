import CollectionTable from './CollectionTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim().replace(/-8000$/, '')
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { key: 'displayName', label: 'Student' },
  { key: 'username', label: 'Handle' },
  { key: 'email', label: 'Email' },
  { key: 'grade', label: 'Grade' },
]

function Users() {
  return <CollectionTable collection="users" endpoint={endpoint} title="Students" eyebrow="01 / PEOPLE" columns={columns} />
}

export default Users