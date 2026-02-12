export const formatDate = (dateStr) => {
  if (!dateStr) return null;

  const date = new Date(dateStr);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(/ /g, "-"); 
};
