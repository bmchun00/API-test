var marker = null;    //마커 객체
var lineLayer = null;   //샘플 폴리라인 객체
var polygonLayer = null;   //샘플 폴리곤 객체

var circle = null;  //원 객체
var rectangle = null; //사각형 객체

var curOldMapMode = null; //고지도 상태
var curOpacity = 0.7;

//베이스맵 변경
function mapChange() {
	var mapMode = $("#mapMode").val();
	BaseMapChange(map, eval(mapMode));
}

//오버레이맵(고지도) 변경
function oldMapChange() {
	var oldMapMode = $("#oldMapMode").val();
	OverMapChange(map, eval(curOldMapMode), false);
	if(oldMapMode!="") {
		OverMapChange(map, eval(oldMapMode), true);
		curOldMapMode = oldMapMode;
	}else {
		curOldMapMode = "";
	}
}

//고지도 투명도 +
function increOpacity(){
   if(curOpacity < 1) {
	   curOpacity += 0.1;
   }
   setOldMapOpacity(curOpacity);
}

//고지도 투명도 -
function decreOpacity(){
   if(curOpacity > 0) {
	   curOpacity -= 0.1;
   }
   setOldMapOpacity(curOpacity);
}

var value = new Array( new Array(18), new Array(5) );
value[0] = [37.5118,127.0592,1,2,1];

//마커 표현 및 툴팁 샘플
function setPoint() {
	mkClear();
	map.setView([ value[0][0], value[0][1] ], 10); //지도 위치 이동  (좌표, 지도 레벨)
	marker = new L.Marker(new L.LatLng(value[0][0], value[0][1]),{icon: new L.Icon({   // 마커 찍기
    	iconUrl: "./img/pin_1.png",   //핀 이미지
    	iconAnchor: [13,34],  // 오프셋 (핀의 끝이 좌표로 매칭하기 위해 적용)
    })}).addTo(map);
	var content = "그래서누르면이렇게툴팁내용이뜹니다어때요개나이스";
	marker.bindPopup(mkContent(content),{minWidth:20,offset:[0,-30]});
}

//마커 이미지 변경
function mkImgChange(mode) {
	if(marker!=null) {
		if(mode==1) {
			marker.setIcon(new L.Icon({
				iconUrl: "./img/pin_1.png",   //핀 이미지
				iconAnchor: [13,34],
		   }));
		}else if(mode==2) {
			marker.setIcon(new L.Icon({
				iconUrl: "./img/pin_2.png",   //핀 이미지
				iconAnchor: [13,34],
		   }));
		}
		marker.closePopup();
		var content = "툴팁내용";
		marker.bindPopup(mkContent(content),{minWidth:20,offset:[0,-30]});
	}
}


//마커 툴팁 내용 샘플
function mkContent(content){
	html_ = "<p>"+content+"</p>";
	return html_;
}

//마커 삭제
function mkClear() {
	if(marker!=null) {
		map.removeLayer(marker);
		marker = null;
	}
}


//폴리라인 샘플
function polyline() {
	polylineClear();

	//폴리라인 json 구현
	var linedata = "";
	linedata = {};
	linedata.type="Feature";  //중요
	linedata.geometry={};
	linedata.geometry.type="LineString";  //  중요  타입(폴리라인 : LineString)
	linedata.geometry.coordinates=[];

	//샘플 폴리라인 좌표============
	var coordsX = new Array();
	var coordsY = new Array();
	coordsX.push(960942.7);
	coordsY.push(1946038.15);

	coordsX.push(960948.83);
	coordsY.push(1946076.53);

	coordsX.push(961053.23);
	coordsY.push(1946087.03);

	coordsX.push(961092.27);
	coordsY.push(1946006.88);

	coordsX.push(961167.21);
	coordsY.push(1945909.15);
	//=============================

	lineLayer = new L.GeoJSON(
			linedata, {
				style : function() {
					return {
						weight: 4,   //라인굵기
						color : "#0100FF",  // 라인컬러
						opacity : 1   //투명도
					};
				}
			}).addTo(map);


	for(var i=0; i<coordsX.length; i++) {
		var geoWgs = Coord_Trans("utmktowgs", new PT(coordsX[i], coordsY[i]));  //위경도로 좌표 변환
		//json 에 좌표 적용
		linedata.geometry.coordinates[i]=[];
		linedata.geometry.coordinates[i][0] = geoWgs.y;  //latitude
		linedata.geometry.coordinates[i][1] = geoWgs.x;  //longitude
	}

	//linedata 지도에 표현
	lineLayer = new L.GeoJSON(
		linedata, {
			style : function() {
				return {
					weight: 4,   //라인굵기
					color : "#0100FF",  // 라인컬러
					opacity : 1   //투명도
				};
			}
		}).addTo(map);

	map.fitBounds(lineLayer.getBounds(),{ padding: [100, 100] });  // 레이어 크기만큼 지도 레벨조정및 위치이동
}

//폴리라인 색 변경
function polylineChange(mode) {
	if(lineLayer!=null) {
		if(mode==1) {
			lineLayer.setStyle({color:"#0100FF"});
		}else if(mode==2) {
			lineLayer.setStyle({color:"#FF0000"});
		}
	}
}

