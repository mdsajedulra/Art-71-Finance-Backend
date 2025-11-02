type TRange = "1d" | "7d" | "30d" | "custom";

export const queryBuilder = (range: TRange, startDate?: any, endDate?: any) => {
  const now = new Date();
  let start;
  switch (range) {
    case "1d":
      start = new Date(now);
      start.setDate(now.getDate() - 1);
      break;

    case "7d":
      start = new Date(now);
      start.setDate(now.getDate() - 7);
      break;

    case "30d":
      start = new Date(now);
      start.setDate(now.getDate() - 30);
      break;

    case "custom":
      start = new Date(startDate);
      break;

    default:
      // ডিফল্ট শেষ ৩০ দিন
      start = new Date(now);
      start.setDate(now.getDate() - 30);
  }

  const end = range === "custom" && endDate ? new Date(endDate) : now;

  return { start, end };
};

