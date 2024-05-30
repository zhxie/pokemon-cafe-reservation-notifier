const { contextBridge } = require("electron");

const TRIGGER_DELAY = 2000;
const RELOAD_INTERVAL = 10000;

contextBridge.exposeInMainWorld("electron", {
  inject: (number, date, endpoint) => {
    setTimeout(() => {
      // Check capacity.
      const div = document.querySelector("div[data-date]");
      if (div) {
        const data = div.getAttribute("data-date");
        const capacity = JSON.parse(data)[number][date] ?? 0;
        if (capacity) {
          fetch(
            `${endpoint.replace(
              /\/$/,
              ""
            )}/Pokémon%20Cafe%20Reservation%20Notifier/Here%20is%20a%20seat.%20Tap%20here%20to%20reserve.?url=https://osaka.pokemon-cafe.jp/`
          );
        }
        setTimeout(() => {
          window.location.href = "/";
        }, RELOAD_INTERVAL);
        return;
      }

      // Table reservation / Number of guests.
      const select = document.querySelector("select");
      if (select) {
        select.selectedIndex = number;
        document.forms[0].submit();
        return;
      }

      // Please confirm.
      const input = document.querySelector("input");
      if (input) {
        window.location.href = "/reserve/auth_confirm";
        return;
      }

      // About email address authentication.
      const button = document.querySelector("a");
      if (button) {
        button.click();
        return;
      }

      // Error.
      setTimeout(() => {
        window.location.reload();
      }, RELOAD_INTERVAL);
    }, TRIGGER_DELAY);
  },
});
