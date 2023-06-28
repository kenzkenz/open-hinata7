import store from './store'
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import GeoJSON from "ol/format/GeoJSON";
import {createXYZ} from "ol/tilegrid";
import VectorTileLayer from "ol/layer/VectorTile";
import * as d3 from "d3";
import {Fill, Stroke, Style, Text, Circle} from "ol/style";
import {transformExtent} from "ol/proj";
import LayerGroup from "ol/layer/Group";
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";
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
  // this.useInterimTilesOnError = false
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
    if(zoom>=8) {
      const lightNum = Number(prop["light"]);
      light100 = lightNum / 255;
    }else{
      light100 = Number(prop["rate"]) / 10;
    }
    const rgb = d3.rgb(d3Color(light100));
    let rgba;
    if(zoom>=8) {
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

function Houmusyou() {
  this.name = "houmusyo";
  this.style = houmusyoStyleFunction();
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom: 17,
    // url: "https://hfu.github.io/rvrcl-vt/{z}/{x}/{y}.mvt"
    url: "https://x.optgeo.org/a/{z}/{x}/{y}.mvt"
  });
}
export  const houmusyouObj = {};
for (let i of mapsStr) {
  houmusyouObj[i] = new VectorTileLayer(new Houmusyou())
}
export const houmusyouSumm = ""
// ------------------------------------
function houmusyoStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    // console.log(resolution)
    // const zoom = getZoom(resolution);
    const type = prop["type"];
    let text = prop.地番
    if (resolution > 9.554628) text = "・";



    const style = new Style({
      // image: new Circle({
      //   radius: 8,
      //   fill: new Fill({
      //     color: "red"
      //   }),
      //   stroke: new Stroke({
      //     color: "white",
      //     width: 1
      //   })
      // }),

      fill: new Fill({
        color: "rgba(0,128,0,0.8)"
      }),
      text: new Text({
        font: "14px sans-serif",
        text: text,
        // placement:"point",
        // offsetY:10,
      }),
      stroke: new Stroke({
        color: 'blue',
        width: 1
      })
    });
    return style;
  }
}