//폴리라인 삭제
function polylineClear() {
	if(lineLayer!=null) {
		map.removeLayer(lineLayer);
		lineLayer = null;
	}
}

//폴리곤 샘플
function polygon() {
	polygonClear();

	var polygondata = "";
	polygondata = {};
	polygondata.type="Feature";  //중요
	polygondata.geometry={};
	polygondata.geometry.type="Polygon";  //  중요  타입(폴리곤 : Polygon)
	polygondata.geometry.coordinates=[];

	//샘플 폴리라인 좌표============
	var coordsX = new Array();
	var coordsY = new Array();
	coordsX.push(960968.53);
	coordsY.push(1945816.78);

	coordsX.push(960941.88);
	coordsY.push(1945805.22);

	coordsX.push(960915.58);
	coordsY.push(1945870.26);

	coordsX.push(960942.89);
	coordsY.push(1945881.12);

	coordsX.push(960968.53);
	coordsY.push(1945816.78);
	//=============================
	polygondata.geometry.coordinates[0]=[];
	for(var i=0; i<coordsX.length; i++) {
		var geoWgs = Coord_Trans("utmktowgs", new PT(coordsX[i], coordsY[i]));  //위경도로 좌표 변환
		//json 에 좌표 적용
		polygondata.geometry.coordinates[0][i]=[];
		polygondata.geometry.coordinates[0][i][0] = geoWgs.y;  //latitude
		polygondata.geometry.coordinates[0][i][1] = geoWgs.x;  //longitude
	}

	polygonLayer = new L.GeoJSON(
		polygondata, {
			style : function() {
				return {
					weight: 4,   //라인굵기
					color : "#0100FF",  // 라인컬러
					opacity : 1,   //투명도
					fillColor : "#0100FF",  //폴리곤 내부 컬러
					fillOpacity : 0.5  //폴리곤 내부 투명도
				};
			}
		}).addTo(map);

	map.fitBounds(polygonLayer.getBounds(),{ padding: [100, 100] });  // 레이어 크기만큼 지도 레벨조정및 위치이동
}

//폴리곤 색 변경
function polygonChange(mode) {
	if(polygonLayer!=null) {
		if(mode==1) {
			polygonLayer.setStyle({color:"#0100FF",fillColor : "#0100FF"});
		}else if(mode==2) {
			polygonLayer.setStyle({color:"#FF0000",fillColor : "#FF0000"});
		}
	}
}

//폴리곤 삭제
function polygonClear() {
	if(polygonLayer!=null) {
		map.removeLayer(polygonLayer);
		polygonLayer = null;
	}
}


//모든 마커,레이어 삭제 (초기화)
function allClear() {
	vMarkerClear();
	vLayerClear();
	mkClear();
	polygonClear();
	polylineClear();
	markersClear();
	layersClear();
}

//원 레이어
function circle1() {
	circleClear();
	circle = new L.Circle(
			map.getCenter(),100
	).addTo(map);
	circle.setStyle({
		weight: 2,
		color : "#0100FF",
		opacity : 1,
		fillColor : "#0100FF",
		fillOpacity : 0
	});
}

//원 레이어 삭제
function circleClear() {
	if(circle!=null) {
		map.removeLayer(circle);
		circle = null;
	}
}


//원 레이어
function rectangle1() {
	rectangleClear();
	var geoWgsSouthwest = Coord_Trans("utmktowgs", new PT(960891,1945871.08));  //위경도로 좌표 변환  (왼쪽 아래)
	var geoWgsNortheast = Coord_Trans("utmktowgs", new PT(961199,1945967.08));  //위경도로 좌표 변환  (오른쪽 위)
	var southwest = L.latLng(geoWgsSouthwest.y,geoWgsSouthwest.x);
	var northeast = L.latLng(geoWgsNortheast.y,geoWgsNortheast.x);
	var bounds = L.latLngBounds(southwest, northeast);
	rectangle = new L.rectangle(bounds).addTo(map);
	rectangle.setStyle({
		weight: 2,
		color : "#0100FF",
		opacity : 1,
		fillColor : "#0100FF",
		fillOpacity : 0
	});
}

//원 레이어 삭제
function rectangleClear() {
	if(rectangle!=null) {
		map.removeLayer(rectangle);
		rectangle = null;
	}
}



function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}
	return zero + n;
}


function objectToJSONString(object) {
	var isArray = (object.join && object.pop && object.push
			&& object.reverse && object.shift && object.slice && object.splice);
	var results = [];

	for ( var i in object) {
		var value = object[i];

		if (typeof value == "object" && value != null)
			results.push((isArray ? "" : "\"" + i.toString() + "\" : ")
					+ objectToJSONString(value));
		else
			results.push((isArray ? "" : "\"" + i.toString() + "\" : ")
					+ (typeof value == "string" ? "\"" + value + "\""
							: value));
	}
	return (isArray ? "[" : "{") + results.join(", ") + (isArray ? "]" : "}");
}
