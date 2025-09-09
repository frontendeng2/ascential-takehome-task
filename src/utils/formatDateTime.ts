export function formatDateTime(timestamp: Date, timezone?: string) {
  // 'Z' ensures timestamp is parsed as UTC, not local time
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: timezone,
  }).format(new Date(timestamp + 'Z'));
}