import store from './store'
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import VectorTileLayer from "ol/layer/VectorTile";
import * as d3 from "d3";
import {Fill, Stroke, Style, Text, Circle} from "ol/style";
import {transformExtent} from "ol/proj";
import LayerGroup from "ol/layer/Group";
const transformE = extent => {
  return transformExtent(extent,'EPSG:4326','EPSG:3857')
};
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
    url: "https://kenzkenz.github.io/kouzi_r4_2/{z}/{x}/{y}.mvt"
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
//筆------------------------------------------------------------------------------------------------
function Hude01(){
  this.name = 'hude'
  this.extent = transformE([139.29977955579702, 41.33735893619786,146.05830163520793, 45.998925934593984])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_01/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude01Obj = {};
for (let i of mapsStr) {
  hude01Obj[i] = new VectorTileLayer(new Hude01())
}
export const hude01Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//------------------------------------------------------
function Hude02(){
  this.name = 'hude'
  this.extent = transformE([139.81008701276298, 40.176635777760794,141.85689925817158, 41.62744372063858])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_02/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude02Obj = {};
for (let i of mapsStr) {
  hude02Obj[i] = new VectorTileLayer(new Hude02())
}
export const hude02Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//--------------------------------------------------------
function Hude03(){
  this.name = 'hude'
  this.extent = transformE([140.5734586715698, 38.7906868884707,142.3349618911743, 40.61059686538772])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_03/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude03Obj = {};
for (let i of mapsStr) {
  hude03Obj[i] = new VectorTileLayer(new Hude03())
}
export const hude03Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//--------------------------------------------------------
function Hude04(){
  this.name = 'hude'
  this.extent = transformE([140.11761188507077, 37.83137845901042,141.9370079040527, 39.05885006240371])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_04/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude04Obj = {};
for (let i of mapsStr) {
  hude04Obj[i] = new VectorTileLayer(new Hude04())
}
export const hude04Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//--------------------------------------------------------
function Hude05(){
  this.name = 'hude'
  this.extent = transformE([139.3986959710234, 38.87794964062405,141.15889225811617, 40.57166905462515])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_05/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude05Obj = {};
for (let i of mapsStr) {
  hude05Obj[i] = new VectorTileLayer(new Hude05())
}
export const hude05Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//--------------------------------------------------------
function Hude06(){
  this.name = 'hude'
  this.extent = transformE([139.02594592303555, 37.71780786572144,140.91672198588856, 39.14842384692383])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_06/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude06Obj = {};
for (let i of mapsStr) {
  hude06Obj[i] = new VectorTileLayer(new Hude06())
}
export const hude06Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//--------------------------------------------------------
function Hude07(){
  this.name = 'hude'
  this.extent = transformE([138.9336633682251, 36.79038464710865,141.2795877456665, 38.11274719529956])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_07/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude07Obj = {};
for (let i of mapsStr) {
  hude07Obj[i] = new VectorTileLayer(new Hude07())
}
export const hude07Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//--------------------------------------------------------
function Hude31(){
  this.name = 'hude'
  this.extent = transformE([133.04653644561765, 34.97754873651819,134.55668449401853, 35.822754502187806])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_31/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude31Obj = {};
for (let i of mapsStr) {
  hude31Obj[i] = new VectorTileLayer(new Hude31())
}
export const hude31Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude32(){
  this.name = 'hude'
  this.extent = transformE([131.6827940940857, 34.23170940273816,133.6316442489624, 36.458810558660346])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_32/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude32Obj = {};
for (let i of mapsStr) {
  hude32Obj[i] = new VectorTileLayer(new Hude32())
}
export const hude32Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude33(){
  this.name = 'hude'
  this.extent = transformE([133.3229112625122, 34.37735720960234,134.50080871582028, 35.417576199035835])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_33/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude33Obj = {};
for (let i of mapsStr) {
  hude33Obj[i] = new VectorTileLayer(new Hude33())
}
export const hude33Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude34(){
  this.name = 'hude'
  this.extent = transformE([132.03581864329306, 34.05137181766713,133.47375863893242, 35.18277388551303])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_34/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude34Obj = {};
for (let i of mapsStr) {
  hude34Obj[i] = new VectorTileLayer(new Hude34())
}
export const hude34Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude35(){
  this.name = 'hude'
  this.extent = transformE([130.78259931111435, 33.682879373503454,132.2622885364332, 34.84236026182147])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_35/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude35Obj = {};
for (let i of mapsStr) {
  hude35Obj[i] = new VectorTileLayer(new Hude35())
}
export const hude35Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude36(){
  this.name = 'hude'
  this.extent = transformE([133.61486434936523, 33.45580989422106,134.87865686416626, 34.36508341596317])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_36/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude36Obj = {};
for (let i of mapsStr) {
  hude36Obj[i] = new VectorTileLayer(new Hude36())
}
export const hude36Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude37(){
  this.name = 'hude'
  this.extent = transformE([133.43652963638303, 33.861756385783224,134.59404230117798, 34.72464836879196])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_37/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude37Obj = {};
for (let i of mapsStr) {
  hude37Obj[i] = new VectorTileLayer(new Hude37())
}
export const hude37Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude38(){
  this.name = 'hude'
  this.extent = transformE([132.09029674530032, 32.65494909744014,133.70867729187012, 34.45915421670509])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_38/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude38Obj = {};
for (let i of mapsStr) {
  hude38Obj[i] = new VectorTileLayer(new Hude38())
}
export const hude38Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude39(){
  this.name = 'hude'
  this.extent = transformE([132.39072561264035, 32.50431489991003,134.5411491394043, 34.078113953351334])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_39/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude39Obj = {};
for (let i of mapsStr) {
  hude39Obj[i] = new VectorTileLayer(new Hude39())
}
export const hude39Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude40(){
  this.name = 'hude'
  this.extent = transformE([130.057141337313, 32.94396623353168,131.28437361240947, 34.03340278739611])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_40/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude40Obj = {};
for (let i of mapsStr) {
  hude40Obj[i] = new VectorTileLayer(new Hude40())
}
export const hude40Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude41(){
  this.name = 'hude'
  this.extent = transformE([129.82159852981565, 32.87355012041051,130.55144906044004, 33.7152284176957])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_41/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude41Obj = {};
for (let i of mapsStr) {
  hude41Obj[i] = new VectorTileLayer(new Hude41())
}
export const hude41Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude42(){
  this.name = 'hude'
  this.extent = transformE([128.2349128127082, 31.995704237348633,130.49598898341947, 34.89023386619155])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_42/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude42Obj = {};
for (let i of mapsStr) {
  hude42Obj[i] = new VectorTileLayer(new Hude42())
}
export const hude42Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude43(){
  this.name = 'hude'
  this.extent = transformE([129.91195678710938, 32.04104943270438,131.37672185897827, 33.274170666993925])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_43/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude43Obj = {};
for (let i of mapsStr) {
  hude43Obj[i] = new VectorTileLayer(new Hude43())
}
export const hude43Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude44(){
  this.name = 'hude'
  this.extent = transformE([130.76267838478086, 32.71575652411805,132.14372634887692, 33.83879465741656])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_44/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude44Obj = {};
for (let i of mapsStr) {
  hude44Obj[i] = new VectorTileLayer(new Hude44())
}
export const hude44Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude45(){
  this.name = 'hude'
  this.extent = transformE([130.67389791787602, 31.32789462014621,132.07326770804468, 32.88017318420452])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_45/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude45Obj = {};
for (let i of mapsStr) {
  hude45Obj[i] = new VectorTileLayer(new Hude45())
}
export const hude45Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//--------------------------------------------------------
function Hude46(){
  this.name = 'hude'
  this.extent = transformE([127.64123823916296, 26.95180678728839,131.62686781429306, 32.22152765780952])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_46/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude46Obj = {};
for (let i of mapsStr) {
  hude46Obj[i] = new VectorTileLayer(new Hude46())
}
export const hude46Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";
//--------------------------------------------------------
function Hude47(){
  this.name = 'hude'
  this.extent = transformE([121.96815464834543, 23.403999045222932,131.88800437864094, 26.775877456433534])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_47/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude47Obj = {};
for (let i of mapsStr) {
  hude47Obj[i] = new VectorTileLayer(new Hude47())
}
export const hude47Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------
function hudeStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    let rgba = "black"
    switch (prop.land_type) {
      case 100://田
        rgba = "rgba(40,152,53,0.7)";
        break;
      case 200://畑
        rgba = "rgba(239,255,3,0.7)"
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
export const hude00Obj = {}
for (let i of mapsStr) {
  hude00Obj[i] = new LayerGroup({
    layers: [
      hude01Obj[i],
      hude02Obj[i],
      hude03Obj[i],
      hude04Obj[i],
      hude05Obj[i],
      hude06Obj[i],
      hude07Obj[i],



      hude31Obj[i],
      hude32Obj[i],
      hude33Obj[i],
      hude34Obj[i],
      hude35Obj[i],
      hude36Obj[i],
      hude37Obj[i],
      hude38Obj[i],
      hude39Obj[i],
      hude40Obj[i],
      hude41Obj[i],
      hude42Obj[i],
      hude43Obj[i],
      hude44Obj[i],
      hude45Obj[i],
      hude46Obj[i],
      hude47Obj[i]
    ]
  })
}