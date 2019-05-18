// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
// var result;
var map;
var latlng;
var newInfoWindow;
var marker = [];
var infoWindow = [];
var tokyoMarkerData = [
	{
        name: '新宿コズミックセンター',
        lat: 35.705148, 
        lng: 139.708166
 }, {
        name: '損保ジャパンビル(旧安田ビル)',
        lat: 35.690586,
        lng: 139.698028
 }, {
        name: '立教大学ウィリアムズホール',
        lat: 35.729537,
        lng: 139.701921
 }, {
        name: '池袋駅メトロポリタン',
        lat: 35.729288,
        lng: 139.710001
    }

];


var saitamaMarkerData = [
	{
        name: '浦和駅（浦和駅西口地下道）',
        lat: 35.859037,
        lng: 139.657145
    }

];

var kanagawaMarkerData = [
	{
        name: '溝の口駅',
        lat: 35.599905,
        lng: 139.610459
    }

];





// mapを表示するメソッド
function initMap(){
		var mapLatLng = new google.maps.LatLng({lat: 35.680350, lng: 139.768356}); // 緯度経度のデータ作成
		map = new google.maps.Map(document.getElementById('sample'),{
			center: mapLatLng,
			zoom: 10
		});
}

// 現在地の取得
function getMyPlace() {
  var output = document.getElementById("result");
  if (!navigator.geolocation){//Geolocation apiがサポートされていない場合
    output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;//緯度
    var longitude = position.coords.longitude;//経度
    output.innerHTML = '<p>緯度 ' + latitude + '° <br>経度 ' + longitude + '°</p>';
    // 位置情報
    latlng = new google.maps.LatLng( latitude , longitude ) ;

    console.log("現在地は"+latlng);
    map.setCenter(latlng);
    var template = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="40px" height="40px">',
        '<path d="M39,19c0,11-15,25-15,25S9,30,9,19a15,15,0,0,1,30,0Z" fill="{{ color1 }}"/>',
        '<circle cx="24" cy="19" r="8" fill="{{ color2 }}"/>',
        '<text x="24" y="19" font-size="20" text-anchor="middle" stroke-width="0.5" fill="blue"></text>',
    '</svg>'].join('\n');
    var svg = template.replace('{{ color1 }}','#F27398').replace('{{ color2 }}', '#58BE89');
    var icon = {
        url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg)
    };
    // マーカーの新規出力
    newMarker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: icon
    });


    newInfoWindow = new google.maps.InfoWindow({
    	content: '<div class="sample">現在地</div>'
    });
    
    newMarker.addListener('mouseover', function(){
    	newInfoWindow.open(map,newMarker);
    });
    newMarker.addListener('mouseout', function(){
    	newInfoWindow.close()
    });
  };
  function error() {
    //エラーの場合
    output.innerHTML = "座標位置を取得できません";
  };
  navigator.geolocation.getCurrentPosition(success, error);//成功と失敗を判断
}


// マーカーをリセットするメソッド
function deleteMarkers(){
		for (var i = 0; i < marker.length; i++) {
			marker[i].setMap(null);
		}
}



