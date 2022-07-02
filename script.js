function classShow(id, j) {
  let str = "";
  let l = data[j][3][0];
  for (let k=1;k<data[j][3].length;k++) {
    str += klassen[l][data[j][3][k]] + ", ";
  }
  str = str.slice(0, -2);
  let className = "c" + id;
  var classPlaces = document.getElementsByClassName(className);
  for (var i=0;i<classPlaces.length;i++) {
    classPlaces[i].innerHTML = str;
  }
}
function teacherShow(id, j) {
  let str = "";
  for (let k=0;k<data[j][4].length;k++) {
    str += docenten[data[j][4][k]] + ", ";
  }
  str = str.slice(0, -2);
  let className = "t" + id;
  var classPlaces = document.getElementsByClassName(className);
  for(var i=0;i<classPlaces.length;i++) {
    classPlaces[i].innerHTML = str;
  }
}

function main() {
  document.getElementById("results").innerHTML = "";
  string = "<p>Kies hieronder een optie om een keuzemenu van de geselecteerde optie ervan te zien.</p><select id='kinda'><option value='klas'>Klas</option><option value='docent'>Docent</option><option value='naam'>Naam</option><option value='leerlingnummer'>Leerlingnummer</option></select><button type='keuzemenu' name='keuzemenu' onclick=choice()>Ga naar keuzemenu</button>";
  document.getElementById("options").innerHTML = string;
}

function choice() {
  pick = document.getElementById("kinda").value;
  if (pick === "klas") {
    returnValue = "<p>Kies de afdeling en de groep (optioneel):</p><select id='afdeling'>";
    for (i=0;i<afdeling.length;i++) {
      returnValue += "<option value='" + i + "'>" + afdeling[i] + "</option>";
    }
    returnValue += "</select><button onclick=classes()>Zoek in afdeling</button><select id='klas'><option>Klas</option><select><button onclick=search(0)>Zoeken</button>";
  } else if (pick === "docent") {
    returnValue = "<p>Typ de afkorting van de docent in:</p><input id='docent' list='docenten'><button onclick=search(1)>Zoeken</button><datalist id='docenten'";
    for (i=0;i<docenten.length;i++) {
      returnValue += "<option value='" + docenten[i] + "'>"
    }
    returnValue += "</datalist>"
  } else if (pick === "naam") {
    returnValue = "<p>Voer een naam in:</p><input id='naam'><button onclick=search(2)>Zoeken</button>";
  } else if (pick === "leerlingnummer") {
    returnValue = "<p>Voer een leerlingnummer in:</p><input id='leerlingnummer'><button onclick=search(3)>Zoeken</button>";
  }
  document.getElementById("options").innerHTML = returnValue;
}

function classes() {
  let schoolpart = document.getElementById("afdeling").value;
  let returnValue = "<select id='klas'><option value='-1'></option>";
  for (i=0;i<klassen[schoolpart].length;i++) {
    returnValue += "<option value='" + i + "'>" + klassen[schoolpart][i] + "</option>";
  }
  returnValue += "</select>";
  document.getElementById("klas").innerHTML = returnValue;
}

function search(id) {
  document.getElementById("results").innerHTML = "Loading.."; // 0 = klas, 1 = docent, 2 = naam, 3 = leerlingnummer
  let results = [];
  if (id === 0) {
    let klasnummer = document.getElementById("klas").value;
    let afdelingnummer = document.getElementById("afdeling").value;
    for (i=0;i<data.length;i++) {
      if (data[i][3][0] == afdelingnummer) {
        if (klasnummer != -1) {
          for (j=1;j<data[i][3].length;j++) {
            if (data[i][3][j] == klasnummer) {
              results.push(i);
            }
          }
        } else {
          results.push(i);
        }
      }
    }
  } else if (id === 1) {
    let docent = document.getElementById("docent").value;
    let docentnummer = -1;
    for (h=0;h<docenten.length;h++) {
      if (docenten[h] == docent) {
        docentnummer = h
        break;
      }
    }
    if (docentnummer != -1) {
      for (i=0;i<data.length;i++) {
        for (j=0;j<data[i][4].length;j++) {
          if (data[i][4][j] == docentnummer) {
            results.push(i);
          }
        }
      }
    }
  } else if (id === 2) {
    let naam = document.getElementById("naam").value.toLowerCase().replace(/\*/g, "áßð");
    for (i=0;i<data.length;i++) {
      let value = data[i][1].toLowerCase();
      value = value.search(naam);
      if (value != -1) {
        results.push(i);
      }
    }
  } else if (id === 3) {
    let leerlingnummer = document.getElementById("leerlingnummer").value.replace(/\*/g, "áßð");
    for (i=0;i<data.length;i++) {
      let value = "" + data[i][0];
      value = value.search(leerlingnummer);
      if (value != -1) {
        results.push(i);
      }
    }
  }
  printResults(results);
}

function printResults(results) {
  if (results.length != 0) {
    returnValue = "<h3>Resultaten voor je zoekopdracht:</h3>";
    for (i=0;i<results.length;i++) {
      returnValue += "<div class='result'><img src='https://elo.driestarcollege.nl/";
      if (data[results[i]][2] === 0) {
        returnValue += "theme/image.php/boost/core/1631167873/u/f1";
      } else {
        returnValue += "pluginfile.php/" + data[results[i]][2] + "/user/icon/boost";
      }
      returnValue += "' alt=''><span>Leerlingnummer: " + data[results[i]][0] + "<br>Naam: " + data[results[i]][1] + "<br>Klassen: <a class='c" + data[results[i]][0] + "' onclick=classShow(" + data[results[i]][0] + "," + results[i] + ")>Klik hier om de de klassenlijst te laten zien.</a><br>Docenten: <a class='t" + data[results[i]][0] + "' onclick=teacherShow(" + data[results[i]][0] + "," + results[i] + ")>Klik hier om de de docentenlijst te laten zien.</a></span></div>"
    }
  } else {
    returnValue = "<h3>Er zijn geen resultaten gevonden.</h3>";
  }
  document.getElementById("results").innerHTML = returnValue;
}

main()

var docenten = ["goe","mth","tew","mer","qui","brn","bel","dis","tew","hfz","vgt","veh","wyk","dre","dee","jng","bca","gbg","hil","kkp","zwb","hvo","pth"]
var afdeling = ["5v","6v"]
var klassen = [[],["6v.6v2","6v.be2","6v.econ2","6v.entl3","6v.fatl1","6v.ges1","6v.kua1","6v.kumu1","6v.mr2","6v.wisa2","6v.biol2","6v.dutl1","6v.entl1","6v.kubv1","6v.mr1","6v.nat1","6v.schk1","6v.wisa1","6v.6v1","6v.ak2","6v.dutl2","6v.ges3","6v.mr5vto","6v.se1"]]
var data = [[166306,"Gerard Jon",0,[1,0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9]],[166312,"Frans Klaas",2966,[1,0,10,11,12,6,13,14,15,16,17],[0,1,10,11,12,7,13,14,15,16,17]],[166514,"Sjon Piet",2256,[1,18,19,20,2,12,21,22,23,17],[18,1,19,20,3,12,21,22,16,17]]]
