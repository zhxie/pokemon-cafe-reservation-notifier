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

const button = document.getElementById("start");
button.addEventListener("click", () => {
  const place = document.getElementById("place").value;
  const number = document.getElementById("number").value;
  const date = document.getElementById("date").value;
  const endpoint = document.getElementById("endpoint").value;

  switch (place) {
    case "Nihonbashi, Tokyo":
      domain = "reserve";
      break;
    case "Shinsaibashi, Osaka":
      domain = "osaka";
      break;
    default:
      alert(
        "The place needs to be either Nihonbashi, Tokyo or Shinsaibashi, Osaka."
      );
      return;
  }

  if (parseInt(number) < 1 || parseInt(number) > 8) {
    alert("The number of Guests needs to be between 1 and 8.");
    return;
  }
  const components = date.split("-");
  if (
    components.length !== 3 ||
    components[0].length !== 4 ||
    Number.isInteger(components[0]) ||
    components[1].length !== 2 ||
    Number.isInteger(components[1]) ||
    components[2].length !== 2 ||
    Number.isInteger(components[2])
  ) {
    alert("The date needs to be in the format YYYY-MM-DD.");
    return;
  }
  if (endpoint.length === 0) {
    alert("The endpoint cannot be empty.");
    return;
  }

  window.electron.start(domain, number, date, endpoint);
});
