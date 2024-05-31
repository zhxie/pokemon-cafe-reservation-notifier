Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const now = new Date();
document.getElementById("date").value = now
  .addDays(1)
  .toISOString()
  .split("T")[0];

const endpoint = document.getElementById("endpoint");
endpoint.addEventListener("input", () => {
  endpoint.classList.remove("input-error");
});

const button = document.getElementById("start");
button.addEventListener("click", () => {
  const place = document.getElementById("place").value;
  const number = document.getElementById("number").value;
  const date = document.getElementById("date").value;

  let domain = "";
  switch (place) {
    case "Nihonbashi, Tokyo":
      domain = "reserve";
      break;
    case "Shinsaibashi, Osaka":
      domain = "osaka";
      break;
    default:
      throw new Error(`unexpected place ${place}`);
  }

  if (endpoint.value.length === 0) {
    endpoint.classList.add("input-error");
    alert("The endpoint cannot be empty.");
    return;
  }

  window.electron.start(domain, number, date, endpoint.value);
});
