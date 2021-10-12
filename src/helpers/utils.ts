export const displayDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export const displayMoney = (n: number) => {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // or use toLocaleString()
  return format.format(n);
};

export const calculateTotal = (arr: number[]) => {
  if (!arr || arr?.length === 0) {
    return 0;
  }

  const total = arr.reduce((acc, val) => acc + val, 0);

  return Math.round(total * 100) / 100;
};

export const displayActionMessage = (msg: string, status = "info") => {
  const div = document.createElement("div");
  const span = document.createElement("span");

  div.className = `toast ${
    status === "info" ? "toast-info" : status === "success" ? "toast-success" : "toast-error"
    // eslint-disable-next-line indent
  }`;
  span.className = "toast-msg";
  span.textContent = msg;
  div.appendChild(span);

  const toast = document.querySelector(".toast");
  if (toast) {
    document.body.removeChild(toast);
    document.body.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  setTimeout(() => {
    try {
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  }, 3000);
};
