//add radius to change sphere size

function degToRad(degrees)
{
    return degrees * Math.PI / 180;
}

function radToDeg(radians){
    return radians * 180 / Math.PI;
}

function pol2Cart(longi, lat, radius)
{
    return [
        Math.cos(degToRad(lat))*Math.sin(degToRad(longi))*radius,
        Math.sin(degToRad(lat))*radius,
        Math.cos(degToRad(lat))*Math.cos(degToRad(longi))*radius
    ];
}