function Suiro() {
  this.name = "suiro";
  this.style = suiroStyleFunction();
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom: 14,
    url: "https://hfu.github.io/rvrcl-vt/{z}/{x}/{y}.mvt"
    // url: "https://x.optgeo.org/a/{z}/{x}/{y}.mvt"
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
    // console.log(feature)
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
        strokeColor = "blue";
        strokeWidth = 2;
        lineDash = [1];
        break;
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
function Hude08(){
  this.name = 'hude'
  this.extent = transformE([139.63015794754028, 35.42387124828295,141.0016894340515, 37.01365617294853])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_08/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude08Obj = {};
for (let i of mapsStr) {
  hude08Obj[i] = new VectorTileLayer(new Hude08())
}
export const hude08Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude09(){
  this.name = 'hude'
  this.extent = transformE([139.21003818511963, 36.16272088559815,140.40832042694092, 37.23617116563372])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_09/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude09Obj = {};
for (let i of mapsStr) {
  hude09Obj[i] = new VectorTileLayer(new Hude09())
}
export const hude09Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude10(){
  this.name = 'hude'
  this.extent = transformE([138.37014198303223, 35.89509948450777,139.94539260864258, 37.21378847961839])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_10/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude10Obj = {};
for (let i of mapsStr) {
  hude10Obj[i] = new VectorTileLayer(new Hude10())
}
export const hude10Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude11(){
  this.name = 'hude'
  this.extent = transformE([138.6806774139404, 35.59677475680269,139.94256019592285, 36.33144519001938])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_11/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude11Obj = {};
for (let i of mapsStr) {
  hude11Obj[i] = new VectorTileLayer(new Hude11())
}
export const hude11Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude12(){
  this.name = 'hude'
  this.extent = transformE([139.5164966583252, 34.84177436275702,141.14839553833008, 36.25704374210949])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_12/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude12Obj = {};
for (let i of mapsStr) {
  hude12Obj[i] = new VectorTileLayer(new Hude12())
}
export const hude12Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude13(){
  this.name = 'hude'
  this.extent = transformE([138.94487919057178, 24.157516891403702,140.03867914949237, 36.05841548392765])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_13/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude13Obj = {};
for (let i of mapsStr) {
  hude13Obj[i] = new VectorTileLayer(new Hude13())
}
export const hude13Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude14(){
  this.name = 'hude'
  this.extent = transformE([138.8973569869995, 35.09280485675225,139.9197506904602, 35.69538208890809])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_14/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude14Obj = {};
for (let i of mapsStr) {
  hude14Obj[i] = new VectorTileLayer(new Hude14())
}
export const hude14Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude15(){
  this.name = 'hude'
  this.extent = transformE([137.5999402999878, 36.673977969529105,140.30403614044187, 38.60204808269833])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_15/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude15Obj = {};
for (let i of mapsStr) {
  hude15Obj[i] = new VectorTileLayer(new Hude15())
}
export const hude15Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude16(){
  this.name = 'hude'
  this.extent = transformE([136.71001553535461, 36.2462806194322,137.79868125915527, 37.03883009228264])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_16/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude16Obj = {};
for (let i of mapsStr) {
  hude16Obj[i] = new VectorTileLayer(new Hude16())
}
export const hude16Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude17(){
  this.name = 'hude'
  this.extent = transformE([136.1002206802368, 36.000923941557744,137.434002968985, 37.92723999869058])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_17/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude17Obj = {};
for (let i of mapsStr) {
  hude17Obj[i] = new VectorTileLayer(new Hude17())
}
export const hude17Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude18(){
  this.name = 'hude'
  this.extent = transformE([135.36834239959714, 35.236120435849685,136.82664871215817, 36.51474102700951])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_18/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude18Obj = {};
for (let i of mapsStr) {
  hude18Obj[i] = new VectorTileLayer(new Hude18())
}
export const hude18Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude19(){
  this.name = 'hude'
  this.extent = transformE([138.22150468826297, 35.09334912620365,139.15738105773926, 36.0995331198404])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_19/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude19Obj = {};
for (let i of mapsStr) {
  hude19Obj[i] = new VectorTileLayer(new Hude19())
}
export const hude19Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude20(){
  this.name = 'hude'
  this.extent = transformE([137.3597002029419, 35.15452992507288,138.9057469367981, 37.0979760657369])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_20/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude20Obj = {};
for (let i of mapsStr) {
  hude20Obj[i] = new VectorTileLayer(new Hude20())
}
export const hude20Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude21(){
  this.name = 'hude'
  this.extent = transformE([136.28059387207028, 35.03567149197079,137.82488107681272, 36.49766598737261])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_21/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude21Obj = {};
for (let i of mapsStr) {
  hude21Obj[i] = new VectorTileLayer(new Hude21())
}
export const hude21Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude22(){
  this.name = 'hude'
  this.extent = transformE([137.3532199859619, 34.46647858600849,139.3178629875183, 35.73646302555349])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_22/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude22Obj = {};
for (let i of mapsStr) {
  hude22Obj[i] = new VectorTileLayer(new Hude22())
}
export const hude22Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude23(){
  this.name = 'hude'
  this.extent = transformE([136.65650900871842, 34.49405105819987,137.96105562643666, 35.51073020893553])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_23/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude23Obj = {};
for (let i of mapsStr) {
  hude23Obj[i] = new VectorTileLayer(new Hude23())
}
export const hude23Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude24(){
  this.name = 'hude'
  this.extent = transformE([135.80719470977783, 33.63423779229544,136.96773290634155, 35.39468255492508])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_24/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude24Obj = {};
for (let i of mapsStr) {
  hude24Obj[i] = new VectorTileLayer(new Hude24())
}
export const hude24Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude25(){
  this.name = 'hude'
  this.extent = transformE([135.729238986969, 34.77743380772921,136.50274515151978, 35.76947966191727])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_25/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude25Obj = {};
for (let i of mapsStr) {
  hude25Obj[i] = new VectorTileLayer(new Hude25())
}
export const hude25Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude26(){
  this.name = 'hude'
  this.extent = transformE([134.90912675857547, 34.54580238935607,136.041533946991, 35.95892033055452])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_26/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude26Obj = {};
for (let i of mapsStr) {
  hude26Obj[i] = new VectorTileLayer(new Hude26())
}
export const hude26Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude27(){
  this.name = 'hude'
  this.extent = transformE([134.9612045288086, 34.200338276692946,135.80466270446777, 35.12087388678508])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_27/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude27Obj = {};
for (let i of mapsStr) {
  hude27Obj[i] = new VectorTileLayer(new Hude27())
}
export const hude27Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude28(){
  this.name = 'hude'
  this.extent = transformE([134.0346622467041, 34.04844588780688,135.5545735359192, 35.8719075882308])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_28/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude28Obj = {};
for (let i of mapsStr) {
  hude28Obj[i] = new VectorTileLayer(new Hude28())
}
export const hude28Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude29(){
  this.name = 'hude'
  this.extent = transformE([135.5311625279185, 33.821412091976754,136.2761671712775, 34.82719927289011])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_29/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude29Obj = {};
for (let i of mapsStr) {
  hude29Obj[i] = new VectorTileLayer(new Hude29())
}
export const hude29Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

//--------------------------------------------------------
function Hude30(){
  this.name = 'hude'
  this.extent = transformE([134.97738486499406, 33.29610421155175,136.0618307054779, 34.539257963073354])
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/hude_30/{z}/{x}/{y}.mvt"
  });
  this.style = hudeStyleFunction();
}
export  const hude30Obj = {};
for (let i of mapsStr) {
  hude30Obj[i] = new VectorTileLayer(new Hude30())
}
export const hude30Summ = "<a href='https://download.fude.maff.go.jp/' target='_blank'>筆ポリゴンダウンロードページ</a>";

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
        // rgba = "rgba(40,152,53,1)";
        rgba = "green";
        break;
      case 200://畑
        // rgba = "rgba(239,255,3,1)"
        rgba = "red"
        break;
    }
    const style = new Style({
      fill: new Fill({
        color: rgba
      }),
      stroke: new Stroke({
        color: rgba,
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
      hude08Obj[i],
      hude09Obj[i],
      hude10Obj[i],
      hude11Obj[i],
      hude12Obj[i],
      hude13Obj[i],
      hude14Obj[i],
      hude15Obj[i],
      hude16Obj[i],
      hude17Obj[i],
      hude18Obj[i],
      hude19Obj[i],
      hude20Obj[i],
      hude21Obj[i],
      hude22Obj[i],
      hude23Obj[i],
      hude24Obj[i],
      hude25Obj[i],
      hude26Obj[i],
      hude27Obj[i],
      hude28Obj[i],
      hude29Obj[i],
      hude30Obj[i],
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
//--------------------------------------------------------
function SansonS50(){
  this.name = 'sanson'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/sanson_s50/{z}/{x}/{y}.mvt"
  });
  this.style = sansonStyleFunction();
}
export  const sansonS50Obj = {};
for (let i of mapsStr) {
  sansonS50Obj[i] = new VectorTileLayer(new SansonS50())
}
export const sansonS50Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A24-v3_0.html' target='_blank'>国土数値情報　振興山村データ</a>"

//--------------------------------------------------------
function SansonS41(){
  this.name = 'sanson'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/sanson_s41/{z}/{x}/{y}.mvt"
  });
  this.style = sansonStyleFunction();
}
export  const sansonS41Obj = {};
for (let i of mapsStr) {
  sansonS41Obj[i] = new VectorTileLayer(new SansonS41())
}
export const sansonS41Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A24-v3_0.html' target='_blank'>国土数値情報　振興山村データ</a>"

//--------------------------------------------------------
function SansonH28(){
  this.name = 'sanson'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/sanson_h28/{z}/{x}/{y}.mvt"
  });
  this.style = sansonStyleFunction();
}
export  const sansonH28Obj = {};
for (let i of mapsStr) {
  sansonH28Obj[i] = new VectorTileLayer(new SansonH28())
}
export const sansonH28Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A24-v3_0.html' target='_blank'>国土数値情報　振興山村データ</a>"
//------------------------------------------
const sansonColor = d3.scaleOrdinal(d3.schemeCategory10);
function sansonStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    const rgb = sansonColor(prop.A24_002)
    const style = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "black",
        width: 1
      }),
    });
    return style;
  }
}
//--------------------------------------------------------
function Iryouken1zi(){
  this.name = 'iryouken1zi'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/iryouken_1zi/{z}/{x}/{y}.mvt"
  });
  this.style = iryoukenStyleFunction(1);
}
export  const iryouken1ziObj = {};
for (let i of mapsStr) {
  iryouken1ziObj[i] = new VectorTileLayer(new Iryouken1zi())
}
export const iryouken1ziSumm = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A38-v2_0.html' target='_blank'>国土数値情報　医療圏データ</a>"

//--------------------------------------------------------
function Iryouken2zi(){
  this.name = 'iryouken2zi'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/iryouken_2zi/{z}/{x}/{y}.mvt"
  });
  this.style = iryoukenStyleFunction(2);
}
export  const iryouken2ziObj = {};
for (let i of mapsStr) {
  iryouken2ziObj[i] = new VectorTileLayer(new Iryouken2zi())
}
export const iryouken2ziSumm = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A38-v2_0.html' target='_blank'>国土数値情報　医療圏データ</a>"
//--------------------------------------------------------
function Iryouken3zi(){
  this.name = 'iryouken3zi'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/iryouken_3zi/{z}/{x}/{y}.mvt"
  });
  this.style = iryoukenStyleFunction(3);
}
export  const iryouken3ziObj = {};
for (let i of mapsStr) {
  iryouken3ziObj[i] = new VectorTileLayer(new Iryouken3zi())
}
export const iryouken3ziSumm = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A38-v2_0.html' target='_blank'>国土数値情報　医療圏データ</a>"

//------------------------------------------
const iryoukenColor = d3.scaleOrdinal(d3.schemeCategory10);
function iryoukenStyleFunction(iryouken) {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    let rgb
    switch (iryouken) {
      case 1:
        rgb = iryoukenColor(prop.A38a_001)
        break
      case 2:
        rgb = iryoukenColor(prop.A38b_003)
        break
      case 3:
        rgb = iryoukenColor(prop.A38c_001)
        break
    }
    const style = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "black",
        width: 1
      }),
    });
    return style;
  }
}
//--------------------------------------------------------
function Suikei500m(){
  this.name = 'suikei1km'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/suikei_500m/{z}/{x}/{y}.mvt"
  });
  this.style = suikeiStyleFunction(3);
}
export  const suikei500mObj = {};
for (let i of mapsStr) {
  suikei500mObj[i] = new VectorTileLayer(new Suikei500m())
}
export const suikei500mObjSumm = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-mesh500h30.html' target='_blank'>国土数値情報　500mメッシュ別将来推計人口データ</a>"

