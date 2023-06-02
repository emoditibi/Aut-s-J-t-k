CREATE TABLE sakkozo (
  id INT PRIMARY KEY,
  szulnev VARCHAR(255),
  nem CHAR(1),
  szulorszag VARCHAR(3),
  szulovaros VARCHAR(255),
  szuldatum DATE
);

CREATE TABLE versenyzo (
  id INT PRIMARY KEY,
  sakkozoid INT,
  nev VARCHAR(255),
  orszag VARCHAR(3),
  FOREIGN KEY (sakkozoid) REFERENCES sakkozo(id)
);

CREATE TABLE elopont (
  helyezes INT,
  pontszam INT,
  jatek INT,
  versenyzoid INT,
  ranglistaid INT,
  FOREIGN KEY (versenyzoid) REFERENCES versenyzo(id),
  FOREIGN KEY (ranglistaid) REFERENCES ranglista(id)
);

CREATE TABLE ranglista (
  id INT PRIMARY KEY,
  datum DATE
);

-- a - Új adat beszúrása
INSERT INTO versenyzo VALUES ((select max(v.id)+1 from versenyzo v ),(select max(s.id)+1 from sakkozo s ),"Cristiano,Ronaldo","HUN"))
/* b -  Megnézi melyik ranglistában szerepelnek olyan eredmények, ahol a pontszám nagyobb,
 mint az adott ranglistában az átlagos pontszám.*/
SELECT r.id, r.datum, e.helyezes, e.pontszam, e.jatek, e.versenyzoid, e.ranglistaid
FROM ranglista r
JOIN elopont e ON r.id = e.ranglistaid
WHERE e.pontszam > (
    SELECT AVG(pontszam)
    FROM elopont
    WHERE ranglistaid = e.ranglistaid
);
/* c -kiválasszuk azokat a ranglistákat, amelyekhez tartozó pontszámok meghaladják az átlagos pontszámot. 
kiválasztjuk aztokat amelyekben ranglistaid szerepel az allekérdezésben, amelyben az átlagos pontszámot számítjuk.*/
SELECT r.id, r.datum, e.helyezes, e.pontszam, e.jatek, e.versenyzoid, e.ranglistaid
FROM ranglista r
JOIN elopont e ON r.id = e.ranglistaid
WHERE e.ranglistaid IN (
    SELECT ranglistaid
    FROM elopont
    WHERE pontszam > (
        SELECT AVG(pontszam)
        FROM elopont
    )
);
/* d -Ez a lekérdezés visszaadja az összes olyan versenyzőt, akiknek az id értéke megtalálható az elopont tábla versenyzoid oszlopában.*/
SELECT *
FROM versenyzo
WHERE id IN (SELECT versenyzoid FROM elopont);
/* e -Kiválasztja azokat a sakkozókat, akik nem szerepelnek a 'HUN' országú versenyzők között .*/
SELECT *
FROM sakkozo
WHERE id NOT IN (
  SELECT sakkozoid
  FROM versenyzo
  WHERE orszag = 'HUN'
);
/* f - visszaadja az összes versenyzőt, akiknek a neve megegyezik minden olyan sakkozó nevével, akik férfiak.*/
SELECT *
FROM versenyzo
WHERE nev = ALL (SELECT nev FROM sakkozo WHERE nem = 'férfi');
/* g -Visszaadja a neveket, ahol a versenyző neve megegyezik bármely magyar származású sakkozó nevével a "sakkozo" táblában.*/
SELECT v.nev
FROM versenyzo v
WHERE nev = any (SELECT nev FROM sakkozo WHERE szulorszag="HUN");

/* h -kiválasztja az összes olyan adatot, amelyben a sakkozoid  megegyezik a sakkozoval ,ahol az orszag értéke 'HUN'. */
SELECT v.*
FROM versenyzo  v
WHERE v.sakkozoid IN (SELECT s.id FROM (SELECT * FROM sakkozo) s WHERE s.szulorszag = 'HUN');

/* i -Ez a lekérdezés összesíti az országok szerinti versenyzők számát a versenyzo és sakkozo táblák közötti INNER JOIN kapcsolattal, ahol a sakkozoid értéke 3 vagy annál kisebb.*/
SELECT v.orszag, COUNT(*) AS versenyzok_szama
FROM versenyzo v
INNER JOIN sakkozo s ON v.sakkozoid = s.id
WHERE v.sakkozoid <= 3
GROUP BY v.orszag;

/* j -összesíti az országok szerinti versenyzők számát a versenyzo és sakkozo táblák között INNER JOIN kapcsolattal,
 majd a csoportosítás után csak azokat a csoportokat tartalmazza, ahol legalább 3 versenyző található.
*/
SELECT v.orszag, COUNT(*) AS versenyzok_szama
FROM versenyzo v
INNER JOIN sakkozo s ON v.sakkozoid = s.id
GROUP BY v.orszag
HAVING COUNT(*) > 2;
/* k - 
Ez a lekérdezés a versenyzők nevét és az "elopont" tábla "helyezes" mezőjét jeleníti meg. A LEFT JOIN kapcsolat segítségével minden versenyzőt visszaad, akkor is, ha nincs az "elopont" táblában a hozzájuk tartozó adat.*/
SELECT v.nev, e.helyezes
FROM versenyzo v
LEFT JOIN elopont e ON v.id = e.versenyzoid;

/* l -összesíti a versenyzők neveit, és megszámolja, hogy hányszor szerepelnek az "elopont" táblában a "ranglistaid" mezővel együtt. */
SELECT v.nev, COUNT(e.ranglistaid) 
FROM versenyzo v
LEFT JOIN elopont e ON v.id = e.versenyzoid
GROUP BY v.nev;
/* m -Ez a lekérdezés a versenyző nevet és az "elopont" tábla "pontszam" mezőjét jeleníti meg. Az eredményt a versenyző nevek alapján listázza.*/
SELECT v.nev, e.pontszam
FROM versenyzo v
LEFT JOIN elopont e ON v.id = e.versenyzoid
/* n -kiválasztja az összes mezőt a "versenyzo" táblából, és összekapcsolja azokat a "sakkozo" táblával a "sakkozoid" és "id" mezők egyezése alapján.*/
SELECT v.*
FROM versenyzo v
LEFT JOIN sakkozo s ON v.sakkozoid = s.id;
/* o -Az első SELECT részben az összes versenyzőt és az elérhető elopont adataikat kérdezzük le, míg a második SELECT részben azokat a versenyzőket kérdezzük le, akiknek nincs elopont adata.*/
SELECT v.id, v.nev, v.orszag, e.helyezes, e.pontszam
FROM versenyzo v
LEFT JOIN elopont e ON v.id = e.versenyzoid
UNION
SELECT v.id, v.nev, v.orszag, NULL, NULL
FROM versenyzo v
LEFT JOIN elopont e ON v.id = e.versenyzoid
WHERE e.helyezes IS NULL;
