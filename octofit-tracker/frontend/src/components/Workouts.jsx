import CollectionTable from './CollectionTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim().replace(/-8000$/, '')
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'difficulty', label: 'Level', render: (workout) => <span className="level-tag">{workout.difficulty ?? 'All levels'}</span> },
  { key: 'durationMinutes', label: 'Duration', render: (workout) => `${workout.durationMinutes ?? '—'} min` },
  { key: 'exercises', label: 'Movements', render: (workout) => workout.exercises?.length ?? 0 },
  { key: 'description', label: 'Details' },
]

function Workouts() {
  return <CollectionTable collection="workouts" endpoint={endpoint} title="Workout plans" eyebrow="05 / TRAINING" columns={columns} />
}

export default Workouts