//--------------------------------------------------------
function Suikei1km(){
  this.name = 'suikei1km'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/suikei_1km/{z}/{x}/{y}.mvt"
  });
  this.style = suikeiStyleFunction(3);
}
export  const suikei1kmObj = {};
for (let i of mapsStr) {
  suikei1kmObj[i] = new VectorTileLayer(new Suikei1km())
}
export const suikei1kmObjSumm = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-mesh1000h30.html' target='_blank'>国土数値情報　1kmメッシュ別将来推計人口データ</a>"
//------------------------------------------
const suikeiColor = d3.scaleOrdinal(d3.schemeCategory10);
function suikeiStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    let rgb
    if (prop.PTN_2050) {
      const aaa = prop.PTN_2050 / prop.PTN_2020
      if (aaa > 1.1) {
        rgb = 'red'
      } else if (aaa > 1) {
        rgb = 'rgb(184,38,25)'
      } else if (aaa > 0.7) {
        rgb = 'rgb(89,119,246)'
      } else if (aaa > 0.5) {
        rgb = 'rgb(97,197,250)'
      } else if (aaa > 0.00000000000001) {
        rgb = 'rgb(140,252,114)'
      }
    } else {
      switch (prop.text) {
        case '増加':
          rgb = 'rgb(184,38,25)'
          break
        case '0%以上30%未満減少':
          rgb = 'rgb(89,119,246)'
          break
        case '30%以上50%未満減少':
          rgb = 'rgb(97,197,250)'
          break
        case '50%以上減少':
          rgb = 'rgb(140,252,114)'
          break
      }
    }
    const style = new Style({
      fill: new Fill({
        color: rgb
      }),
    });
    return style;
  }
}
//--------------------------------------------------------
function NougyouH27(){
  this.name = 'nougyou'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/nougyou_h27/{z}/{x}/{y}.mvt"
  });
  this.style = nougyouStyleFunction();
}
export  const nougyouH27Obj = {};
for (let i of mapsStr) {
  nougyouH27Obj[i] = new VectorTileLayer(new NougyouH27())
}
export const nougyouH27Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-mesh1000h30.html' target='_blank'>国土数値情報　1kmメッシュ別将来推計人口データ</a>"
//------------------------------------------
function nougyouStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    let rgb
    switch (prop.LAYER_NO) {
      case 5:
        rgb = 'rgb(163,222,192)'
        break
      case 6:
        rgb = 'rgb(166,142,186)'
        break
    }

    const style = new Style({
      fill: new Fill({
        color: rgb
      }),
    });
    return style;
  }
}
//H26ダム------------------------------------------------------------------------------------------------
function DamH26(){
  this.name = 'damh26'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:15,
    url: "https://kenzkenz.github.io/dam_h26/{z}/{x}/{y}.mvt"
  });
  this.style = damStyleFunction();
}
export const damh26Obj = {};
for (let i of mapsStr) {
  damh26Obj[i] = new VectorTileLayer(new DamH26(i))
}
export const damh26Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-W01.html' target='_blank'>国土数値情報　ダムデータ</a>";
// ----------------------------------------------------------------------------
function damStyleFunction () {
  return function(feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    let text = prop.W01_001
    const circleStyle = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({
          color: 'red'
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
    if(zoom>=11) {
      styles.push(textStyle);
    }
    return styles;
  };
}
//T9市町村------------------------------------------------------------------------------------------------
function CityT9(){
  this.name = 'city'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/city_t9/{z}/{x}/{y}.mvt"
  });
  this.style = cityStyleFunction();
}
export const cityT9Obj = {};
for (let i of mapsStr) {
  cityT9Obj[i] = new VectorTileLayer(new CityT9(i))
}
export const cityT9Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html' target='_blank'>国土数値情報　行政区域データ</a>";
//S25市町村------------------------------------------------------------------------------------------------
function CityS25(){
  this.name = 'city'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/city_s25/{z}/{x}/{y}.mvt"
  });
  this.style = cityStyleFunction();
}
export const cityS25Obj = {};
for (let i of mapsStr) {
  cityS25Obj[i] = new VectorTileLayer(new CityS25(i))
}
export const cityS25Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html' target='_blank'>国土数値情報　行政区域データ</a>";

