const howLong = (date) => {
  const today = new Date();
  const future = new Date(date);
  let diff = future - today;

  if (diff < 0) {
    return "La fecha proporcionada ya ha pasado.";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const remainingDaysAfterMonths = days % 30;
  const weeks = Math.floor(remainingDaysAfterMonths / 7);
  const remainingDays = remainingDaysAfterMonths % 7;

  if (months > 0) {
    if (weeks > 0) {
      return `${months} meses y ${weeks} semanas`;
    }
    return `${months} meses`;
  }

  if (weeks > 0) {
    if (remainingDays > 0) {
      return `${weeks} semanas y ${remainingDays} días`;
    }
    return `${weeks} semanas`;
  }

  return `${days} días`;
};

export default howLong;
