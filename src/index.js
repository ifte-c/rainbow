if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(registration => {
    console.log("SW Registered!");
    console.log(registration);
  }).catch(error => {
    console.log("SW Registration Failed!");
    console.log(error);
  });
}

function colgen() {
  var ran = chroma(360*Math.random(), 0.75 + 0.25*Math.random(), 0.4 + 0.2*Math.random(), 'hsl');
  return ran;
}

function arrgen() {
  var ran = colgen();
  var ran2 = colgen();
  while (Math.abs(ran.hsl()[0] - ran2.hsl()[0]) < 50) {
    ran2 = colgen();
  }
  return [ran, ran2];
}

var gen = 'lch';

function loadBar() {
  let r = document.querySelector(":root");
  let rs = getComputedStyle(r);
  let progress = parseInt(rs.getPropertyValue("--perc")) + 1;
  r.style.setProperty("--perc", progress);
  if (progress==100) {
    r.style.setProperty("--perc", 0);
  }
  var opt = ['lrgb', 'lab', 'hsl', 'lch'];
  if (parseInt(rs.getPropertyValue("--perc")) % 25 == 0) {
    gen = opt[3*Math.random()];
  }
  let col = chroma.scale( arrgen() ).mode(gen);
  console.log(col(0), col(0.5), col(1));
  r.style.setProperty("--rice", col(0.5));
  r.style.setProperty("--nori", col(0));
  r.style.setProperty("--fish", col(1));
}

/*
function getColor() {
  return "hsl(" + 360*Math.random() + "," + (75 + 25*Math.random()) + "%," + (40 + 20*Math.random()) + "%)"
}
document.getElementById("color").style.color = getColor();
console.log(document.getElementById("color").style.color);
console.log(chroma.scale([document.getElementById("color").style.color,'white']).mode('lch').colors(6)[3]);
*/

document.getElementById("btn").addEventListener("click", loadBar);