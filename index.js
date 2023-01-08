var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],

    target: 'map',
    view: new ol.View({
        center: [0, 0],
        zoom: 2
    })
});

// Define source
var citiesSource = new ol.source.Vector()
// Define layer
var citiesLayer = new ol.layer.Vector({
    source: citiesSource
    // style: new ol.style.Style({
    //     fill: new ol.style.Fill({
    //         color: "red"
    //     })
    // })
})
map.addLayer(citiesLayer);


$.ajax({
    url: 'cities.php',
    type: 'GET',
    success: function (dataResult) {
        var result = JSON.parse(dataResult);
        // console.log(result);
        result.forEach(element => {
            var city = (new ol.format.GeoJSON()).readFeature(JSON.parse(element['geom']))
            city.setProperties({ 'name': element['name'] })
            citiesSource.addFeature(city)
        })
    }
})


function featinfo(evt) {
    var clickedFeature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature
        })
    if (clickedFeature) {
        document.getElementById('nameoffeature').innerText = clickedFeature.get('name')
        $('#featureinfo').modal('show')
    }
}

var coordOfClickedLoc

function addFeatures(evt) {
    coordOfClickedLoc = evt.target.getCoordinateFromPixel(evt.pixel)
    console.log(coordOfClickedLoc)
    $('#addfeature').modal('show')
    map.on('click', featinfo)
    map.un('click', addFeatures)
}


// Getting information about a clicked feature
map.on('click', featinfo)


function addFeat() {
    map.un('click', featinfo)
    map.on('click', addFeatures)
}


function saveData() {
    var cityName = document.getElementById('cityname').value
    if (cityName == "") {
        alert("Please enter city name")
    } else {
        $.ajax({
            url: 'save_city.php',
            type: 'POST',
            data: {
                name: cityName,
                long: coordOfClickedLoc[0],
                lat: coordOfClickedLoc[1]
            },
            success: function (dataResult) {
                var result = JSON.parse(dataResult)
                if (result.statusCode == 200) {
                    console.log('Location added to database successfully')
                } else {
                    console.log('There is an error with the code!')
                }
            }
        })
    }
}