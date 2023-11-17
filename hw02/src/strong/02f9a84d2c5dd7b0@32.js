function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _years(data){return(
data.map(item => item.Year)
)}

function _starsign(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "魔羯座", "水瓶座", "雙魚座"]
)}

function _6(yCounts,data)
{
  yCounts.length = 0;
  for (var y=0; y<=11; y++) { 
    yCounts.push({Constellation:y, gender:"male", count:0}); 
    yCounts.push({Constellation:y, gender:"female", count:0}); 
  }
  data.forEach (x=> {
    var i = (x.Constellation)*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
  })
  return yCounts
}


function _plot3(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _8(Plot,plot3,starsign,yCounts){return(
Plot.plot({
  marginTop: plot3.mt,
  marginRight: plot3.mr,
  marginBottom: plot3.mb,
  marginLeft: plot3.ml,
  
  grid: true,
  y: {label: "count"},
  x: {tickFormat: (d) => { return starsign[d]; }},
  
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count", tip: true , fill:"gender",
                        title: d => `Count: ${d.count}\nConstellation: ${starsign[d.Constellation]}\nGender: ${d.gender}`}),
  ],
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("./files/2259824662fb612853b8873b8814ace51e8cbac39ba881850d66e26df63f1897b01d1bd3459af6529669fd912da9dd607a30666a93278d7fdfa10bbe22b8913d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("years")).define("years", ["data"], _years);
  main.variable(observer("starsign")).define("starsign", _starsign);
  main.variable(observer()).define(["yCounts","data"], _6);
  main.variable(observer("viewof plot3")).define("viewof plot3", ["Inputs"], _plot3);
  main.variable(observer("plot3")).define("plot3", ["Generators", "viewof plot3"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot3","starsign","yCounts"], _8);
  return main;
}
