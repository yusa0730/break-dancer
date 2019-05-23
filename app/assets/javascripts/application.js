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

var result_name;
var result;
var map;
var latlng = 0;
var markerLatLng = 0;
var newInfoWindow;
var marker = [];
var val;
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
   }, {
          name: '青山学院大学４号館',
          lat: 35.660604,
          lng: 139.710093
   }, {
          name: '中野ゼロ',
          lat: 35.704530,
          lng: 139.671754
   }, {
          name: 'デザインストア目白',
          lat: 35.720598,
          lng: 139.706751
   }, {
          name: 'デザインストア目白',
          lat: 35.720598,
          lng: 139.706751
   }, {
          name: '池袋サンシャイン前',
          lat: 35.728403,
          lng: 139.718411
   }, {
          name: '東京芸術劇場前',
          lat: 35.729877,
          lng: 139.708355
   }
];


var saitamaMarkerData = [
	{
        name: '浦和駅（浦和駅西口地下道）',
        lat: 35.859037,
        lng: 139.657145
  }, {
        name: '大宮ソニック',
        lat: 35.905429,
        lng: 139.619449
  }, {
        name: 'さいたま市浦和駒場体育館',
        lat: 35.872477,
        lng: 139.662192
  }
];

var kanagawaMarkerData = [
	{
        name: '溝の口駅',
        lat: 35.599905,
        lng: 139.610459
  }, {
        name: '新百合ヶ丘　OPA一階',
        lat: 35.603833,
        lng: 139.507770
  }, {
        name: 'ルミネ横浜１階外',
        lat: 35.465401,
        lng: 139.623105
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

    if(markerLatLng != 0){
        if(val === "tokyo"){
            for (var z = 0; z < tokyoMarkerData.length; z++) {
                markerLatLng = new google.maps.LatLng({lat: tokyoMarkerData[z]['lat'], lng: tokyoMarkerData[z]['lng']});
                     var tmp_distance = google.maps.geometry.spherical.computeDistanceBetween(markerLatLng, latlng);
                     var distance = Math.round(tmp_distance/1000)
                     tmp_result = distance

                     // 現在地と東京マーカーの最短距離算出。右のi==0は1回目distanceの時。
                      if(  tmp_result < result  || z == 0){
                          result = tmp_result
                          result_name = tokyoMarkerData[z]['name']
                      }
            }
        }else if (val === "saitama") {
            for (var ss = 0; ss < saitamaMarkerData.length; ss++) {
                markerLatLng = new google.maps.LatLng({lat: saitamaMarkerData[ss]['lat'], lng: saitamaMarkerData[ss]['lng']});
                     var tmp_distance = google.maps.geometry.spherical.computeDistanceBetween(markerLatLng, latlng);
                     var distance = Math.round(tmp_distance/1000)
                     tmp_result = distance
                     // 現在地と東京マーカーの最短距離算出。右のi==0は1回目distanceの時。
                     if(  tmp_result < result  || ss == 0){
                          result = tmp_result
                          result_name = saitamaMarkerData[ss]['name']
                     }
            }

        }else if (val === "kanagawa") {
            for (var kk = 0; kk < kanagawaMarkerData.length; kk++) {
                markerLatLng = new google.maps.LatLng({lat: kanagawaMarkerData[kk]['lat'], lng: kanagawaMarkerData[kk]['lng']});
                     var tmp_distance = google.maps.geometry.spherical.computeDistanceBetween(markerLatLng, latlng);
                     var distance = Math.round(tmp_distance/1000)
                     tmp_result = distance
                     // 現在地と東京マーカーの最短距離算出。右のi==0は1回目distanceの時。
                     if(  tmp_result < result  || kk == 0){
                         result = tmp_result
                         result_name = kanagawaMarkerData[kk]['name']
                     }
            }
        }
            if(markerLatLng != 0){
                // 現在地から最寄りマーカーの距離を表示
                $('#output').fadeIn();
                $('#output').html("現在地から一番近いのは"+ result_name +"です。<br>"+"現在地から"+ result_name +"への距離は"+ result + "kmです。");
            }
    }


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
    	newInfoWindow.open(map,newMarker);});
    newMarker.addListener('mouseout', function(){
    	newInfoWindow.close(); });
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


