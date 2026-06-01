export const formatDate = (dateValue) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(dateValue));
};

export const formatTime = (dateValue) => {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(dateValue));
};

export const getMonth = (dateValue) => {
  return new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(dateValue));
};

export const getDay = (dateValue) => {
  return new Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(dateValue));
};

export const toInputDateTime = (dateValue) => {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
};
