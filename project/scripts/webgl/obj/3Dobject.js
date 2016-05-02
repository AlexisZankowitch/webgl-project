//INITWORLD
function WorldObject(parent) {
    this.localTransformation = mat4.create();
    this.orbitTransformation = mat4.create();
    this.revolutionTransformation = mat4.create();
    this.children = [];
    this.vertexPositionBuffer = null;
    this.vertexTextureCoordBuffer = null;
    this.sphereVertexNormalBuffer = null;
    this.vertexIndexBuffer = null;
    this.toggled = true;
    this.revolutionParam = 0;
    this.objectType = "";
    this.positionXYZ = [];
    this.orbitParam = 0;
    // il faudra sans doute ajouter des choses ici pour gérer les nomales
    this.texture = null;
    mat4.identity(this.orbitTransformation);
    mat4.identity(this.localTransformation);
    mat4.identity(this.revolutionTransformation);
    if (parent != null) parent.addChild(this);
}

WorldObject.prototype.addChild = function (child) {
    this.children.push(child);
};

WorldObject.prototype.translate = function (translation) {
    mat4.translate(this.localTransformation, translation);
};

WorldObject.prototype.rotate = function (matrix,rotation, axis) {
    mat4.rotate(matrix, rotation, axis);
};

WorldObject.prototype.scale = function (scale) {
    mat4.scale(this.localTransformation, scale);
};

WorldObject.prototype.draw = function () {
    if (this.toggled) {
        if (this.texture != null) {
            //gl.activeTexture(this.texture.getbind()); todo issue
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgram.samplerUniform, this.texture.bindNumber);
        }

        mvPushMatrix();
        mat4.multiply(mvMatrix, this.orbitTransformation);
        mat4.multiply(mvMatrix, this.localTransformation);

        mvPushMatrix();
        mat4.multiply(mvMatrix, this.revolutionTransformation);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        //lighting
        gl.bindBuffer(gl.ARRAY_BUFFER, this.sphereVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.sphereVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        if(this.objectType === objectType.spheres[1]){
            var lighting = true;
            gl.uniform1i(shaderProgram.useLightingUniform, lighting);
            if (lighting) {
                //directional lightning
                //gl.uniform3f(shaderProgram.ambientColorUniform,0.2,0.2,0.2);

                gl.uniform3f(shaderProgram.pointLightingLocationUniform,
                    mvMatrix[12],
                    mvMatrix[13],
                    mvMatrix[14]);

                gl.uniform3f(shaderProgram.pointLightingColorUniform,1,1,1);
            }
        }

        setMatrixUniforms();
        if (this.vertexIndexBuffer == null) {
            gl.drawArrays(drawStyle, 0, this.vertexPositionBuffer.numItems);
        }
        else {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
            gl.drawElements(drawStyle, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }

        //eviter que la revolution des enfants soit influencé par la mienne
        mvPopMatrix();

        //draws children
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw();
        }
        mvPopMatrix();
    }
};

WorldObject.prototype.animate = function (elapsedTime) {
    //animate children
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].animate(elapsedTime);
    }
    this.rotate(this.orbitTransformation, this.orbitParam * 0.001 * elapsedTime, [0, 1, 0]); // cette ligne est surement discutable comme animation par défaut!
    this.rotate(this.revolutionTransformation, this.revolutionParam * 0.001 * elapsedTime, [0, 1, 0]);
};