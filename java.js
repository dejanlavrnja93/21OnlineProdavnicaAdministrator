// 1. Definišemo klasu Artikal sa podacima koje svaki artikal treba da ima.
class Artikal {
  constructor(naziv, cena, opis) {
    this.naziv = naziv;
    this.cena = cena;
    this.opis = opis;
  }
}

const KLJUC_SKLADISTA = "artikli";

// Učitavamo sačuvane artikle i ponovo ih pretvaramo u objekte klase Artikal.
function ucitajArtikle() {
  try {
    const sacuvaniPodaci = JSON.parse(
      localStorage.getItem(KLJUC_SKLADISTA) || "[]"
    );

    if (!Array.isArray(sacuvaniPodaci)) {
      return [];
    }

    return sacuvaniPodaci.map(
      (artikal) => new Artikal(artikal.naziv, artikal.cena, artikal.opis)
    );
  } catch (greska) {
    console.error("Artikli nisu mogli biti učitani:", greska);
    return [];
  }
}

const artikli = ucitajArtikle();
const teloTabele = document.querySelector("tbody");
const forma = document.querySelector("form");

// 4. Ova funkcija prikazuje podatke izabranog artikla u delu za detalje.
function prikaziDetalje(artikal) {
  document.querySelector("#detaljiNaziv").textContent = artikal.naziv;
  document.querySelector("#detaljiCena").textContent = artikal.cena;
  document.querySelector("#detaljiOpis").textContent = artikal.opis;
}

// 5. Ova funkcija pravi red za artikal i dodaje ga u tabelu.
// Klikom na red prikazuju se detalji tog artikla.
function dodajRedUTabelu(artikal, redniBroj) {
  const red = document.createElement("tr");
  const vrednosti = [redniBroj, artikal.naziv, artikal.cena];

  for (let indeks = 0; indeks < vrednosti.length; indeks++) {
    const celija = document.createElement("td");
    celija.textContent = vrednosti[indeks];
    red.appendChild(celija);
  }

  red.addEventListener("click", () => prikaziDetalje(artikal));
  teloTabele.appendChild(red);
}

// 6. Prikazujemo artikle učitane iz localStorage.
for (let indeks = 0; indeks < artikli.length; indeks++) {
  dodajRedUTabelu(artikli[indeks], indeks + 1);
}

// 7. Kada se forma pošalje, sprečavamo ponovno učitavanje stranice,
// uzimamo unete podatke, pravimo novi artikal i dodajemo ga u niz i tabelu.
forma.addEventListener("submit", (event) => {
  event.preventDefault();

  const naziv = document.querySelector("#naziv").value.trim();
  const cena = Number(document.querySelector("#cena").value);
  const opis = document.querySelector("#opis").value.trim();

  const noviArtikal = new Artikal(naziv, cena, opis);
  artikli.push(noviArtikal);

  // Čuvamo ažuriran niz artikala u localStorage.
  localStorage.setItem(KLJUC_SKLADISTA, JSON.stringify(artikli));

  dodajRedUTabelu(noviArtikal, artikli.length);
  forma.reset();
});