//H07市町村------------------------------------------------------------------------------------------------
function CityH07(){
  this.name = 'city'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/city_h07/{z}/{x}/{y}.mvt"
  });
  this.style = cityStyleFunction();
}
export const cityH07Obj = {};
for (let i of mapsStr) {
  cityH07Obj[i] = new VectorTileLayer(new CityH07(i))
}
export const cityH07Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html' target='_blank'>国土数値情報　行政区域データ</a>";

//R03市町村------------------------------------------------------------------------------------------------
function CityR03(){
  this.name = 'city'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/city_r03/{z}/{x}/{y}.mvt"
  });
  this.style = cityStyleFunction();
}
export const cityR03Obj = {};
for (let i of mapsStr) {
  cityR03Obj[i] = new VectorTileLayer(new CityR03(i))
}
export const cityR03Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html' target='_blank'>国土数値情報　行政区域データ</a>";

//------------------------------------------
const cityColor = d3.scaleOrdinal(d3.schemeCategory10);
function cityStyleFunction() {
  return function (feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    const rgb = cityColor(prop.N03_001)
    const polygonStyle = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "white",
        width: 1
      })
    });
    const text = prop.N03_004
    const textStyle = new Style({
      text: new Text({
        font: "14px sans-serif",
        text: text,
        // placement:"point",
        // offsetY:10,
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
    styles.push(polygonStyle);
    if(zoom>=9) {
      styles.push(textStyle);
    }
    return styles;
  }
}
//農業集落境界------------------------------------------------------------------------------------------------
function Kyoukai(){
  this.name = 'kyoukai'
  this.source = new VectorTileSource({
    format: new MVT(),
    minZoom:1,
    maxZoom:13,
    url: "https://kenzkenz.github.io/kyoukai/{z}/{x}/{y}.mvt"
  });
  this.style = kyoukaiStyleFunction();
}
export const kyoukaiObj = {};
for (let i of mapsStr) {
  kyoukaiObj[i] = new VectorTileLayer(new Kyoukai(i))
}
export const kyoukaiSumm = "<a href='https://www.maff.go.jp/j/tokei/census/shuraku_data/2020/ma/index.html' target='_blank'>農業集落境界</a>";

//------------------------------------------
const kyoukaiColor = d3.scaleOrdinal(d3.schemeCategory10);
function kyoukaiStyleFunction() {
  return function (feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    const rgb = kyoukaiColor(prop.CITY)
    const polygonStyle = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "white",
        width: 1
      })
    });
    const text = prop.RCOM_NAME
    const textStyle = new Style({
      text: new Text({
        font: "14px sans-serif",
        text: text,
        // placement:"point",
        // offsetY:10,
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
    styles.push(polygonStyle);
    if(zoom>=9) {
      styles.push(textStyle);
    }
    return styles;
  }
}
//H17湖沼------------------------------------------------------------------------------------------------
function Kosyouh17(){
  this.name = 'kosyou'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/kosyou_h17/{z}/{x}/{y}.mvt"
  });
  this.style = kosyouStyleFunction();
}
export const kosyouH17Obj = {};
for (let i of mapsStr) {
  kosyouH17Obj[i] = new VectorTileLayer(new Kosyouh17(i))
}
export const kosyouH17Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-W09-v2_2.html' target='_blank'>国土数値情報　湖沼データ</a>";
//---------------------
function kosyouStyleFunction() {
  return function (feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    const rgb = 'blue'
    const polygonStyle = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "black",
        width: 2
      })
    });
    const text = prop.W09_001
    const textStyle = new Style({
      text: new Text({
        font: "14px sans-serif",
        text: text,
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
    styles.push(polygonStyle);
    if(zoom>=9) {
      styles.push(textStyle);
    }
    return styles;
  }
}
//H27鳥獣保護区------------------------------------------------------------------------------------------------
function ChyouzyuuH27(){
  this.name = 'chyouzyuu'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/chyouzyuu_h27/{z}/{x}/{y}.mvt"
  });
  this.style = chyouzyuuStyleFunction();
}
export const chyouzyuuH27Obj = {};
for (let i of mapsStr) {
  chyouzyuuH27Obj[i] = new VectorTileLayer(new ChyouzyuuH27(i))
}
export const chyouzyuuH27Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A15.html' target='_blank'>国土数値情報　鳥獣保護区データ</a>";
//---------------------
function chyouzyuuStyleFunction() {
  return function (feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    const rgb = 'green'
    const polygonStyle = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "black",
        width: 2
      })
    });
    const text = prop.A15_001
    const textStyle = new Style({
      text: new Text({
        font: "14px sans-serif",
        text: text,
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
    styles.push(polygonStyle);
    if(zoom>=9) {
      styles.push(textStyle);
    }
    return styles;
  }
}
//H23竜巻------------------------------------------------------------------------------------------------
function TatumakiH23(){
  this.name = 'tatumaki'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/tatumaki_h23/{z}/{x}/{y}.mvt"
  });
  this.style = tatumakiStyleFunction();
}
export const tatumakiH23Obj = {};
for (let i of mapsStr) {
  tatumakiH23Obj[i] = new VectorTileLayer(new TatumakiH23(i))
}
export const tatumakiH23Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A30b.html' target='_blank'>国土数値情報　竜巻等の突風データ</a>";
// ----------------------------------------------------------------------------
function tatumakiStyleFunction () {
  return function(feature, resolution) {
    // const zoom = getZoom(resolution);
    // const prop = feature.getProperties();
    const styles = [];
    // let text = prop.W01_001
    const circleStyle = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({
          color: 'blue'
        }),
        stroke: new Stroke({
          color: "white",
          width: 1
        })
      })
    })
    // const textStyle = new Style({
    //   text: new Text({
    //     font: "14px sans-serif",
    //     text: text,
    //     placement:"point",
    //     offsetY:10,
    //     fill: new Fill({
    //       color: "black"
    //     }),
    //     stroke: new Stroke({
    //       color: "white",
    //       width: 3
    //     }),
    //     exceedLength:true
    //   })
    // });
    styles.push(circleStyle);
    // if(zoom>=11) {
    //   styles.push(textStyle);
    // }
    return styles;
  };
}
//H30道の駅------------------------------------------------------------------------------------------------
function mitinoekiH30(){
  this.name = 'mitinoeki'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/mitinoeki_h30/{z}/{x}/{y}.mvt"
  });
  this.style = mitinoekiStyleFunction();
}
export const mitinoekiH30Obj = {};
for (let i of mapsStr) {
  mitinoekiH30Obj[i] = new VectorTileLayer(new mitinoekiH30(i))
}
export const mitinoekiH30Summ = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P35.html' target='_blank'>国土数値情報　道の駅データ</a>";
// ----------------------------------------------------------------------------
function mitinoekiStyleFunction () {
  return function(feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    let text = prop.P35_006
    const circleStyle = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({
          color: 'blue'
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
    if(zoom>=11) {
      styles.push(textStyle);
    }
    return styles;
  };
}
//東京地震------------------------------------------------------------------------------------------------
function TokyoZisin(){
  this.name = 'tokyoZisin'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/tokyo/{z}/{x}/{y}.mvt"
  });
  this.style = tokyoStyleFunction();
}
export const tokyoZisinObj = {};
for (let i of mapsStr) {
  tokyoZisinObj[i] = new VectorTileLayer(new TokyoZisin(i))
}
export const tokyoZisinSumm = "<a href='https://www.toshiseibi.metro.tokyo.lg.jp/bosai/chousa_6/home.htm' target='_blank'>地震に関する地域危険度測定調査</a><br>" +
    "<img src='https://kenzkenz.xsrv.jp/open-hinata/img/tokyo.jpeg' width='400px'>" +
    "<br>総合危険度ランクで色を塗っています。"
