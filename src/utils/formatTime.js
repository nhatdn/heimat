export default function formatTime() {
  return new Date().toLocaleDateString("en", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
