import store from './store'
import { transform, fromLonLat } from 'ol/proj.js'
import axios from 'axios'
export function popUp(map,layers,features,overlay,evt,content) {
  let cont
  const coordinate = evt.coordinate;
  console.log(layers[0].get('name'))
  const prop = features[0].getProperties();
  console.log(prop)
  switch (layers[0].get('name') ) {
    // 小学校区
    case 'syougakkoukuH28':
    case 'syougakkoukuH22':
      console.log(prop)
      if(prop.A27_001) {
        cont = '市区町村コード＝' + prop.A27_001 + '<br>' +
            '設置主体=' + prop.A27_002 + '<br>' +
            '名称＝' + prop.A27_003 + '<br>' +
            '所在地＝' + prop.A27_004 + '<br>'
      } else {
        cont = '市区町村コード＝' + prop.A27_005 + '<br>' +
            '設置主体=' + prop.A27_006 + '<br>' +
            '名称＝' + prop.A27_007 + '<br>' +
            '所在地＝' + prop.A27_008 + '<br>'
      }
      break;
    case 'syougakkouku':
      if(prop.A27_001) {
        cont = '市区町村コード＝' + prop.A27_001 + '<br>' +
                    '設置主体=' + prop.A27_002 + '<br>' +
                    '名称＝' + prop.A27_004 + '<br>' +
                    '所在地＝' + prop.A27_005 + '<br>'
      } else {
        cont = '市区町村コード＝' + prop.P29_001 + '<br>' +
                    '名称＝' + prop.P29_004 + '<br>' +
                    '所在地＝' + prop.P29_005 + '<br>'
      }
      break;
    // 中学校区
    case 'tyuugakkouku' :
      if(prop.A32_001) {
        cont = '市区町村コード＝' + prop.A32_001 + '<br>' +
                    '設置主体=' + prop.A32_002 + '<br>' +
                    '名称＝' + prop.A32_004 + '<br>' +
                    '所在地＝' + prop.A32_005
      } else {
        cont = '市区町村コード＝' + prop.P29_001 + '<br>' +
                    '名称＝' + prop.P29_004 + '<br>' +
                    '所在地＝' + prop.P29_005 + '<br>'
      }
      break;
    case 'tyuugakkoukuH25' :
      if(prop.A32_001) {
        cont = '市区町村コード＝' + prop.A32_001 + '<br>' +
            '設置主体=' + prop.A32_002 + '<br>' +
            '名称＝' + prop.A32_003
      } else {
        cont = '市区町村コード＝' + prop.P29_001 + '<br>' +
            '名称＝' + prop.P29_005 + '<br>' +
            '所在地＝' + prop.P29_006 + '<br>'
      }
       break;
    case 'tyuugakkoukuH28' :
      if(prop.A32_001) {
        cont = '市区町村コード＝' + prop.A32_001 + '<br>' +
            '設置主体=' + prop.A32_002 + '<br>' +
            '名称＝' + prop.A32_003
      } else {
        cont = '市区町村コード＝' + prop.A32_006 + '<br>' +
            '設置主体=' + prop.A32_007 + '<br>' +
            '名称＝' + prop.A32_008 + '<br>' +
            '所在地＝' + prop.A32_009 + '<br>'
      }
      break;
    case 'youtoH23' :
    case 'youtoR01' :
      cont = '都道府県名＝' + prop.A29_002 + '<br>' +
          '市区町村名=' + prop.A29_003 + '<br>' +
          '用途地域分類＝' + prop.A29_004 + '<br>' +
          '用途地域名＝' + prop.A29_005 + '<br>' +
          '建ぺい率＝' + prop.A29_006 + '<br>' +
          '容積率＝' + prop.A29_007 + '<br>'
      break;
    case 'tosiH30' :
      // const layerNo =prop.layer_no
      switch (prop.layer_no) {
        case 1://市街化区域
          cont = "市街化区域";
          break;
        case 2://市街化調整区域
          cont = "市街化調整区域";
          break;
        case 3://その他用途地域
          cont = "その他用途地域";
          break;
        case 4://用途未設定
          cont = "用途未設定";
          break;
      }
    case 'tosiH18' :
      switch (prop.A09_003) {
        case '1'://市街化区域
          cont = "市街化区域";
          break;
        case '2'://市街化調整区域
          cont = "市街化調整区域";
          break;
        case '3'://その他用途地域
          cont = "その他用途地域";
          break;
        case '4':
          cont = "用途未設定";
          break;
      }
      break;
    case 'kasoS45' :
    case 'kasoS60' :
    case 'kasoH29' :
      switch (prop.A17_009) {
        case '01':
        case 1:
          cont = "過疎市町村";
          break;
        case '02':
        case 2:
          cont = "過疎地域とみなされる市町村";
          break;
        case '03':
        case 3:
          cont = "過疎地域とみなされる区域";
          break;
      }
      cont = cont + '<hr>' + prop.A17_006
      break;
     // 夜の明かり
    case 'japanLight':
      if(map.getView().getZoom()>7) cont = '明るさレベル＝' +  prop.light
      break
    case 'didh27':
      cont = '人口=' + prop.人口.toLocaleString() + '人'
      break
    case 'dids40':
    case 'dids50':
    case 'dids60':
    case 'didh07':
    case 'didh17':
    case 'didh12':
    case 'didh02':
    case 'dids55':
    case 'dids45':
    case 'dids35':
    case 'didh22':
      cont = '人口=' + Number(prop.A16_005).toLocaleString() + '人'
      break
    case 'suiro':
      cont = '区　分＝' + prop.rivCtg + '<br>タイプ＝' + prop.type
      break
    case 'hinan':
      if (prop.P20_005 !== -1) {
        cont = prop.P20_002 + '<br>' + prop.P20_003 + '<br>収容人数：' + prop.P20_005 + '人'
      } else {
        cont = prop.P20_002 + '<br>' + prop.P20_003
      }
      break
    case 'kouziR04':
      cont = prop.L01_024 +'<br>公示価格＝' + Number(prop.L01_100).toLocaleString() + '円'
      break
    case 'kouziH25':
    case 'kouziH19':
      cont = prop.L01_019 +'<br>公示価格＝' + Number(prop.L01_006).toLocaleString() + '円'
      break
    case 'kouziH30':
      cont = prop.L01_023 +'<br>公示価格＝' + Number(prop.L01_091).toLocaleString() + '円'
      break
    case 'hude':
      if (prop.land_type === 100) {
        cont = '田'
      } else {
        cont = '畑'
      }
      break
    case 'sanson':
      cont = prop.A24_003 + prop.A24_006
      break
    case 'iryouken1zi':
      cont = prop.A38a_002
      break
    case 'iryouken2zi':
      cont = prop.A38b_004
      break
    case 'iryouken3zi':
      cont = prop.A38c_001
      break
    case 'suikei1km':
      if (prop.PTN_2015) {
        cont = '2020年人口＝' + prop.PTN_2020 +
            '<br>2050年人口＝' + prop.PTN_2050 +
            '<br>2050/2020＝' + Math.floor(prop.PTN_2050 / prop.PTN_2020 * 100) + '%'
      } else {
        cont = prop.text
      }
      break
    case 'nougyou':
      if (prop.LAYER_NO === 5) {
        cont = '農業地域 '
      } else {
        cont = '農用地区域'
      }
        break
    case 'damh26':
      cont = 'ダム名＝' + prop.W01_001
      break
    case 'city':
      cont = prop.N03_004
      break
    case 'kyoukai':
      cont = prop.RCOM_NAME
      break
    case 'kosyou':
      cont = prop.W09_001
      break
    case 'chyouzyuu':
      cont = prop.A15_001
      break
    case 'tatumaki':
      cont = prop.A30b_005 + prop.A30b_006 + prop.A30b_007 +
            '<br>' + prop.A30b_002 +
            '<br>発生日時' + prop.A30b_003

      break
    case 'mitinoeki':
      cont = "<a href=" + prop.P35_007 + " target='_blank'>" + prop.P35_006 + "</a>"
      break
    case 'tokyoZisin':
      cont = '地区名＝' + prop.区市町村名 + prop.町丁目名 +
             '<br>建物倒壊危険度ランク＝' + prop.建物_ラ +
             '<br>建物倒壊危険度順位＝' + prop.建物_順 +
             '<br>火災危険度ランク＝' + prop.火災_ラ +
             '<br>火災危険度順位＝' + prop.火災_順 +
             '<br>総合危険度ランク＝' + prop.総合_ラ +
             '<br>総合危険度順位＝' + prop.総合_順 +
             '<br>災害時活動困難係数＝' + prop.災害_係
      break
  }
  content.innerHTML = cont
  if (cont && cont !== undefined) overlay.setPosition(coordinate);
}
//----------------------------------------------------------------------------------------
export function popupSeamless(overlay,evt,content) {
  const coordinate = evt.coordinate;
  const coord4326 = transform(coordinate, "EPSG:3857", "EPSG:4326");
  const point = coord4326[1] + "," + coord4326[0];
  console.log("https://gbank.gsj.jp/seamless/v2/api/1.2/legend.json/?point=" + point);
  const url = 'https://gbank.gsj.jp/seamless/v2/api/1.2/legend.json'
  axios.get(url, {
    params: {
      point:point
    }
  }) .then(function (response) {
    console.log(response.data)
    const cont =
        '形成時代 = ' + response.data["formationAge_ja"] +
        '<hr>グループ = '+ response.data["group_ja"] +
        '<hr>岩相 = ' + response.data["lithology_ja"]
    content.innerHTML = cont

    if (response.data.symbol) {
      overlay.setPosition(coordinate)
    } else {
      overlay.setPosition(undefined);
    }
  });
}
//----------------------------------------------------------------------------------------
export function popUpShinsuishin(rgba) {
    const r = rgba[0]
    const g = rgba[1]
    const b = rgba[2]
    let cont
    if(r===255 && g===255 && b===179) {
      cont = "洪水浸水深　0.5m未満"
    }else if(r===247 && g===245 && b===169) {
      cont = "洪水浸水深　0.5m未満"
    }else if(r===255 && g===216 && b===192) {
      cont = "洪水浸水深　0.5〜3.0m"
    }else if(r===255 && g===183 && b===183) {
      cont = "洪水浸水深　3.0〜5.0m"
    }else if(r===255 && g===145 && b===145) {
      cont = "洪水浸水深　5.0〜10.0m"
    }else if(r===242 && g===133 && b===201) {
      cont = "洪水浸水深　10.0〜20.0m"
    }else if(r===220 && g===122 && b===220) {
      cont = "洪水浸水深　20.0m以上"
    }
    store.commit('base/popUpContUpdate',cont)
}
//----------------------------------------------------------------------------------------
export function popUpTunami(rgba) {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  let cont
  if(r===255 && g===255 && b===179) {
    cont = "津波浸水深　0.3m未満"
  }else if(r===247 && g===245 && b===169) {
    cont = "津波浸水深　0.3~0.5m"
  }else if(r===248 && g===225 && b===166) {
    cont = "津波浸水深　0.5~1.0m"
  }else if(r===255 && g===216 && b===192) {
    cont = "津波浸水深　1.0~3.0m"
  }else if(r===255 && g===183 && b===183) {
    cont = "津波浸水深　3.0~5.0m"
  }else if(r===255 && g===145 && b===145) {
    cont = "津波浸水深　5.0~10.0m"
  }else if(r===242 && g===133 && b===201) {
    cont = "津波浸水深　10.0~20.0m"
  }else if(r===220 && g===122 && b===220) {
    cont = "津波浸水深　20.0m以上"
  }
  store.commit('base/popUpContUpdate',cont)
}
//----------------------------------------------------------------------------------------
export function popUpKeizoku(rgba) {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  let cont
  if(r===160 && g===210 && b===255) {
    cont = "浸水継続　12時間未満"
  }else if(r===0 && g===65 && b===255) {
    cont = "浸水継続　12時間~1日未満"
  }else if(r===250 && g===245 && b===0) {
    cont = "浸水継続　1日~3日未満"
  }else if(r===255 && g===153 && b===0) {
    cont = "浸水継続　3日~1週間未満"
  }else if(r===255 && g===40 && b===0) {
    cont = "浸水継続　1週間~2週間未満"
  }else if(r===180 && g===0 && b===104) {
    cont = "浸水継続　2週間~4週間未満"
  }else if(r===96 && g===0 && b===96) {
    cont = "浸水継続　4週間以上~"
  }
  store.commit('base/popUpContUpdate',cont)
  }
