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




var map;
var newInfoWindow;
var marker = [];
var infoWindow = [];
var markerData = [ // マーカーを立てる場所名・緯度・経度
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
        name: '溝の口駅',
        lat: 35.599905,
        lng: 139.610459
 }, {
        name: '中野ゼロホール',
        lat: 35.704507,
        lng: 139.671707
 }, {
        name: '浦和駅（浦和駅西口地下道）',
        lat: 35.859037,
        lng: 139.657145
 }
];

function initMap(){
		var mapLatLng = new google.maps.LatLng({lat: markerData[0]['lat'], lng: markerData[0]['lng']}); // 緯度経度のデータ作成
		map = new google.maps.Map(document.getElementById('sample'),{
			center: mapLatLng,
			zoom: 10
		});

		// マーカー毎の処理
	 for (var i = 0; i < markerData.length; i++) {
	        markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
	        marker[i] = new google.maps.Marker({ // マーカーの追加
	         position: markerLatLng, // マーカーを立てる位置を指定
	            map: map // マーカーを立てる地図を指定
	       });
	 
	     infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
	         content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
	       });
	 
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
}

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
    var latlng = new google.maps.LatLng( latitude , longitude ) ;
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









$(function(){

	$('.menu-trigger').on('click', function(){
		$(this).toggleClass('active');
		$('#sp-menu').fadeToggle();
		return false;
	});
});







