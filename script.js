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

var docenten = ["aam","acc","adm","alt","asv","baa","bak","bam","bar","baw","bbv","bca","bch","bda","bdb","bde","bdh","bdl","bdr","bee","beg","bel","bem","bet","bew","bgb","bhs","bjh","bjm","bke","bkl","bkn","bkr","bks","bkv","bkw","bla","blam","ble","bln","bls","blt","blw","bmg","bmi","bml","bms","bmt","bmz","bnc","bnf","bnk","bnm","bnv","boe","bof","boh","bol","bom","bon","borp","bos","both","bov","brd","brj","brk","brm","brn","brs","bru","brv","bsb","bsd","bsl","bsn","bsr","bta","btb","btd","btk","btm","bun","bvn","bwt","cal","cdp","cki","clm","cpl","crg","csn","cso","cts","cwz","daj","ddk","dee","dgf","dgs","dis","dkb","dkm","dmj","dmm","dms","dra","dre","drm","dsh","dst","dwh","dym","eck","ede","edl","eig","eij","ekh","ekj","ekv","emn","end","endv","ese","eyd","eyk","faa","flh","fli","frl","frw","fvv","gast10","gast5","gbg","gbt","gch","gff","gfm","gla","gld","gldr","glr","gnt","goe","gor","gra","grc","gre","gri","grp","grs","grw","gsn","gss","gtb","gtr","gvp","haa","had","hae","haf","hag","hagm","hak","ham","hbg","hbr","hdh","hdk","hdr","hed","hek","hev","hft","hfz","hgb","hge","hgl","hgn","hgs","hgw","hil","hka","hkk","hks","hld","hlm","hlw","hmn","hmw","hob","hod","hog","hok","hom","hov","hoz","hpw","hrb","hsd","hsj","hst","htn","htt","hub","hui","hul","hum","hun","hvo","hzb","identacle","imb","izr","jac","jag","jasl","jaw","jer","jgk","jgt","jgv","jjl","jks","jna","jng","jngl","jnl","jnw","joh","joj","jord","jou","jov","jsm","jvh","kaa","kay","keh","ken","ker","kkh","kkm","kko","kkp","kkw","klb","kle","klpp","kmk","knd","knf","kni","knl","knp","kns","knt","koc","koh","kok","kol","kon","kool","kop","kos","koy","kpm","kpr","kps","kpw","krc","krf","krg","krh","kri","krl","krr","ksb","kse","ksm","kss","kte","ktr","kts","ktv","kuyp","kve","kvn","kvv","kwd","lah","lar","lbb","lbo","lcs","ldd","ldh","ldn","ldw","lee","leew","leg","len","lgk","lgt","lht","lnb","lnm","lnn","lnv","lof","lrg","lsg","lsh","ltn","luc","lwf","mas","mav","may","mcd","mdr","meh","mer","mgr","mkd","mke","mld","mlk","mmk","mne","mns","molg","mom","moo","mor","mre","mri","mrl","mrn","mrp","mrv","mss","msv","mtb","mth","mts","mtw","mur","mwb","mwr","myn","nag","nap","ndg","ndk","ngl","nih","niw","nps","nrl","nss","nvd","nwk","nwm","ode","ofm","okn","olm","oot","opn","osd","osu","oue","oun","ous","pad","pal","pals","pas","per","plc","plg","plj","plm","pms","poj","pos","poss","prd","pri","prk","prm","prna","prr","prs","psi","pss","psw","pth","ptr","ptt","qui","raa","rdg","rdp","ree","reg","reh","rfs","rib","rip","rkt","rog","roo","rsb","rsg","rsh","rsj","rss","rub","rvr","rwb","ryn","san","sbg","scb","scd","scl","scm","scn","sco","scr","sds","sej","sek","sew","shd","skg","skr","sks","skt","slo","slr","slu","sma","smi","smk","sns","sob","soe","som","spe","spm","spp","spr","sps","spv","srb","ssd","ssk","ssn","st1","st2","st3","sta","stc","str","stt","stun","stv","tbk","tbv","tew","tkb","tmp","tns","trl","tst1","tst2","ttk","ttl","tym","uit","vaa","vac_bi","vam","vdb","vdg","vdm","vds","vdu","vdw","vea","veg","veh","ver","ves","vez","vgc","vgk","vgt","vhm","vil","vim","vkn","vkv","vli","vms","vnk","vnl","voe","vog","vop","vos","vra","vrd","vre","vrf","vrg","vrk","vrs","vrt","vsa","vsb","vsj","vsk","vsm","vsv","vti","vtr","vtv","vug","vwe","vzs","was","wdm","wesc","wgm","wkg","wkk","wkm","wkn","wkw","wlp","wom","wos","wrm","wsf","wst","wta","wtj","wtm","wtt","wyk","wyr","zdl","zesv","ztt","zuu","zwa","zwb","zwr"]
var afdeling = ["1b","1gt","1h","1k","1p","1v","2b","2gt","2h","2k","2p","2v","3b","3gt","3h","3k","3p","3v","4b","4gt","4h","4k","4p","4v","5h","5v","6v","entree","extern","traj"]
var klassen = [["1b.1b1l","1b.1b2l","1b.1b3l"],["1gt.1gt1","1gt.1gt2","1gt.1gt3","1gt.1gt4"],["1h.1h2","1h.1h3","1h.1h4","1h.1h5","1h.1h6","1h.1h1t"],["1k.1k1","1k.1k2","1k.1k3","1k.1k4"],["1p.1p1","1p.1p2","1p.hu1","1p.hu2","1p.hu3","1p.hu4","1p.lng1","1p.lng2","1p.lo1","1p.tn1","1p.tn2","1p.tn3","1p.tn4","1p.tx1","1p.tx2"],["1v.1v2p","1v.1v2pa","1v.1v3g","1v.1v3gg","1v.1v4","1v.1v5","1v.1v6","1v.1v1t","1v.1v1ta","1v.kls1"],["2b.2b1l","2b.2b2l","2b.2b3l","2b.pso10","2b.pso11","2b.pso7","2b.pso8"],["2gt.2gt1","2gt.2gt2","2gt.2gt3","2gt.2gt4","2gt.2gt5"],["2h.2h2","2h.2h3","2h.2h4","2h.2h5","2h.2h6","2h.2h1t"],["2k.2k1","2k.2k2","2k.2k3","2k.2k4","2k.2k5","2k.pso1","2k.pso2","2k.pso3","2k.pso4","2k.pso5"],["2p.2p1","2p.hu1","2p.lng1","2p.tn1","2p.tn2","2p.tx1"],["2v.2v2p","2v.2v2pa","2v.2v3g","2v.2v3ga","2v.2v3gg","2v.2v4","2v.2v5","2v.2v6","2v.kls1","2v.2v1t","2v.2v1ta","2v.2v1tg"],["3b.3b1b","3b.3b2hz","3b.3b3em","3b.3b4z","3b.bi1","3b.bwi1","3b.du1","3b.ec1","3b.eo1","3b.gsv1","3b.lo1","3b.mrbwi","3b.mrelec","3b.mreo","3b.mrmetaal","3b.mrzw1","3b.mrzw2","3b.piee1","3b.piem1","3b.rek1","3b.wi1","3b.wi2","3b.zw1","3b.zw2","3b.zw3"],["3gt.3gt1","3gt.3gt2","3gt.3gt3","3gt.3gt4","3gt.ak1","3gt.ak2","3gt.bi1","3gt.bi2","3gt.bi3","3gt.bte1","3gt.bwi1","3gt.du1","3gt.du2","3gt.ec1","3gt.ec2","3gt.ec3","3gt.eo1","3gt.eo2","3gt.gsv1","3gt.gsv2","3gt.lo21","3gt.lo22","3gt.nsk11","3gt.nsk12","3gt.nsk21","3gt.piem1","3gt.piem2","3gt.rek1","3gt.wi1","3gt.wi2","3gt.wi3","3gt.wi4","3gt.zw1","3gt.zw2"],["3h.3h2","3h.3h3","3h.3h4","3h.3h5","3h.3h6","3h.3h1t"],["3k.3k1be","3k.3k2bm","3k.3k3h","3k.3k4z","3k.3k5z","3k.du1","3k.ec1","3k.eo1","3k.gsv1","3k.mrbwi","3k.mrelec","3k.mreo","3k.mrmetaal","3k.mrzw1","3k.mrzw2","3k.piee1","3k.piem1","3k.pls1","3k.rek1","3k.wi1","3k.zw1","3k.zw3","3k.zw4","3k.zw5","3k.zw6"],["3p.3p1","3p.av1","3p.btt1","3p.hor1","3p.hu1","3p.hu2","3p.lsb1","3p.ne1","3p.ne2","3p.rw1","3p.rw2","3p.tn1","3p.tx1","3p.vz1"],["3v.3v2p","3v.3v2pa","3v.3v2pg","3v.3v3g","3v.3v3ga","3v.3v4","3v.3v5","3v.gr1","3v.la1","3v.3v1t","3v.3v1ta","3v.3v1tg","3v.la1"],["4b.4b1b","4b.4b2hem","4b.4b3z","4b.4b4z","4b.du1","4b.ec1","4b.eo1","4b.gsv1","4b.mrbwi","4b.mrelec","4b.mreo","4b.mrmetaal","4b.nsk11","4b.piee1","4b.piem1","4b.wi1","4b.wi2","4b.zw3"],["4gt.4gt1","4gt.4gt2","4gt.4gt3","4gt.4gt4","4gt.4gt5","4gt.ak1","4gt.bi1","4gt.bi2","4gt.bi3","4gt.bte1","4gt.bwi1","4gt.du1","4gt.ec1","4gt.ec2","4gt.ec3","4gt.eo1","4gt.eo2","4gt.gsv1","4gt.gsv2","4gt.lo21","4gt.nsk11","4gt.nsk12","4gt.nsk21","4gt.piem2","4gt.wi1","4gt.wi2","4gt.wi3","4gt.wi4","4gt.zw1","4gt.zw2"],["4h.4h1","4h.4h2","4h.4h3","4h.4h4","4h.4h5","4h.4h6","4h.4h7","4h.ak1","4h.ak2","4h.ak3","4h.ak4","4h.be1","4h.be2","4h.biol1","4h.biol2","4h.biol3","4h.bsm1","4h.bsm2","4h.dutl1","4h.dutl2","4h.econ1","4h.econ2","4h.econ3","4h.econ4","4h.econ5","4h.fatl1","4h.ges1","4h.ges2","4h.ges3","4h.ges4","4h.ges5","4h.kua1","4h.kua2","4h.kubv1","4h.kubv2","4h.kumu1","4h.mr1","4h.mr10","4h.mr11","4h.mr12","4h.mr13","4h.mr14","4h.mr2","4h.mr3","4h.mr4","4h.mr6","4h.mr7","4h.mr8","4h.mr9","4h.nat1","4h.nlt1","4h.nlt2","4h.rms1","4h.schk1","4h.schk2","4h.schk3","4h.wisa1","4h.wisa2","4h.wisa3","4h.wisa4","4h.wisa5","4h.wisb1","4h.wisb2"],["4k.4k1b","4k.4k2bem","4k.4k3hz","4k.4k4z","4k.4k5z","4k.bi1","4k.bwi1","4k.du1","4k.ec1","4k.eo1","4k.mrbwi","4k.mrelec","4k.mreo1","4k.mrmetaal","4k.mrzw1","4k.piee1","4k.piem1","4k.pls1","4k.wi1","4k.zw6"],["4p.4p1","4p.4p2","4p.5p1","4p.av1","4p.bb1","4p.lng1"],["4v.4v1","4v.4v2","4v.4v3","4v.4v4","4v.4v5","4v.ak1","4v.ak2","4v.ak3","4v.be1","4v.be2","4v.biol1","4v.biol2","4v.biol3","4v.ckv1","4v.ckv2","4v.ckv3","4v.ckv4","4v.dutl1","4v.dutl2","4v.dutl3goe","4v.econ1","4v.econ2","4v.econ3","4v.fatl1","4v.fatl2","4v.ges1","4v.ges2","4v.ges3","4v.ges4","4v.gtc1","4v.in1","4v.kua1","4v.kua2","4v.kubv1","4v.kubv2","4v.kumu1","4v.ltc1","4v.mr10","4v.mr11","4v.mr1vto","4v.mr2vto","4v.mr3","4v.mr4","4v.mr5vto","4v.mr6","4v.mr7vto","4v.mr9","4v.nat2","4v.nat3","4v.nlt1","4v.nlt2","4v.rms1","4v.rms2","4v.schk1","4v.schk2","4v.schk3","4v.se1","4v.wisa1","4v.wisa2","4v.wisa3","4v.wisa4","4v.wisb1","4v.wisb2","4v.wisd1"],["5h.5h1","5h.5h2","5h.5h3","5h.5h4","5h.5h5","5h.5h6","5h.5h7","5h.ak1","5h.ak2","5h.ak3","5h.ak4","5h.ak5","5h.be1","5h.be2","5h.biol1","5h.biol2","5h.biol3","5h.bsm1","5h.bsm2","5h.dutl1","5h.econ1","5h.econ2","5h.econ3","5h.econ4","5h.fatl1","5h.ges1","5h.ges2","5h.ges3","5h.ges4","5h.ges5","5h.kua1","5h.kua2","5h.kubv1","5h.kubv2","5h.kumu1","5h.mr1","5h.mr2","5h.mr3","5h.mr4","5h.mr5","5h.mr6","5h.mr7","5h.nat1","5h.nlt1","5h.nlt2","5h.rms1","5h.schk1","5h.schk2","5h.schk3","5h.wisa1","5h.wisa2","5h.wisa3","5h.wisa4","5h.wisa5","5h.wisb1","5h.wisb2"],["5v.5v1","5v.5v2","5v.5v3","5v.5v4","5v.5v5","5v.ak1","5v.ak2","5v.be1","5v.be2","5v.biol1","5v.biol2","5v.biol3","5v.dutl1","5v.dutl2","5v.dutl3","5v.econ1","5v.econ2","5v.econ3","5v.entl1","5v.entl2","5v.entl3","5v.entl4","5v.entlvto1","5v.entlvto2","5v.fatl1","5v.fatl2","5v.ges1","5v.ges2","5v.ges3","5v.gtc1","5v.in1","5v.kcv1","5v.kua1","5v.kua2","5v.kubv1","5v.kumu1","5v.lo1","5v.lo2","5v.lo3","5v.lo4","5v.lov1","5v.lov2","5v.ltc1","5v.maat1","5v.maat2","5v.maat3","5v.maat4","5v.maatv1","5v.maatv2","5v.mr1","5v.mr2","5v.mr3","5v.mr4vto","5v.mr5vto","5v.nat1","5v.nat2","5v.nlt1","5v.rms1","5v.schk1","5v.schk2","5v.schk3","5v.se1","5v.wisa1","5v.wisa2","5v.wisa3","5v.wisb1","5v.wisb2","5v.wisb3","5v.wisc1","5v.wisd1"],["6v.6v1","6v.6v2","6v.6v3","6v.6v4","6v.6v5","6v.ak1","6v.ak2","6v.be1","6v.be2","6v.biol1","6v.biol2","6v.debat1","6v.dutl1","6v.dutl2","6v.dutl3","6v.econ1","6v.econ2","6v.entl1","6v.entl2","6v.entl3","6v.entlvto1","6v.entlvto2","6v.fatl1","6v.fatl2","6v.ges1","6v.ges2","6v.ges3","6v.gtc1","6v.in1","6v.kua1","6v.kubv1","6v.kumu1","6v.ltc1","6v.mr1","6v.mr2","6v.mr3","6v.mr4vto","6v.mr5vto","6v.nat1","6v.nat2","6v.nlt1","6v.rms1","6v.schk1","6v.schk2","6v.schk3","6v.se1","6v.wisa1","6v.wisa2","6v.wisb1","6v.wisb2","6v.wisb3","6v.wisc1","6v.wisd1"],["entree.6p1e"],["extern.messiah1"],["traj.t1","traj.t10tops","traj.t2","traj.t3","traj.t4","traj.t5","traj.t6","traj.t7","traj.t8","traj.t9int"]]
var data = [[166306,"Gerard Jon",0,[1,0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9]],[166312,"Frans Klaas",2966,[25,0,10,11,12,6,13,14,15,16,17],[0,1,10,11,12,7,13,14,15,16,17]],[166514,"Sjon Piet",2256,[25,18,19,20,2,12,21,22,23,17],[18,1,19,20,3,12,21,22,16,17]]]
