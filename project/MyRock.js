import { CGFobject } from '../lib/CGF.js';

export class MyRock extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - Number of slices around Y axis
     * @param  {integer} stacks - Number of stacks along Y axis, from the center to the poles (half of sphere)
     * @param  {float} minRadius - Minimum radius of the object
     * @param  {float} maxRadius - Maximum radius of the object
     */
    constructor(scene, slices, stacks, minRadius, maxRadius) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;
        this.minRadius = minRadius;
        this.deltaRadius = maxRadius - minRadius;
        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the rocks buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = Math.PI / this.latDivs;
        var thetaInc = (2 * Math.PI) / this.longDivs;
        var latVertices = this.longDivs + 1;

        // build an all-around stack at a time, starting on "north pole" and proceeding "south"
        for (let latitude = 0; latitude <= this.latDivs; latitude++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            // in each stack, build all the slices around, starting on longitude 0
            theta = 0;
            // The scale on longitude == 0 must be the same as on longitude == this.longDivs
            let longitude_0_scale = Math.random() * this.deltaRadius + this.minRadius;
            for (let longitude = 0; longitude <= this.longDivs; longitude++) {
                //--- Vertices coordinates
                //--- Note
                // at each vertex, the direction of the normal is equal to 
                // the vector from the center of the sphere to the vertex.
                // this means that changing the vertices in the direction of
                // the norm corresponds to scaling them
                let scale;
                if (longitude == 0 || longitude == this.longDivs) {
                    scale = longitude_0_scale;
                } else {
                    scale = Math.random() * this.deltaRadius + this.minRadius;
                }
                
                var x = scale * Math.cos(theta) * sinPhi;
                var y = scale * cosPhi;
                var z = scale * Math.sin(-theta) * sinPhi;
                this.vertices.push(x, y, z);
                
                //--- Texture Coordinates
                this.texCoords.push(theta/(2*Math.PI), phi/Math.PI);

                //--- Indices
                if (latitude < this.latDivs && longitude < this.longDivs) {
                    var current = latitude * latVertices + longitude;
                    var next = current + latVertices;
                    // pushing two triangles using indices from this round (current, current+1)
                    // and the ones directly south (next, next+1)
                    // (i.e. one full round of slices ahead)

                    this.indices.push(current + 1, current, next);
                    this.indices.push(current + 1, next, next + 1);
                }

                //--- Normals
                // at each vertex, the direction of the normal is equal to 
                // the vector from the center of the sphere to the vertex.
                // in a sphere of radius equal to one, the vector length is one.
                // therefore, the value of the normal is equal to the position vectro
                this.normals.push(x, y, z);
                theta += thetaInc;
            }
            phi += phiInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        
    }
}