//東京地震2------------------------------------------------------------------------------------------------
function TokyoZisin2(){
  this.name = 'tokyoZisin'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/tokyo/{z}/{x}/{y}.mvt"
  });
  this.style = tokyoStyleFunction2()
}
export const tokyoZisin2Obj = {}
for (let i of mapsStr) {
  tokyoZisin2Obj[i] = new VectorTileLayer(new TokyoZisin2(i))
}
export const tokyoZisin2Summ = "<a href='https://www.toshiseibi.metro.tokyo.lg.jp/bosai/chousa_6/home.htm' target='_blank'>地震に関する地域危険度測定調査</a><br>" +
   "<br>災害時活動困難係数で色を塗っています。"
//---------------------
function tokyoStyleFunction() {
  return function (feature, resolution) {
    const zoom = getZoom(resolution)
    const prop = feature.getProperties()
    const styles = []
    let rgb = ''

    switch (prop.総合_ラ) {
      case 1:
        rgb = 'rgb(162,209,229)'
        break
      case 2:
        rgb = 'rgb(125,170,118)'
        break
      case 3:
        rgb = 'rgb(206,135,52)'
        break
      case 4:
        rgb = 'rgb(213,64,43)'
        break
      case 5:
        rgb = 'rgb(79,19,19)'
        break
    }
    const polygonStyle = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "white",
        width: 0.5
      })
    });
    const text = prop.町丁目名
    const textStyle = new Style({
      text: new Text({
        font: "14px sans-serif",
        text: text,
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
    styles.push(polygonStyle);
    if(zoom>=13) {
      styles.push(textStyle);
    }
    return styles;
  }
}
//---------------------
function tokyoStyleFunction2() {
  return function (feature, resolution) {
    const d3Color = d3.interpolateLab("white","red");
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    const rgb = d3.rgb(d3Color(prop.災害_係));
    const polygonStyle = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "white",
        width: 0.5
      })
    });
    const text = prop.町丁目名
    const textStyle = new Style({
      text: new Text({
        font: "14px sans-serif",
        text: text,
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
    styles.push(polygonStyle);
    if(zoom>=13) {
      styles.push(textStyle);
    }
    return styles;
  }
}

//--------------------------------------------------------
function TokuteiH28(){
  this.name = 'tokutei'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/tokutei_h28/{z}/{x}/{y}.mvt"
  });
  this.style = tokuteiStyleFunction();
}
export  const tokuteiH28Obj = {};
for (let i of mapsStr) {
  tokuteiH28Obj[i] = new VectorTileLayer(new TokuteiH28())
}
export const tokuteiSumm = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A24-v3_0.html' target='_blank'>国土数値情報　振興山村データ</a>"
const tokuteiColor = d3.scaleOrdinal(d3.schemeCategory10);
function tokuteiStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    const rgb = tokuteiColor(prop.A25_002)
    const style = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "black",
        width: 1
      }),
    });
    return style;
  }
}

//--------------------------------------------------------

