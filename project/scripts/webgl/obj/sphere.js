Sphere.prototype = new WorldObject;
function Sphere(parent, radius, type) {
    this.base = WorldObject;
    this.base(parent);
    this.radius = radius;
    this.objectType = type;
    this.initBuffers();
}

Sphere.prototype.initBuffers = function () {
    vertices = [];
    var textureCoords = [];
    var nbVertice = 0;
    var sphereVertexIndices = [];
    var normal = [];
    var nbTriangles = 0;
    var resLat = 0;
    var dir =1;
    var resLongi = tetaMax / pasLong + 1;
    for (var lat = -90; lat <= phiMax; lat += pasLat) {

        for (var longi = 0; longi <= tetaMax; longi += pasLong) {
            var vertices = vertices.concat(pol2Cart(longi, lat, this.radius)); //A
            if(this.objectType === 'sun'){
                dir = -1;
            }
            normal = normal.concat(pol2Cart(longi, lat, dir));
            textureCoords = textureCoords.concat([longi / tetaMax, (90 + lat) / (90 + phiMax)]);
            if (longi != tetaMax) {
                if (lat < phiMax) {
                    sphereVertexIndices = sphereVertexIndices.concat([
                        nbVertice,
                        nbVertice + 1,
                        nbVertice + 1 + resLongi,

                        nbVertice,
                        nbVertice + 1 + resLongi,
                        nbVertice + resLongi
                    ]);

                    nbTriangles += 2;
                }
            }
            nbVertice += 1;
        }
        resLat++;
    }

    this.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.vertexPositionBuffer.itemSize = 3;
    this.vertexPositionBuffer.numItems = nbVertice;

    this.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereVertexIndices), gl.STATIC_DRAW);
    this.vertexIndexBuffer.itemSize = 1;
    this.vertexIndexBuffer.numItems = nbTriangles * 3;

    this.vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    this.vertexTextureCoordBuffer.itemSize = 2;
    this.vertexTextureCoordBuffer.numItems = nbVertice;

    this.sphereVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sphereVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);
    this.sphereVertexNormalBuffer.itemSize = 3;
    this.sphereVertexNormalBuffer.numItems = normal.length / 3;
};

Sphere.prototype.initObject = function(objParam){
    this.name = objParam.name;
    this.imgTexture = objParam.texture;
    this.translate(objParam.translate);
    this.orbitParam=objParam.orbit;
    this.revolutionParam=objParam.revolution;
    this.positionXYZ = objParam.translate;
};