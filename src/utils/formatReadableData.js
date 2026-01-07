const formatReadableDate = (isoDate) => {
  if (!isoDate) return "";

  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const [yyyy, mm, dd] = isoDate.split("-");
  const monthName = MONTHS[Number(mm) - 1];

  return `${Number(dd)} ${monthName}, ${yyyy}`;
};

module.exports = { formatReadableDate }