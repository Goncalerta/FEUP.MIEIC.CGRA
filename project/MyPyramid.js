import {CGFobject} from '../lib/CGF.js';

export class MyPyramid extends CGFobject {
    /**
     * MyPyramid
     * @constructor
     * @param  {CGFscene} scene - Reference to MyScene object
     * @param  {integer} slices - Number of divisions around the Y axis
     * @param  {integer} stacks - Number of divisions along the Y axis
     */
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,1,0);
            for (var j = 0; j < this.stacks; j++) {
                let height = j/this.stacks;
                this.vertices.push(ca*(1-height), height, -sa*(1-height));
                this.vertices.push(caa*(1-height), height, -saa*(1-height));
            }

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            for (let j = 0; j < this.stacks; j++) {
                this.normals.push(...normal);
                this.normals.push(...normal);
            }

            let verticesPerStack = (1+2*this.stacks);
            
            for (let j = 0; j < this.stacks-1; j++) {
                let stackVertices = verticesPerStack*i + 2*j;
                this.indices.push(stackVertices + 3, stackVertices + 1, stackVertices + 4);
                this.indices.push(stackVertices + 4, stackVertices + 1, stackVertices + 2);
            }
            let stackVertices = verticesPerStack*i + 2*(this.stacks-1);
            this.indices.push(verticesPerStack*i, stackVertices + 1, stackVertices + 2);

            ang+=alphaAng;
            
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        // Transformations so that MyPyramid complies with the 
        // restrictions imposed by MyMovingObject.
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0);
        super.display();
        this.scene.popMatrix();
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12
        this.stacks = 3 + Math.round(9 * complexity); //complexity varies 0-1, so stacks varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
