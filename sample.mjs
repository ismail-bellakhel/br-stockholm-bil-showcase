// Selected pure functions from the private inventory sync module.
// No network requests or inventory writes are performed in this showcase.
function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, sortObject(value[key])]),
  )
}

export function canonicalJson(payload) {
  return JSON.stringify(sortObject(payload))
}

export function assertSnapshotSafety(plan, acceptedCount, options = {}) {
  const maxRemovalCount = options.maxRemovalCount ?? 10
  const maxDropRatio = options.maxDropRatio ?? 0.25
  const previousCount = Number(acceptedCount || 0)
  const currentCount =
    plan.unchanged.length + plan.changed.length + plan.created.length
  const dropRatio =
    previousCount > 0 ? Math.max(0, (previousCount - currentCount) / previousCount) : 0

  const reasons = []
  if (plan.removed.length > maxRemovalCount) {
    reasons.push(`would archive ${plan.removed.length} vehicles (limit ${maxRemovalCount})`)
  }
  if (dropRatio > maxDropRatio) {
    reasons.push(`accepted inventory dropped ${(dropRatio * 100).toFixed(1)}%`)
  }
  if (reasons.length) {
    const error = new Error(`Suspicious snapshot safety stop: ${reasons.join('; ')}`)
    error.diagnostics = { reasons, previousCount, currentCount }
    throw error
  }
}
