import store from './store'
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import VectorTileLayer from "ol/layer/VectorTile";
import * as d3 from "d3";
import {Fill, Stroke, Style, Text, Circle} from "ol/style";
const mapsStr = ['map01','map02','map03','map04'];
//H28小学校区------------------------------------------------------------------------------------------------
function SyougakkoukuH28(){
  this.name = 'syougakkoukuH28'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/h28syougaku/{z}/{x}/{y}.mvt"
  });
  this.style = syougakkoukuStyleFunction(28);
}
export  const syougakkoukuH28Obj = {};
for (let i of mapsStr) {
  syougakkoukuH28Obj[i] = new VectorTileLayer(new SyougakkoukuH28())
}
export const syougakkoukuH28Summ = "<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A27-v2_1.html' target='_blank'>国土数値情報　小学校区データ</a>";

//H22小学校区------------------------------------------------------------------------------------------------
function SyougakkoukuH22(){
  this.name = 'syougakkoukuH22'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    // url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/syougakkouku/{z}/{x}/{y}.mvt"
    url: "https://kenzkenz.github.io/h22syougaku/{z}/{x}/{y}.mvt"
  });
  this.style = syougakkoukuStyleFunction(22);
}
export  const syougakkoukuH22Obj = {};
for (let i of mapsStr) {
  syougakkoukuH22Obj[i] = new VectorTileLayer(new SyougakkoukuH22())
}
export const syougakkoukuH22Summ = "<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A27-v2_1.html' target='_blank'>国土数値情報　小学校区データ</a>";

//小学校区------------------------------------------------------------------------------------------------
function Syougakkouku(){
  this.name = 'syougakkouku'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    // url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/syougakkouku/{z}/{x}/{y}.mvt"
    url: "https://kenzkenz.github.io/syougaku/{z}/{x}/{y}.mvt"
  });
  this.style = syougakkoukuStyleFunction();
}
export  const syougakkoukuObj = {};
for (let i of mapsStr) {
  syougakkoukuObj[i] = new VectorTileLayer(new Syougakkouku())
}
export const syougakkoukuSumm = "<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A27-v2_1.html' target='_blank'>国土数値情報　小学校区データ</a>";
// ----------------------------------------------------------------------
const d3syougakkoukuColor = d3.scaleOrdinal(d3.schemeCategory10);
const d3tyuugakkoukuColor = d3.scaleOrdinal(d3.schemeCategory10);
function syougakkoukuStyleFunction(year) {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    const geoType = feature.getGeometry().getType();
    const zoom = getZoom(resolution);
    let text = ''
    if (year === 22 || year === 28) {
      text = prop["A27_003"];
    } else if (year === 280) {
      text = prop["A32_003"]
    } else {
      text = prop["P29_005"];
    }
    let rgb
    let rgba
    // console.log(prop["id"])
    if (prop["A27_005"]) {
      rgb = d3.rgb(d3syougakkoukuColor(Number(prop["id"])));
      rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
    } else {
      rgb = d3.rgb(d3tyuugakkoukuColor(Number(prop["id"])));
      rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
    }
    let style
    switch (geoType) {
      case "MultiPoint":
      case "Point":
        if (zoom < 12) break;
        style = new Style({
          image: new Circle({
            radius: 3,
            fill: new Fill({
              color: "black"
            }),
            stroke: new Stroke({
              color: "white",
              width: 1
            })
          }),
          text: new Text({
            font: "8px sans-serif",
            text: text,
            offsetY: 10,
            stroke: new Stroke({
              color: "white",
              width: 3
            })
          })
        });
        break;
      case "Polygon":
      case "MultiPolygon":
        if (zoom > 9) {
          style = new Style({
            fill: new Fill({
              color: rgba
            }),
            stroke: new Stroke({
              color: "gray",
              width: 1
            }),
            zIndex: 0
          });
        } else {
          style = new Style({
            fill: new Fill({
              color: rgba
            }),
            zIndex: 0
          });
        }
        break;
      default:
    }
    return style;
  }
}
//h28中学校区---------------------------------------------------------------------------------------
function TyuugakkoukuH28(){
  this.name = 'tyuugakkoukuH28'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/h28tyuugaku/{z}/{x}/{y}.mvt"
  });
  this.style = syougakkoukuStyleFunction(280);
}
export  const tyuugakkoukuH28Obj = {};
for (let i of mapsStr) {
  tyuugakkoukuH28Obj[i] = new VectorTileLayer(new TyuugakkoukuH28())
}
export const tyuugakkoukuH28Summ = "<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A32-v2_0.html' target='_blank'>国土数値情報　中学校区データ</a>";

