const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

const timeFormatter24 = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const timeFormatter12 = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const toDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatDate = (value, style = "iso") => {
  const date = toDate(value);
  if (!date) return "—";

  if (style === "pretty") return dateFormatter.format(date);

  return date.toISOString().slice(0, 10);
};

export const formatTime = (value, style = "24h") => {
  const date = toDate(value);
  if (!date) return "—";

  if (style === "12h") return timeFormatter12.format(date);

  return timeFormatter24.format(date);
};

export const formatDateTimeParts = (value) => {
  const date = toDate(value);
  if (!date) {
    return { date: "—", time: "—" };
  }

  return {
    date: formatDate(date, "pretty"),
    time: formatTime(date, "24h"),
  };
};