//セレクトボックス切り替え
$(function() {
  //セレクトボックスが切り替わったら発動
  $('select').change(function() {
  	// console.log("test");
    //選択したvalue値を変数に格納
    val = $(this).val();
    if(val === "tokyo"){
    	if (marker.length > 0) {
    		deleteMarkers();
    	}

    	for (var i = 0; i < tokyoMarkerData.length; i++) {


	        markerLatLng = new google.maps.LatLng({lat: tokyoMarkerData[i]['lat'], lng: tokyoMarkerData[i]['lng']}); // 緯度経度のデータ作成

            // 現在地と東京マーカーの距離算出
            if(latlng != 0){
                var tmp_distance = google.maps.geometry.spherical.computeDistanceBetween(markerLatLng, latlng);
                var distance = Math.round(tmp_distance/1000)

                tmp_result = distance

            // 現在地と東京マーカーの最短距離算出。右のi==0は1回目distanceの時。
                if(  tmp_result < result  || i == 0){
                    result = tmp_result
                    result_name = tokyoMarkerData[i]['name']
                }
            }

            marker[i] = new google.maps.Marker({ // マーカーの追加
  	         position: markerLatLng, // マーカーを立てる位置を指定
  	            map: map // マーカーを立てる地図を指定
	          });

    	      infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
    	         content: '<div class="sample">' + tokyoMarkerData[i]['name'] + '</div>' // 吹き出しに表示する内容
    	      });
    	      markerEvent(i); // マーカーにクリックイベントを追加
	    }

      if(latlng != 0){
          // 現在地から最寄りマーカーの距離を表示
          $('#output').fadeIn();
          $('#output').html("現在地から一番近いのは"+ result_name +"です。<br>"+"現在地から"+ result_name +"への距離は"+ result + "kmです。");
      }
	    // マーカーにクリックイベントを追加
  		function markerEvent(i) {
  		    marker[i].addListener('mouseover', function() { // マーカーに触れた時
  		      infoWindow[i].open(map, marker[i]);});// 吹き出しの表示
  		    marker[i].addListener('mouseout', function() { // マーカーから離れた時
  		      infoWindow[i].close();});
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

          if(latlng != 0){
              var tmp_distance = google.maps.geometry.spherical.computeDistanceBetween(markerLatLng, latlng);
              var distance = Math.round(tmp_distance/1000)
              tmp_result = distance
              // 現在地と東京マーカーの最短距離算出。右のi==0は1回目distanceの時。
              if(  tmp_result < result  || s == 0){
                    result = tmp_result
                    result_name = saitamaMarkerData[s]['name']
              }
	        }

          if(latlng != 0){
              // 現在地から最寄りマーカーの距離を表示
              $('#output').fadeIn();
              $('#output').html("現在地から一番近いのは"+ result_name +"です。<br>"+"現在地から"+ result_name +"への距離は"+ result + "kmです。");
          }

	        infoWindow[s] = new google.maps.InfoWindow({ // 吹き出しの追加
	            content: '<div class="sample">' + saitamaMarkerData[s]['name'] + '</div>' // 吹き出しに表示する内容
	        });
	        markerEvent(s); // マーカーにクリックイベントを追加
	    }

	    function markerEvent(s) {
		    marker[s].addListener('mouseover', function() { // マーカーに触れた時
		      infoWindow[s].open(map, marker[s]);}); // 吹き出しの表示
		    marker[s].addListener('mouseout', function() { // マーカーから離れた時
		      infoWindow[s].close();});
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

              if(latlng != 0){
                  var tmp_distance = google.maps.geometry.spherical.computeDistanceBetween(markerLatLng, latlng);
                  var distance = Math.round(tmp_distance/1000)
                  tmp_result = distance

                // 現在地と東京マーカーの最短距離算出。右のi==0は1回目distanceの時。
                if(  tmp_result < result  || k == 0){
                    result = tmp_result
                    result_name = kanagawaMarkerData[k]['name']
                }
              }
              if(latlng != 0){
                // 現在地から最寄りマーカーの距離を表示
                $('#output').fadeIn();
                $('#output').html("現在地から一番近いのは"+ result_name +"です。<br>"+"現在地から"+ result_name +"への距離は"+ result + "kmです。");
              }

    	        infoWindow[k] = new google.maps.InfoWindow({ // 吹き出しの追加
    	           content: '<div class="sample">' + kanagawaMarkerData[k]['name'] + '</div>' // 吹き出しに表示する内容
    	        });
	           markerEvent(k); // マーカーにクリックイベントを追加
	        }
          // マーカーに触れた時及び触れた後マーカーから離れた時の動きを出すメソッド
	        function markerEvent(k) {
		          marker[k].addListener('mouseover', function() { // マーカーに触れた時
		          infoWindow[k].open(map, marker[k]); });// 吹き出しの表示
		          marker[k].addListener('mouseout', function() { // マーカーから離れた時
		          infoWindow[k].close();});
		      }
    }else if (val == "no") {
        $('#output').fadeOut();
        markerLatLng = 0
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