//h25中学校区---------------------------------------------------------------------------------------
function TyuugakkoukuH25(){
  this.name = 'tyuugakkoukuH25'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/h25tyuugaku/{z}/{x}/{y}.mvt"
  });
  this.style = syougakkoukuStyleFunction(250);
}
export  const tyuugakkoukuH25Obj = {};
for (let i of mapsStr) {
  tyuugakkoukuH25Obj[i] = new VectorTileLayer(new TyuugakkoukuH25())
}
export const tyuugakkoukuH25Summ = "<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A32-v2_0.html' target='_blank'>国土数値情報　中学校区データ</a>";

//中学校区---------------------------------------------------------------------------------------
function Tyuugakkouku(){
  this.name = 'tyuugakkouku'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    // url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt//tyuugakkouku/{z}/{x}/{y}.mvt"
    url: "https://kenzkenz.github.io/tyuugaku/{z}/{x}/{y}.mvt"
  });
  this.style = syougakkoukuStyleFunction();
}
export  const tyuugakkoukuObj = {};
for (let i of mapsStr) {
  tyuugakkoukuObj[i] = new VectorTileLayer(new Tyuugakkouku())
}
export const tyuugakkoukuSumm = "<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A32-v2_0.html' target='_blank'>国土数値情報　中学校区データ</a>";
// 夜の明かり---------------------------------------------------------------------------------------
function SekaiLight () {
  this.name = 'japanLight'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:14,
    url: "https://kenzkenz.github.io/sekai-light/{z}/{x}/{y}.mvt"
  });
  this.style = japanLightStyleFunction();
}
export  const japanLightObj = {};
for (let i of mapsStr) {
  japanLightObj[i] = new VectorTileLayer(new SekaiLight())
}
export const japanLightSumm = "<div style='width: 500px'>世界メッシュ研究所さんの世界メッシュコードを使用しています。<hr>本3次世界メッシュ夜間光統計はNASAが提供する全球夜間光画像(2012年)を元に世界メッシュ研究所が作成したものです。夜間光データの源データはアメリカ航空宇宙局(NASA)に帰属します。データの品質や信頼性について世界メッシュ研究所、NASAが一切保証するものではなく、利用者が本データセットの利用によって生じた損害または損失について世界メッシュ研究所、NASAは一切の責任を負うものではありません。Data courtesy Marc Imhoff of NASA GSFC and Christopher Elvidge of NOAA NGDC. Image by Craig Mayhew and Robert Simmon, NASA GSFC. (c) NASA </div>"
//----------------------------------------------------------------------------------
function  getZoom(resolution)  {
  let zoom = 0;
  let r = 156543.03390625; // resolution for zoom 0
  while (resolution < r) {
    r /= 2;
    zoom++;
    if (resolution > r) {
      return zoom;
    }
  }
  return zoom; // resolution was greater than 156543.03390625 so return 0
}
//----------------------------------------------------------------------------------
function japanLightStyleFunction () {
  // MVTタイルは７〜１４まで詳細 １から６は簡易
  const d3Color = d3.interpolateLab("black","yellow");
  return function(feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const text = prop["light"];
    let light100
    if(zoom>7) {//うーんzoomが一つずれるけど、どこで間違えている？？とりあえずこれで問題なく動く
      const lightNum = Number(prop["light"]);
      light100 = lightNum / 255;
    }else{
      light100 = Number(prop["rate"]) / 10;
    }
    const rgb = d3.rgb(d3Color(light100));
    let rgba;
    if(zoom>7) {
      if (light100 === 1) {
        rgba = "rgba(255,165,0,0.8)";
      } else {
        rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.8 )";
      }
    }else{
      rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.8 )";
    }
    const styles = [];
    const fillStyle =
      new Style({
        fill: new Fill({
          color: rgba
        })
      });
    const strokeStyle =
      new Style({
        stroke: new Stroke({
          color: "silver",
          width: 1
        })
      });
    const textStyle =
      new Style({
        text: new Text({
          font: "14px sans-serif",
          text: text,
          placement:"point",
          fill: new Fill({
            color: "black"
          }),
          stroke: new Stroke({
            color: "white",
            width: 3
          }),
          exceedLength:true
        })
      });
    styles.push(fillStyle);
    if(zoom>=13) {
      styles.push(strokeStyle);
      styles.push(textStyle);
    }
    return styles;
  };
}
// DID地区------------------------------------------
function DidH27(){
  this.name="didh27";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/didh27/{z}/{x}/{y}.mvt"
    // url: "https://kenzkenz.xsrv.jp/mvt/didh27/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(27);
}
export  const didH27Obj = {};
for (let i of mapsStr) {
  didH27Obj[i] = new VectorTileLayer(new DidH27())
}
export const didH27Summ = "H27の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"
// h22人口集中地区---------------------------------------
function DidH22(){
  this.name="didh22";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/didh22/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(22);
}
export  const didH22Obj = {};
for (let i of mapsStr) {
  didH22Obj[i] = new VectorTileLayer(new DidH22())
}
export const didH22Summ = "H22の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"
// s35人口集中地区---------------------------------------
function DidS35(){
  this.name="dids35";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/dids35/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(35);
}
export  const didS35Obj = {};
for (let i of mapsStr) {
  didS35Obj[i] = new VectorTileLayer(new DidS35())
}
export const didS35Summ = "s35の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"
// s40人口集中地区---------------------------------------
function DidS40(){
  this.name="dids40";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/dids40/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(40);
}
export  const didS40Obj = {};
for (let i of mapsStr) {
  didS40Obj[i] = new VectorTileLayer(new DidS40())
}
export const didS40Summ = "s40の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"

