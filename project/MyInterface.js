import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        // Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        // Dropdown for textures
        this.gui.add(this.scene, 'selectedCubeMap', this.scene.cubeMapIds).name('Selected CubeMap').onChange(this.scene.updateCubeMap.bind(this.scene));

        // Slider for moving object scaleFactor
        this.gui.add(this.scene, 'movingObjectScaleFactor', 0.5, 3, 0.1).name('scaleFactor').onChange(this.scene.updateMovingObject.bind(this.scene));
        
        // Slider for moving object speedFactor
        this.gui.add(this.scene, 'speedFactor', 0.1, 3, 0.1).name('speedFactor');
        
        this.initKeys();
        return true;
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        if (this.activeKeys[keyCode] === true && (keyCode == "keyL" || keyCode == "keyP")) {
            this.activeKeys[keyCode] = false;
            return true;
        }

        return this.activeKeys[keyCode] || false;
    }
}
