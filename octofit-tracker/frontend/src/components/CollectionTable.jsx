import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function CollectionTable({ collection, endpoint, title, eyebrow, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, { signal: controller.signal })
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [collection, endpoint])

  return (
    <section className="collection-page" aria-labelledby={`${collection}-title`}>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={`${collection}-title`}>{title}</h1>
        </div>
        <div className="record-count" aria-live="polite">
          <span className="count-value">{loading ? '—' : records.length}</span>
          <span>{records.length === 1 ? 'record' : 'records'}</span>
        </div>
      </div>

      <div className="table-frame">
        <div className="table-responsive">
          <table className="table data-table mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td className="table-message" colSpan={columns.length}>Loading records…</td></tr>
              )}
              {!loading && error && (
                <tr><td className="table-message error-message" colSpan={columns.length} role="alert">{error}</td></tr>
              )}
              {!loading && !error && records.length === 0 && (
                <tr><td className="table-message" colSpan={columns.length}>No records yet</td></tr>
              )}
              {!loading && !error && records.map((record, rowIndex) => (
                <tr key={record._id ?? record.id ?? `${collection}-${rowIndex}`}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? column.render(record, rowIndex) : record[column.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="collection-source">Source <code>/api/{collection}/</code></p>
    </section>
  )
}

export default CollectionTable