// s45人口集中地区---------------------------------------
function DidS45(){
  this.name="dids45";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/dids45/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(45);
}
export  const didS45Obj = {};
for (let i of mapsStr) {
  didS45Obj[i] = new VectorTileLayer(new DidS45())
}
export const didS45Summ = "s45の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"
// s50人口集中地区---------------------------------------
function DidS50(){
  this.name="dids50";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/dids50/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(55);
}
export  const didS50Obj = {};
for (let i of mapsStr) {
  didS50Obj[i] = new VectorTileLayer(new DidS50())
}
export const didS50Summ = "s50の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"

// s55人口集中地区---------------------------------------
function DidS55(){
  this.name="dids55";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/dids55/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(55);
}
export  const didS55Obj = {};
for (let i of mapsStr) {
  didS55Obj[i] = new VectorTileLayer(new DidS55())
}
export const didS55Summ = "s55の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"
// s60人口集中地区---------------------------------------
function DidS60(){
  this.name="dids60";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/dids60/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(60);
}
export  const didS60Obj = {};
for (let i of mapsStr) {
  didS60Obj[i] = new VectorTileLayer(new DidS60())
}
export const didS60Summ = "s60の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"

// h02人口集中地区---------------------------------------
function DidH02(){
  this.name="didh02";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/didh02/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(2);
}
export  const didH02Obj = {};
for (let i of mapsStr) {
  didH02Obj[i] = new VectorTileLayer(new DidH02())
}
export const didH02Summ = "h02の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"
// h02人口集中地区---------------------------------------
function DidH07(){
  this.name="didh07";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/didh07/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(2);
}
export  const didH07Obj = {};
for (let i of mapsStr) {
  didH07Obj[i] = new VectorTileLayer(new DidH07())
}
export const didH07Summ = "h07の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"

