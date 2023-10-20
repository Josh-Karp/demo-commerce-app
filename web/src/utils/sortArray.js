export default function sortArray(array, key, order = "asc") {
  const sortOrder = order === "desc" ? -1 : 1;
  return array.sort((a, b) =>
    a[key] > b[key] ? sortOrder : b[key] > a[key] ? -sortOrder : 0
  );
}