//----------------------------------------------------------------------------------------
export function popUpTakasio(rgba) {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  let cont
  if(r===255 && g===255 && b===179) {
    cont = "高潮浸水深　0.3m未満"
  }else if(r===247 && g===245 && b===169) {
    cont = "高潮浸水深　0.3~0.5m"
  }else if(r===248 && g===225 && b===166) {
    cont = "高潮浸水深　0.5~1.0m"
  }else if(r===255 && g===216 && b===192) {
    cont = "高潮浸水深　1.0~3.0m"
  }else if(r===255 && g===183 && b===183) {
    cont = "高潮浸水深　3.0~5.0m"
  }else if(r===255 && g===145 && b===145) {
    cont = "高潮浸水深　5.0~10.0m"
  }else if(r===242 && g===133 && b===201) {
    cont = "高潮浸水深　10.0~20.0m"
  }else if(r===220 && g===122 && b===220) {
    cont = "高潮浸水深　20.0m以上"
  }
  store.commit('base/popUpContUpdate',cont)
}
//----------------------------------------------------------------------------------------
export function popUpDosya(rgba) {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  let cont
  if(r===230 && g===200 && b===50) {
    cont = "土砂災害の危険性：土石流警戒区域(指定済)（山腹が崩壊して生じた土石等又は渓流の土石等が水と一体となって流下する自然現象）"
  }else if(r===165 && g===0 && b===33) {
    cont = "土砂災害の危険性：土石流特別警戒区域(指定済)（山腹が崩壊して生じた土石等又は渓流の土石等が水と一体となって流下する自然現象）"
  }
  store.commit('base/popUpContUpdate',cont)
}
//----------------------------------------------------------------------------------------
export function popUpDoseki(rgba) {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  let cont
  if(r===245 && g===153 && b===101) {
    cont = "土砂災害の危険性：土石流危険渓流（土石流の発生の危険性があり、人家等に被害を与えるおそれがある渓流）"
 }
  store.commit('base/popUpContUpdate',cont)
}
//----------------------------------------------------------------------------------------
export function popUpKyuukeisyai(rgba) {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  let cont
  if(r===224 && g===224 && b===254) {
    cont = "土砂災害の危険性：急傾斜地崩壊危険箇所（傾斜度30°かつ高さ5m以上の急傾斜地で人家等に被害を与えるおそれのある箇所）"
  }
  store.commit('base/popUpContUpdate',cont)
}
//----------------------------------------------------------------------------------------
export function popUpZisuberi(rgba) {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  let cont
  if(r===255 && g===235 && b===223) {
    cont = "土砂災害の危険性：地すべり危険箇所（地すべりが発生している又は地すべりが発生するおそれがある区域のうち、人家等に被害を与えるおそれのある箇所）"
  }
  store.commit('base/popUpContUpdate',cont)
}
//----------------------------------------------------------------------------------------
export function popUpNadare(rgba) {
  const r = rgba[0]
  const g = rgba[1]
  const b = rgba[2]
  let cont
  if(r===255 && g===255 && b===101) {
    cont = "土砂災害の危険性：雪崩危険箇所（雪崩災害のおそれがある地域において、雪崩により人家等に被害を与えるおそれのある箇所）"
  }
  store.commit('base/popUpContUpdate',cont)
}