// h12人口集中地区---------------------------------------
function DidH12(){
  this.name="didh12";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/didh12/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(2);
}
export  const didH12Obj = {};
for (let i of mapsStr) {
  didH12Obj[i] = new VectorTileLayer(new DidH12())
}
export const didH12Summ = "h12の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"
// h17人口集中地区---------------------------------------
function DidH17(){
  this.name="didh17";
  this.source = new VectorTileSource({
    overlaps:false,
    transition:0,
    format: new MVT(),
    crossOrigin: 'Anonymous',
    maxZoom:13,
    url: "https://kenzkenz.github.io/didh17/{z}/{x}/{y}.mvt"
  });
  this.style = didmvtStyleFunction(2);
}
export  const didH17Obj = {};
for (let i of mapsStr) {
  didH17Obj[i] = new VectorTileLayer(new DidH17())
}
export const didH17Summ = "h17の人口集中地区です。<br>出典＝<a href='https://nlftp.mlit.go.jp/ksj/' target='_blank'>国土数値情報</a>"

// -------------------------------------------------------------
 function didmvtStyleFunction (year) {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    const zoom = getZoom(resolution);
    const rgba = "rgba(75,0,130,0.5)";
    const styles = [];
    let text
    if (year === 27) {
      text = Number(prop["人口"]).toLocaleString()+"人";
    } else {
      text = Number(prop["A16_005"]).toLocaleString()+"人";
    }
    const fillStyle = new Style({
      fill: new Fill({
        color: rgba
      })
    });
    function strokeStyle1(width){
      const strokeStyle0 = new Style({
        stroke: new Stroke({
          color: "white",
          width: width
        })
      });
      return strokeStyle0;
    }
    const textStyle = new Style({
      text: new Text({
        font: "10px sans-serif",
        text: text,
        //offsetY: 10,
        stroke: new Stroke({
          color: "white",
          width: 3
        }),
        overflow:true,
        exceedLength:true,
        placement:"point"
      })
    });
    styles.push(fillStyle);
    if(zoom>=15) {
      styles.push(strokeStyle1(3.0));
    }else if(zoom>=12) {
      styles.push(strokeStyle1(2));
    }else if(zoom>=11) {
      styles.push(strokeStyle1(1));
    }
    if(zoom>=11) styles.push(textStyle);

    return styles;
  }
}

