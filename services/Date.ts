export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0
    ? `${hours}h${mins.toString().padStart(2, "0")}`
    : `${mins}min`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
