document.addEventListener("DOMContentLoaded", function () {
  const playerChoices = document.querySelectorAll(".area-player img");
  const playerResult = document.querySelector(".player-result img");
  let playerScore = 0; // Skor awal pemain
  let computerScore = 0; // Skor awal komputer
  const playerScoreDisplay = document.querySelector(".player1-score"); // Tampilan skor pemain
  const computerScoreDisplay = document.querySelector(".player2-score"); // Tampilan skor komputer

  playerChoices.forEach((choice) => {
    choice.addEventListener("click", function () {
      const choiceSrc = this.getAttribute("src");
      playerResult.setAttribute("src", choiceSrc);
    });
  });

  // Fungsi untuk mendapatkan pilihan komputer
  const getPilihanComputer = () => {
    const choices = ["gajah", "orang", "semut"];
    const compIndex = Math.floor(Math.random() * choices.length);
    return choices[compIndex];
  };

  // Fungsi untuk menentukan hasil permainan
  const getHasil = (comp, player) => {
    if (player === comp) return "seri";
    if (
      (player === "gajah" && comp === "orang") ||
      (player === "orang" && comp === "semut") ||
      (player === "semut" && comp === "gajah")
    ) {
      playerScore++;
      return "Menang";
    } else {
      computerScore++;
      return "Kalah";
    }
  };

  // Fungsi untuk memutar gambar secara acak
  const putar = () => {
    const imgComputer = document.querySelector(".img-computer");
    const gambar = ["gajah", "orang", "semut"];
    let i = 0;
    const waktuMulai = new Date().getTime();
    const intervalId = setInterval(() => {
      if (new Date().getTime() - waktuMulai > 1000) {
        clearInterval(intervalId);
        return;
      }
      imgComputer.setAttribute("src", `img/${gambar[i++]}.png`);
      if (i === gambar.length) i = 0;
    }, 100);
  };

  const pilihan = document.querySelectorAll("li img");
  pilihan.forEach((e) => {
    e.addEventListener("click", () => {
      const pilihanComputer = getPilihanComputer();
      const pilihanPlayer = e.classList[0];
      putar();
      setTimeout(() => {
        const hasil = getHasil(pilihanComputer, pilihanPlayer);
        const imgComputer = document.querySelector(".img-computer");
        imgComputer.setAttribute("src", `img/${pilihanComputer}.png`);
        const info = document.querySelector(".info");
        info.innerHTML = hasil;

        // Menampilkan skor terbaru
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
      }, 1000);
    });
  });
});