$(function() {
  //セレクトボックスが切り替わったら発動
  $('select').change(function() {
  	// console.log("test");
    //選択したvalue値を変数に格納
    var val = $(this).val();
    if(val === "tokyo"){
    	if (marker.length > 0) {
    		deleteMarkers();
    	}
        var minValue = Math.min.apply(null, tokyoMarkerData)
            console.log("最小値は"+minValue);
    	for (var i = 0; i < tokyoMarkerData.length; i++) {
	        markerLatLng = new google.maps.LatLng({lat: tokyoMarkerData[i]['lat'], lng: tokyoMarkerData[i]['lng']}); // 緯度経度のデータ作成
            console.log("マーカーセレクト"+markerLatLng);
            
            // 現在地と東京マーカーの距離算出
            var distance = google.maps.geometry.spherical.computeDistanceBetween(markerLatLng, latlng);
            $('#output').html("現在地と"+tokyoMarkerData[i]['name']+"の距離は"+ distance + "です");

            // for (var d = 0; d < distance; d++) {
            //      tmp_result = distance
            //      if(  tmp_result < result  || tmp_result = 0){
            //          result = tmp_result
            //      }
            // }

            console.log("現在値と"+tokyoMarkerData[i]['name']+"の距離は"+ distance);
	        

            marker[i] = new google.maps.Marker({ // マーカーの追加
	         position: markerLatLng, // マーカーを立てる位置を指定
	            map: map // マーカーを立てる地図を指定
	        });
	        // MarkerArray.push(marker);
	 
	     infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
	         content: '<div class="sample">' + tokyoMarkerData[i]['name'] + '</div>' // 吹き出しに表示する内容
	       });
	     console.log(marker[i]);
	     markerEvent(i); // マーカーにクリックイベントを追加
	    }

	// マーカーにクリックイベントを追加
		function markerEvent(i) {
		    marker[i].addListener('mouseover', function() { // マーカーに触れた時
		      infoWindow[i].open(map, marker[i]); // 吹き出しの表示
		  	});
		    marker[i].addListener('mouseout', function() { // マーカーから離れた時
		      infoWindow[i].close();
		  	});
		}
    }else if(val == "saitama"){
    	if (marker.length > 0) {
    		deleteMarkers();
    	}
    	for (var s = 0; s < saitamaMarkerData.length; s++) {
	        markerLatLng = new google.maps.LatLng({lat: saitamaMarkerData[s]['lat'], lng: saitamaMarkerData[s]['lng']}); // 緯度経度のデータ作成
	        marker[s] = new google.maps.Marker({ // マーカーの追加
	         position: markerLatLng, // マーカーを立てる位置を指定
	            map: map // マーカーを立てる地図を指定
	        });
	 
	        infoWindow[s] = new google.maps.InfoWindow({ // 吹き出しの追加
	          content: '<div class="sample">' + saitamaMarkerData[s]['name'] + '</div>' // 吹き出しに表示する内容
	        });
	 
	         markerEvent(s); // マーカーにクリックイベントを追加
	    }

	    function markerEvent(s) {
		    marker[s].addListener('mouseover', function() { // マーカーに触れた時
		      infoWindow[s].open(map, marker[s]); // 吹き出しの表示
		  	});
		    marker[s].addListener('mouseout', function() { // マーカーから離れた時
		      infoWindow[s].close();
		  	});
		}
	}else if(val == "kanagawa"){
    		if (marker.length > 0) {
	    		deleteMarkers();
    		}
        	for (var k = 0; k < kanagawaMarkerData.length; k++) {
    	        markerLatLng = new google.maps.LatLng({lat: kanagawaMarkerData[k]['lat'], lng: kanagawaMarkerData[k]['lng']}); // 緯度経度のデータ作成
    	        marker[k] = new google.maps.Marker({ // マーカーの追加
    	           position: markerLatLng, // マーカーを立てる位置を指定
    	           map: map // マーカーを立てる地図を指定
	            });

    	        infoWindow[k] = new google.maps.InfoWindow({ // 吹き出しの追加
    	           content: '<div class="sample">' + kanagawaMarkerData[k]['name'] + '</div>' // 吹き出しに表示する内容
    	        });
	 
	           markerEvent(k); // マーカーにクリックイベントを追加
	        }
        // マーカーに触れた時及び触れた後マーカーから離れた時の動きを出すメソッド
	    function markerEvent(k) {
		    marker[k].addListener('mouseover', function() { // マーカーに触れた時
		      infoWindow[k].open(map, marker[k]); // 吹き出しの表示
		  	});
		    marker[k].addListener('mouseout', function() { // マーカーから離れた時
		      infoWindow[k].close();
		  	});
		}
    }else if (val == "no") {
    	if (marker.length > 0) {
	    		deleteMarkers();
    	}
    }
  });
});



// ハンバーガーメニュー用js
$(function(){
	$(document).on('click', '.menu-trigger', function(){
		$(this).toggleClass('active');
		$('#sp-menu').fadeToggle();
		return false;
	});
});

// function standAreaMarker () {
//     if (marker.length > 0) {
//         deleteMarkers();
//     }
//     for (var k = 0; k < kanagawaMarkerData.length; k++) {
//         markerLatLng = new google.maps.LatLng({lat: kanagawaMarkerData[k]['lat'], lng: kanagawaMarkerData[k]['lng']}); // 緯度経度のデータ作成
//         marker[k] = new google.maps.Marker({ // マーカーの追加
//         position: markerLatLng, // マーカーを立てる位置を指定
//         map: map // マーカーを立てる地図を指定
//     });

//     infoWindow[k] = new google.maps.InfoWindow({ // 吹き出しの追加
//        content: '<div class="sample">' + kanagawaMarkerData[k]['name'] + '</div>' // 吹き出しに表示する内容
//     });

// }







