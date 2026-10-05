class Artikal {
  constructor(naziv, cena, opis) {
    this.naziv = naziv;
    this.cena = cena;
    this.opis = opis;
  }
}

const artikli = [
  new Artikal("Monitor", 165, "Računarski monitor"),
  new Artikal("TV", 650, "Televizor"),
  new Artikal("Miš", 20, "Računarski miš")
];

const teloTabele = document.querySelector("tbody");

artikli.forEach((artikal, indeks) => {
  const red = document.createElement("tr");

  [indeks + 1, artikal.naziv, artikal.cena].forEach((vrednost) => {
    const celija = document.createElement("td");
    celija.textContent = vrednost;
    red.appendChild(celija);
  });

  teloTabele.appendChild(red);
});