function Suiro() {
  this.name = "suiro";
  this.style = suiroStyleFunction();
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom: 14,
    url: "https://hfu.github.io/rvrcl-vt/{z}/{x}/{y}.mvt"
  });
}
export  const suiroObj = {};
for (let i of mapsStr) {
  suiroObj[i] = new VectorTileLayer(new Suiro())
}
export const suiroSumm = ""
// ------------------------------------
function suiroStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    const rivCtg = prop["rivCtg"];
    const type = prop["type"];
    let strokeColor = "dodgerblue";
    let strokeWidth = 1;
    let lineDash = [];
    switch (rivCtg) {
      case "一級河川":
        strokeColor = "mediumblue";
        strokeWidth = 2;
        lineDash = [1];
        break;
      case "二級河川":
        strokeColor = "blue";
        strokeWidth = 2;
        lineDash = [1];
        break;
      default:
    }
    switch (type) {
      case "人工水路（地下）":
        strokeColor = "red";
        strokeWidth = 2;
        lineDash = [2, 4];
        break;
      case "人工水路（空間）":
        strokeColor = "red";
        strokeWidth = 2;
        lineDash = [1];
        break;
      default:
    }
    if (resolution > 611.50) strokeWidth = 1;
    const style = new Style({
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth,
        lineDash: lineDash
      })
    });
    return style;
  }
}
function Hinan() {
  this.name = "hinan";
  this.style = hinanStyleFunction();
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom: 15,
    url: "https://kenzkenz.github.io/hinan/{z}/{x}/{y}.mvt"
  });
}
export  const hinanObj = {};
for (let i of mapsStr) {
  hinanObj[i] = new VectorTileLayer(new Hinan())
}
export const hinanSumm = '出典：<a href="https://nlftp.mlit.go.jp/ksj/index.html" target="_blank">国土数値情報</a>'
// --------------------------------------------------
function hinanStyleFunction () {
  return function(feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    const circleStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: "red"
        }),
        stroke: new Stroke({
          color: "white",
          width: 1
        })
      })
    })
    const textStyle = new Style({
          text: new Text({
            font: "14px sans-serif",
            text: prop.P20_002,
            placement:"point",
            offsetY:10,
            fill: new Fill({
              color: "black"
            }),
            stroke: new Stroke({
              color: "white",
              width: 3
            }),
            exceedLength:true
          })
        });
    styles.push(circleStyle);
    if(zoom>=15) {
      styles.push(textStyle);
    }
    // console.log(prop)
    return styles;
  };
}
//H23用途地域------------------------------------------------------------------------------------------------
function YoutoH23(){
  this.name = 'youtoH23'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/youto_h23/{z}/{x}/{y}.mvt"
  });
  this.style = youtotiikiStyleFunction();
}
export  const youtoH23Obj = {};
for (let i of mapsStr) {
  youtoH23Obj[i] = new VectorTileLayer(new YoutoH23())
}
export const youtoH23Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A29-v2_1.html' target='_blank'>国土数値情報　用途地域</a>";

//R01用途地域------------------------------------------------------------------------------------------------
function YoutoR01(){
  this.name = 'youtoR01'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/youto_r01/{z}/{x}/{y}.mvt"
  });
  this.style = youtotiikiStyleFunction();
}
export  const youtoR01Obj = {};
for (let i of mapsStr) {
  youtoR01Obj[i] = new VectorTileLayer(new YoutoR01())
}
export const youtoR01Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A29-v2_1.html' target='_blank'>国土数値情報　用途地域</a>";
//------------------------------------------------------
function youtotiikiStyleFunction() {
  return function (feature, resolution) {
    var prop = feature.getProperties();
    var cate = prop["A29_004"];
    var rgba = "rgba(0,0,0,0)";
    switch (cate) {
      case 1://第一種低層住居専用地域
        rgba = "rgba(51,204,153,0.8)";
        break;
      case 2://第二種低層住居専用地域
        rgba = "rgba(0,153,102,0.8)";
        break;
      case 3://第一種中高層住居専用地域
        rgba = "rgba(102,204,102,0.8)";
        break;
      case 4://第二種中高層住居専用地域
        rgba = "rgba(204,255,153,0.8)";
        break;
      case 5://第一種住居地域
        rgba = "rgba(255,255,153,0.8)";
        break;
      case 6://第二種住居地域
        rgba = "rgba(255,204,153,0.8)";
        break;
      case 7://準住居地域
        rgba = "rgba(255,204,102,0.8)";
        break;
      case 8://近隣商業地域
        rgba = "rgba(255,153,204,0.8)";
        break;
      case 9://商業地域
        rgba = "rgba(255,102,153,0.8)";
        break;
      case 10://準工業地域
        rgba = "rgba(204,153,255,0.8)";
        break;
      case 11://工業地域
        rgba = "rgba(204,255,255,0.8)";
        break;
      case 12://工業専用地域
        rgba = "rgba(102,204,255,0.8)";
        break;
      case 99://
        rgba = "rgba(0,0,0,0.1)";
        break;
    }
    var style;
    if (resolution < 125.87) {
      style = new Style({
        fill: new Fill({color: rgba}),
        stroke: new Stroke({
          color: "darkgray",
          width: 1
        })
      });
    } else {
      style = new Style({
        fill: new Fill({color: rgba})
      });
    }
    return style;
  }
}
//H18都市地域------------------------------------------------------------------------------------------------
function TosiH18(){
  this.name = 'tosiH18'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/tosi_h18/{z}/{x}/{y}.mvt"
  });
  this.style = tositiikiStyleFunction(18);
}
export  const tosiH18Obj = {};
for (let i of mapsStr) {
  tosiH18Obj[i] = new VectorTileLayer(new TosiH18())
}
export const tosiH18Summ = "https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A09.html' target='_blank'>国土数値情報　都市地域</a>";

