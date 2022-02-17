export const getSiteName = (app) => {
  return (app && (app.name || app.uid)) || 'Blog'
}
