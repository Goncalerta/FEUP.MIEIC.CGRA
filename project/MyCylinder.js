import {CGFobject} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    /**
     * MyCylinder
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param  {integer} slices - Number of divisions around the Y axis
     * @param  {integer} textureHeight - Height of the texture
     */
    constructor(scene, slices, textureHeight=1) {
        super(scene);
        this.slices = slices;
        this.textureHeight = textureHeight;
        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the cylinder buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));

            var i2 = i*2;
            this.indices.push(i2, i2 + 2, i2 + 1);
            this.indices.push(i2 + 1, i2 + 2, i2 + 3);
            
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            
            this.texCoords.push(i/this.slices, this.textureHeight);
            this.texCoords.push(i/this.slices, 0);
            
            ang += alphaAng;
        }
        // Add final vertices, which are in the same position of the first two
        this.vertices.push(1, 0, 0);
        this.vertices.push(1, 1, 0);
        this.normals.push(1, 0, 0);
        this.normals.push(1, 0, 0);
        this.texCoords.push(1, this.textureHeight);
        this.texCoords.push(1, 0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * Changes object's complexity.
     * @param {integer} complexity - changes number of slices.
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); // Complexity varies 0-1, so slices varies 3-12

        // Reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