//H30都市地域------------------------------------------------------------------------------------------------
function TosiH30(){
  this.name = 'tosiH30'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/tosi_h30/{z}/{x}/{y}.mvt"
  });
  this.style = tositiikiStyleFunction();
}
export  const tosiH30Obj = {};
for (let i of mapsStr) {
  tosiH30Obj[i] = new VectorTileLayer(new TosiH30())
}
export const tosiH30Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A09.html' target='_blank'>国土数値情報　都市地域</a>";
//--------------------------------------
function tositiikiStyleFunction(year) {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    let layerNo
    if (year === 18) {
      layerNo = prop["A09_003"];
    } else {
      layerNo = prop["layer_no"];
    }
    let rgba = "black";
    let zindex = 0;
    switch (layerNo) {
      case '1':
      case 1://市街化区域
        rgba = "rgba(40,152,53,0.7)";
        break;
      case '2':
      case 2://市街化調整区域
        rgba = "rgba(239,255,3,0.7)";
        zindex = 1;
        break;
      case '3':
      case 3://その他用途地域
        rgba = "rgba(126,219,109,0.7)";
        break;
      case '4':
      case 4://用途未設定
        rgba = "rgba(253,191,111,0.7)";
        break;
    }
    let style;
    if (resolution < 125.87) {
      style = new Style({
        fill: new Fill({
          color: rgba
        }),
        stroke: new Stroke({
          color: "darkgray",
          width: 1
        }),
        zIndex: zindex
      });
    } else {
      style = new Style({
        fill: new Fill({
          color: rgba
        }),
        zIndex: zindex
      });
    }
    return style;
  }
}
//S45過疎地域------------------------------------------------------------------------------------------------
function KasoS45(){
  this.name = 'kasoS45'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/kaso_s45/{z}/{x}/{y}.mvt"
  });
  this.style = kasoStyleFunction();
}
export  const kasoS45Obj = {};
for (let i of mapsStr) {
  kasoS45Obj[i] = new VectorTileLayer(new KasoS45())
}
export const kasoS45Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A17-v4_0.html' target='_blank'>国土数値情報　過疎地域</a>";
//S60過疎地域------------------------------------------------------------------------------------------------
function KasoS60(){
  this.name = 'kasoS60'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/kaso_s60/{z}/{x}/{y}.mvt"
  });
  this.style = kasoStyleFunction();
}
export  const kasoS60Obj = {};
for (let i of mapsStr) {
  kasoS60Obj[i] = new VectorTileLayer(new KasoS60())
}
export const kasoS60Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A17-v4_0.html' target='_blank'>国土数値情報　過疎地域</a>";