var codeList_sizen = new Array(//図式コード,"色"]
    [10101,"#d9cbae"],
    [1010101,"#d9cbae"],
    [11201,"#d9cbae"],			    [10101,"#d9cbae"],
    [1010101,"#d9cbae"],
    [11201,"#d9cbae"],
    [11202,"#d9cbae"],
    [11203,"#d9cbae"],
    [11204,"#d9cbae"],
    [10202,"#9466ab"],
    [10204,"#9466ab"],
    [2010201,"#9466ab"],
    [10205,"#cc99ff"],
    [10206,"#cc99ff"],
    [10301,"#ffaa00"],
    [10302,"#ffaa00"],
    [10303,"#ffaa00"],
    [10304,"#ffaa00"],
    [10308,"#ffaa00"],
    [10314,"#ffaa00"],
    [10305,"#ffaa00"],
    [10508,"#ffaa00"],
    [2010101,"#ffaa00"],
    [10306,"#ffaa00"],
    [10307,"#ffaa00"],
    [10310,"#ffaa00"],
    [10312,"#ffaa00"],
    [10401,"#99804d"],
    [10402,"#99804d"],
    [10403,"#99804d"],
    [10404,"#99804d"],
    [10406,"#99804d"],
    [10407,"#99804d"],
    [3010101,"#99804d"],
    [10501,"#cacc60"],
    [10502,"#cacc60"],
    [3020101,"#cacc60"],
    [10503,"#ffff33"],
    [3040101,"#ffff33"],
    [10506,"#fbe09d"],
    [10507,"#fbe09d"],
    [10801,"#fbe09d"],
    [10504,"#ffff99"],
    [10505,"#ffff99"],
    [10512,"#ffff99"],
    [3050101,"#ffff99"],
    [10601,"#a3cc7e"],
    [2010301,"#a3cc7e"],
    [10701,"#bbff99"],
    [3030101,"#bbff99"],
    [10702,"#bbff99"],
    [10705,"#bbff99"],
    [10703,"#00d1a4"],
    [10804,"#00d1a4"],
    [3030201,"#00d1a4"],
    [10704,"#6699ff"],
    [3040201,"#6699ff"],
    [3040202,"#6699ff"],
    [3040301,"#1f9999"],
    [10802,"#9f9fc4"],
    [10803,"#9f9fc4"],
    [10807,"#9f9fc4"],
    [10808,"#9f9fc4"],
    [10805,"#e5ffff"],
    [10806,"#e5ffff"],
    [10901,"#e5ffff"],
    [10903,"#e5ffff"],
    [5010201,"#e5ffff"],
    [10904,"#779999"],
    [5010301,"#779999"],
    [11001,"#85c4d1"],
    [11003,"#85c4d1"],
    [11009,"#85c4d1"],
    [11011,"#85c4d1"],
    [4010301,"#85c4d1"],
    [11002,"#8ad8b6"],
    [11004,"#ef8888"],
    [11006,"#ef8888"],
    [11007,"#ef8888"],
    [11014,"#ef8888"],
    [4010201,"#ff4f4f"],
    [11005,"#ff4f4f"],
    [11008,"#c37aff"],
    [4010101,"#c37aff"],
    [11010,"#ffe8e8"],
    [999999,"#144dfa"],
    [101,"#e6e600"],
    [102,"#00e2e6"],
    [103,"#2ae600"],
    [104,"#e60400"],
    [105,"#5e5ce6"],

    [11,"#998b79"],
    [12,"#664d55"],
    [13,"#7580D2"],
    [21,"#C9FF05"],
    [31,"#FF0116"],
    [32,"#FF5101"],
    [33,"#C975B0"],
    [34,"#FFBBFC"],
    [41,"#ffb31a"],
    [51,"#C7FFF7"],
    [61,"#FFEA01"],
    [71,"#1201FF"],

    [1,"#998c7a"],
    [3,"#FF0116"],
    [4,"#ffb31a"],
    [5,"#C7FFF7"],
    [6,"#FFEA01"],
    [7,"#1201FF"],

    ["","#85B6E7"],
    [9999, "#ff00ff"]
        [11202,"#d9cbae"],
    [11203,"#d9cbae"],
    [11204,"#d9cbae"],
    [10202,"#9466ab"],
    [10204,"#9466ab"],
    [2010201,"#9466ab"],
    [10205,"#cc99ff"],
    [10206,"#cc99ff"],
    [10301,"#ffaa00"],
    [10302,"#ffaa00"],
    [10303,"#ffaa00"],
    [10304,"#ffaa00"],
    [10308,"#ffaa00"],
    [10314,"#ffaa00"],
    [10305,"#ffaa00"],
    [10508,"#ffaa00"],
    [2010101,"#ffaa00"],
    [10306,"#ffaa00"],
    [10307,"#ffaa00"],
    [10310,"#ffaa00"],
    [10312,"#ffaa00"],
    [10401,"#99804d"],
    [10402,"#99804d"],
    [10403,"#99804d"],
    [10404,"#99804d"],
    [10406,"#99804d"],
    [10407,"#99804d"],
    [3010101,"#99804d"],
    [10501,"#cacc60"],
    [10502,"#cacc60"],
    [3020101,"#cacc60"],
    [10503,"#ffff33"],
    [3040101,"#ffff33"],
    [10506,"#fbe09d"],
    [10507,"#fbe09d"],
    [10801,"#fbe09d"],
    [10504,"#ffff99"],
    [10505,"#ffff99"],
    [10512,"#ffff99"],
    [3050101,"#ffff99"],
    [10601,"#a3cc7e"],
    [2010301,"#a3cc7e"],
    [10701,"#bbff99"],
    [3030101,"#bbff99"],
    [10702,"#bbff99"],
    [10705,"#bbff99"],
    [10703,"#00d1a4"],
    [10804,"#00d1a4"],
    [3030201,"#00d1a4"],
    [10704,"#6699ff"],
    [3040201,"#6699ff"],
    [3040202,"#6699ff"],
    [3040301,"#1f9999"],
    [10802,"#9f9fc4"],
    [10803,"#9f9fc4"],
    [10807,"#9f9fc4"],
    [10808,"#9f9fc4"],
    [10805,"#e5ffff"],
    [10806,"#e5ffff"],
    [10901,"#e5ffff"],
    [10903,"#e5ffff"],
    [5010201,"#e5ffff"],
    [10904,"#779999"],
    [5010301,"#779999"],
    [11001,"#85c4d1"],
    [11003,"#85c4d1"],
    [11009,"#85c4d1"],
    [11011,"#85c4d1"],
    [4010301,"#85c4d1"],
    [11002,"#8ad8b6"],
    [11004,"#ef8888"],
    [11006,"#ef8888"],
    [11007,"#ef8888"],
    [11014,"#ef8888"],
    [4010201,"#ff4f4f"],
    [11005,"#ff4f4f"],
    [11008,"#c37aff"],
    [4010101,"#c37aff"],
    [11010,"#ffe8e8"],
    [999999,"#144dfa"],
    [101,"#e6e600"],
    [102,"#00e2e6"],
    [103,"#2ae600"],
    [104,"#e60400"],
    [105,"#5e5ce6"],
    [9999,"#ff00ff"]
);
// 簡易版
function Sizentikei0(name,minzoom,maxzoom,url){
  this.name = 'sizentikei0'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:minzoom,
      maxZoom:maxzoom
    }),
    url:url
  });
  this.style = sizentikeiStyleFunction(name);
  this.useInterimTilesOnError = false
}
export  const sizentikei0Obj = {};
for (let i of mapsStr) {
  sizentikei0Obj[i] = new VectorTileLayer(new Sizentikei0('sizentikei2',1,13,"https://maps.gsi.go.jp/xyz/experimental_landformclassification1/{z}/{x}/{y}.geojson"))
}
// 詳細版
function Sizentikei(name,minzoom,maxzoom,url){
  this.name = 'sizentikei'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:minzoom,
      maxZoom:maxzoom
    }),
    url:url
  });
  this.style = sizentikeiStyleFunction(name);
  this.useInterimTilesOnError = false
}
const sizentikeiObj1 = new VectorTileLayer(new Sizentikei('sizentikei3',1,13,"https://maps.gsi.go.jp/xyz/experimental_landformclassification3/{z}/{x}/{y}.geojson"))
const sizentikeiObj2 = new VectorTileLayer(new Sizentikei('sizentikei4',1,14,"https://maps.gsi.go.jp/xyz/experimental_landformclassification1/{z}/{x}/{y}.geojson"))
export const sizentikeiObj = {}
for (let i of mapsStr) {
  sizentikeiObj[i] = new LayerGroup({
    layers: [
      sizentikeiObj1,
      sizentikeiObj2
    ]
  })
}
export const sizentikeiSumm = "<a href='https://github.com/gsi-cyberjapan/experimental_landformclassification' target='_blank'>国土地理院ベクトルタイル提供実験（地形分類）</a>"
//---------------------------------------------
function Zinkoutikei(minzoom,maxzoom){
  this.name = 'zinkoutikei'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:minzoom,
      maxZoom:maxzoom
    }),
    url: "https://maps.gsi.go.jp/xyz/experimental_landformclassification2/{z}/{x}/{y}.geojson",
  });
  this.style = zinkoutikeiStyleFunction();
  this.useInterimTilesOnError = false
}
export  const zinkoutikeiObj = {};
for (let i of mapsStr) {
  zinkoutikeiObj[i] = new VectorTileLayer(new Zinkoutikei(1,14))
}
export const zinkoutikeiSumm = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A24-v3_0.html' target='_blank'>国土数値情報　振興山村データ</a>"
//--------------------------------------------
function sizentikeiStyleFunction(name) {
  if(name==="sizentikei3" || name==="sizentikei2") {
    return function (feature, resolution) {
      var zoom = getZoom(resolution);
      if (name==="sizentikei3") {
        if (zoom > 13) return;
      }
      var code = Number(feature.getProperties()["code"]);
      // console.log(code)
      var fillColor = 'rgba(0,0,0,0.1)';
      for (var i = 0; i < codeList_sizen.length; i++) {
        if (codeList_sizen[i][0] == code) {
          fillColor = codeList_sizen[i][1];
          break;
        }
      }
      return [new Style({
        fill: new Fill({
          color: fillColor
        })
      })];
    }
  } else {
    return function (feature, resolution) {
      var zoom = getZoom(resolution);
      // console.log(zoom);
      // console.log(resolution);
      //if (resolution >= 9.56) return;//9.56
      if (zoom < 14) return;
      var code = Number(feature.getProperties()["code"]);
      var fillColor = 'rgba(0,0,0,0.1)';
      for (var i = 0; i < codeList_sizen.length; i++) {
        if (codeList_sizen[i][0] == code) {
          fillColor = codeList_sizen[i][1];
          break;
        }
      }
      return [new Style({
        fill: new Fill({
          color: fillColor
        })
      })];
    }
  }
}
//---------------------------------------------------
function zinkoutikeiStyleFunction() {
    return function (feature, resolution) {
      var zoom = getZoom(resolution);
      // console.log(zoom);
      // console.log(resolution);
      //if (resolution >= 9.56) return;//9.56
      // if (zoom < 14) return;
      var code = Number(feature.getProperties()["code"]);
      var fillColor = 'rgba(0,0,0,0.1)';
      for (var i = 0; i < codeList_sizen.length; i++) {
        if (codeList_sizen[i][0] == code) {
          fillColor = codeList_sizen[i][1];
          break;
        }
      }
      return [new Style({
        fill: new Fill({
          color: fillColor
        })
      })];
    }
}
// 自然災害伝承碑-----------------------------------------------------
function Densyou(){
  this.name = 'densyou'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:7,
      maxZoom:7
    }),
    url: "https://cyberjapandata.gsi.go.jp/xyz/disaster_lore_all/{z}/{x}/{y}.geojson"
  });
  this.style = densyouStyleFunction();
}
export const densyouObj = {};
for (let i of mapsStr) {
  densyouObj[i] = new VectorTileLayer(new Densyou())
}
function densyouStyleFunction() {
  return function (feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const text = prop.LoreName
    const styles = [];
    const fillStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: "black"
        }),
        stroke: new Stroke({
          color: "white",
          width: 1
        })
      })
    });
    const textStyle = new Style({
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
    styles.push(fillStyle);
    if(zoom>=13) {
      styles.push(textStyle);
    }
    return styles;
  }
}
// 指定緊急避難場所-----------------------------------------------------
//洪水
function Hinanzyo01(){
  this.name = 'hinanzyo01'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:1,
      maxZoom:10
    }),
    url: "https://cyberjapandata.gsi.go.jp/xyz/skhb01/{z}/{x}/{y}.geojson"
  });
  this.style = hinanzyoStyleFunction('blue');
}
export const hinanzyo01Obj = {};
for (let i of mapsStr) {
  hinanzyo01Obj[i] = new VectorTileLayer(new Hinanzyo01())
}
//崖崩れ、土石流及び地滑り
function Hinanzyo02(){
  this.name = 'hinanzyo02'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:1,
      maxZoom:10
    }),
    url: "https://cyberjapandata.gsi.go.jp/xyz/skhb02/{z}/{x}/{y}.geojson"
  });
  this.style = hinanzyoStyleFunction('magenta');
}
export const hinanzyo02Obj = {};
for (let i of mapsStr) {
  hinanzyo02Obj[i] = new VectorTileLayer(new Hinanzyo02())
}
//地震
function Hinanzyo04(){
  this.name = 'hinanzyo04'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:1,
      maxZoom:10
    }),
    url: "https://cyberjapandata.gsi.go.jp/xyz/skhb04/{z}/{x}/{y}.geojson"
  });
  this.style = hinanzyoStyleFunction('brown');
}
export const hinanzyo04Obj = {};
for (let i of mapsStr) {
  hinanzyo04Obj[i] = new VectorTileLayer(new Hinanzyo04())
}
//津波
function Hinanzyo05(){
  this.name = 'hinanzyo05'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:1,
      maxZoom:10
    }),
    url: "https://cyberjapandata.gsi.go.jp/xyz/skhb05/{z}/{x}/{y}.geojson"
  });
  this.style = hinanzyoStyleFunction('steelblue');
}
export const hinanzyo05Obj = {};
for (let i of mapsStr) {
  hinanzyo05Obj[i] = new VectorTileLayer(new Hinanzyo05())
}
//大規模な火事
function Hinanzyo06(){
  this.name = 'hinanzyo06'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:1,
      maxZoom:10
    }),
    url: "https://cyberjapandata.gsi.go.jp/xyz/skhb06/{z}/{x}/{y}.geojson"
  });
  this.style = hinanzyoStyleFunction('red');
}
export const hinanzyo06Obj = {};
for (let i of mapsStr) {
  hinanzyo06Obj[i] = new VectorTileLayer(new Hinanzyo06())
}
//--------------------------
function hinanzyoStyleFunction(color) {
  return function (feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const text = prop.name
    const styles = [];
    const fillStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: color
        }),
        stroke: new Stroke({
          color: "white",
          width: 1
        })
      })
    });
    const textStyle = new Style({
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
    styles.push(fillStyle);
    if(zoom>=13) {
      styles.push(textStyle);
    }
    return styles;
  }
}
//郡------------------------------------------------------------------------------------------------
function Gun(){
  this.name = 'gun'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/gun2/{z}/{x}/{y}.mvt"
  });
  this.style = gunStyleFunction('PREF');
}
export  const gunObj = {};
for (let i of mapsStr) {
  gunObj[i] = new VectorTileLayer(new Gun())
}
export const gunSumm = "郡地図ver1.1.3で作成しました。<br><a href='https://booth.pm/ja/items/3053727' target='_blank'>郡地図研究会</a>";
// ----------------------------------------------------------------------
function Gunkuni(){
  this.name = 'gunkuni'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/gun2/{z}/{x}/{y}.mvt"
  });
  this.style = gunStyleFunction('KUNI');
}
export  const gunkuniObj = {};
for (let i of mapsStr) {
  gunkuniObj[i] = new VectorTileLayer(new Gunkuni())
}
//-----------------------------------------------------------------------
function Gunbakumatu(){
  this.name = 'gunbakumatu'
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom:13,
    url: "https://kenzkenz.github.io/gun0/{z}/{x}/{y}.mvt"
  });
  this.style = gunStyleFunction('KUNI');
}
export  const gunbakumatuObj = {};
for (let i of mapsStr) {
  gunbakumatuObj[i] = new VectorTileLayer(new Gunbakumatu())
}
//-------------------------------------------------------------------------
function gunStyleFunction(irowake) {
  return function (feature, resolution) {
    const zoom = getZoom(resolution);
    const prop = feature.getProperties();
    const styles = [];
    const rgb = cityColor(prop[irowake])
    const polygonStyle = new Style({
      fill: new Fill({
        color: rgb
      }),
      stroke: new Stroke({
        color: "white",
        width: 1
      })
    });
    const text = prop.KUNI + prop.GUN
    const textStyle = new Style({
      text: new Text({
        font: "14px sans-serif",
        text: text,
        // placement:"point",
        // offsetY:10,
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
    styles.push(polygonStyle);
    if(zoom>=9) {
      styles.push(textStyle);
    }
    return styles;
  }
}
//道路冠水想定箇所
function Kansui(){
  this.name = 'kansui'
  this.source = new VectorTileSource({
    format: new GeoJSON({defaultProjection:'EPSG:4326'}),
    tileGrid: new createXYZ({
      minZoom:1,
      maxZoom:15
    }),
    url: "https://disaportal.gsi.go.jp/data/vector/10_kansui/{z}/{x}/{y}.geojson"
  });
  this.style = hinanzyoStyleFunction('orange');
  this.useInterimTilesOnError = false
}
export const kansuiObj = {};
for (let i of mapsStr) {
  kansuiObj[i] = new VectorTileLayer(new Kansui())
}
function Kansui0 () {
  this.source = new XYZ({
    url:  "https://disaportal.gsi.go.jp/data/raster/10_kansui/{z}/{x}/{y}.png",
    crossOrigin: 'Anonymous',
    minZoom: 1,
    maxZoom: 15
  })
  this.useInterimTilesOnError = false
}
export const kansui0Obj = {};
for (let i of mapsStr) {
  kansui0Obj[i] = new TileLayer(new Kansui0())
}
export const kansui00Obj = {};
for (let i of mapsStr) {
  kansui00Obj[i] = new LayerGroup({
    layers: [
      kansui0Obj[i],
      kansuiObj[i],
    ]
  })
}
function Rosen() {
  this.name = "rosen";
  this.style = rosenStyleFunction();
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom: 13,
    url: "https://kenzkenz.github.io/rosen/{z}/{x}/{y}.mvt"
  });
}
export const rosenObj = {};
for (let i of mapsStr) {
  rosenObj[i] = new VectorTileLayer(new Rosen())
}
export const rosenSumm = "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N05-v2_0.html' target='_blank'>国土数値情報　鉄道データ</a>"
// ------------------------------------
function rosenStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    // console.log(feature)
    const genzon = prop["N05_005e"];
    const haisi = prop.haisi
    const name = prop["N05_002"];
    let strokeColor;
    let strokeWidth;
    if (genzon === '9999') {
      strokeColor = "mediumblue";
      strokeWidth = 8;
    } else {
      // strokeColor = "red";
      // strokeWidth = 4;
    }
    const style = new Style({
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth,
      })
    });
    return style;
  }
}
function Rosenhaisi() {
  this.name = "rosen";
  this.style = rosenhaisiStyleFunction();
  this.source = new VectorTileSource({
    format: new MVT(),
    maxZoom: 13,
    url: "https://kenzkenz.github.io/rosen/{z}/{x}/{y}.mvt"
  });
}
export  const rosenhaisiObj = {};
for (let i of mapsStr) {
  rosenhaisiObj[i] = new VectorTileLayer(new Rosenhaisi())
}
// export const rosenSumm = ""
// ------------------------------------
function rosenhaisiStyleFunction() {
  return function (feature, resolution) {
    const prop = feature.getProperties();
    // console.log(feature)
    const genzon = prop["N05_005e"];
    const haisi = prop.haisi
    const name = prop["N05_002"];
    let strokeColor;
    let strokeWidth;
    if (haisi===1) {
      strokeColor = "red";
      strokeWidth = 8;
    } else if (genzon === '9999') {
    } else {
      strokeColor = "red";
      strokeWidth = 8;
    }
    const style = new Style({
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth,
      })
    });
    return style;
  }
}
export const rosen0Obj = {};
for (let i of mapsStr) {
  rosen0Obj[i] = new LayerGroup({
    layers: [
      rosenhaisiObj[i],
      rosenObj[i],
    ]
  })
}