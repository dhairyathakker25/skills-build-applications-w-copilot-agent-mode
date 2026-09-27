import CollectionTable from './CollectionTable.jsx'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'difficulty', label: 'Level', render: (workout) => <span className="level-tag">{workout.difficulty ?? 'All levels'}</span> },
  { key: 'durationMinutes', label: 'Duration', render: (workout) => `${workout.durationMinutes ?? '—'} min` },
  { key: 'exercises', label: 'Movements', render: (workout) => workout.exercises?.length ?? 0 },
  { key: 'description', label: 'Details' },
]

function Workouts() {
  return <CollectionTable collection="workouts" title="Workout plans" eyebrow="05 / TRAINING" columns={columns} />
}

export default Workouts