//H29過疎地域------------------------------------------------------------------------------------------------
function KasoH29(){
  this.name = 'kasoH29'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/kaso_h29/{z}/{x}/{y}.mvt"
  });
  this.style = kasoStyleFunction();
}
export  const kasoH29Obj = {};
for (let i of mapsStr) {
  kasoH29Obj[i] = new VectorTileLayer(new KasoH29())
}
export const kasoH29Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A17-v4_0.html' target='_blank'>国土数値情報　過疎地域</a>";
//--------------------------------------
function kasoStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    let rgba = "black"
    switch (prop.A17_009) {
      case '01':
      case 1://過疎市町村
        rgba = "rgba(40,152,53,0.7)";
        break;
      case '02':
      case 2://過疎地域とみなされる市町村
        rgba = "rgba(239,255,3,0.7)"
        break;
      case '03':
      case 3://過疎地域とみなされる区域
        rgba = "rgba(0,0,109,0.7)"
        break;
    }
    const style = new Style({
        fill: new Fill({
          color: rgba
        }),
        stroke: new Stroke({
          color: "black",
          width: 1
        }),
      });
    return style;
  }
}
//H19公示価格------------------------------------------------------------------------------------------------
function KouziH19(mapName){
  this.name = 'kouziH19'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/kouzi_h19/{z}/{x}/{y}.mvt"
  });
  this.style = kouziStyleFunction(mapName,19);
}
export const kouziH19Obj = {};
for (let i of mapsStr) {
  kouziH19Obj[i] = new VectorTileLayer(new KouziH19(i))
}
export const kouziH19Summ = "<a href='' target='_blank'>国土数値情報　公示価格</a>";
//H25公示価格------------------------------------------------------------------------------------------------
function KouziH25(mapName){
  this.name = 'kouziH25'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/kouzi_h25/{z}/{x}/{y}.mvt"
  });
  this.style = kouziStyleFunction(mapName,25);
}
export const kouziH25Obj = {};
for (let i of mapsStr) {
  kouziH25Obj[i] = new VectorTileLayer(new KouziH25(i))
}
export const kouziH25Summ = "<a href='' target='_blank'>国土数値情報　公示価格</a>";

//H30公示価格------------------------------------------------------------------------------------------------
function KouziH30(mapName){
  this.name = 'kouziH30'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/kouzi_h30/{z}/{x}/{y}.mvt"
  });
  this.style = kouziStyleFunction(mapName,30);
}
export const kouziH30Obj = {};
for (let i of mapsStr) {
  kouziH30Obj[i] = new VectorTileLayer(new KouziH30(i))
}
export const kouziH30Summ = "<a href='' target='_blank'>国土数値情報　公示価格</a>";

//R04公示価格------------------------------------------------------------------------------------------------
function KouziR04(mapName){
  this.name = 'kouziR04'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/kouzi_r4/{z}/{x}/{y}.mvt"
  });
  this.style = kouziStyleFunction(mapName,4);
}
export const kouziR04Obj = {};
for (let i of mapsStr) {
  kouziR04Obj[i] = new VectorTileLayer(new KouziR04(i))
}
export const kouziR04Summ = "<a href='' target='_blank'>国土数値情報　公示価格</a>";
// --------------------------------------------------
function kouziStyleFunction (mapName,year) {
  return function(feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    const color = d3.scaleLinear()
        .domain([100, store.state.info.kouzi[mapName]])
        .range(["blue", "red"]);
    let color2
    let text
    switch(year){
      case 30:
        color2 = color(prop.L01_091)
        text = prop.L01_023
        break
      case 25:
      case 19:
        color2 = color(prop.L01_006)
        text = prop.L01_019
        break
      case 4:
        color2 = color(prop.L01_100)
        text = prop.L01_024
        break
    }
    const circleStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: color2
        }),
        stroke: new Stroke({
          color: "white",
          width: 1
        })
      })
    })
    const textStyle = new Style({
      text: new Text({
        font: "14px sans-serif",
        text: text,
        placement:"point",
        offsetY:10,
        fill: new Fill({
          color: "black"
        }),
        stroke: new Stroke({
          color: "white",
          width: 3
        }),
        exceedLength:true
      })
    });
    styles.push(circleStyle);
    if(zoom>=14) {
      styles.push(textStyle);
    }
    // console.log(prop)
    return styles;
  };
}