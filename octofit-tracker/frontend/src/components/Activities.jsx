import CollectionTable from './CollectionTable.jsx'

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.valueOf())
    ? '—'
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const columns = [
  {
    key: 'type',
    label: 'Activity',
    render: (activity) => <span className="activity-type">{activity.type ?? 'Activity'}</span>,
  },
  { key: 'completedAt', label: 'Completed', render: (activity) => formatDate(activity.completedAt) },
  { key: 'durationMinutes', label: 'Duration', render: (activity) => `${activity.durationMinutes ?? '—'} min` },
  { key: 'distanceKm', label: 'Distance', render: (activity) => activity.distanceKm == null ? '—' : `${activity.distanceKm} km` },
  { key: 'points', label: 'Points', render: (activity) => <span className="points-cell">{activity.points ?? 0} <small>pts</small></span> },
]

function Activities() {
  return <CollectionTable collection="activities" title="Activity log" eyebrow="03 / DAILY MOVEMENT" columns={columns} />
}

export default Activities