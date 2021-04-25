module.exports.toGeojson = function (data){

    let parsedData = data.map(el => {
        return {
            type: 'Feature',
            properties:{
                formattedAdderss:el.location.coordinates,
                name:el.restaurantName,
                phone: el.restaurantPhone,
                kitchen: el.kitchen
            },
            geometry: {
                type: 'Point',
                coordinates: el.location.coordinates
            }
        }
    });

    return {
        type: 'FeatureCollection',
        features: parsedData
    };
}
