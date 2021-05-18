import {CGFinterface, dat} from '../lib/CGF.js';

export class MyInterface extends CGFinterface {
    /**
     * MyInterface
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @method init
     * Initializes the interface.
     * @param {CGFapplication} application - Application.
     */
    init(application) {
        // Call CGFinterface init
        super.init(application);
        // Init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

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

    /**
     * @method initKeys
     * Initializes the keys.
     */
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }

    /**
     * @method processKeyDown
     * Processes the event key down pressed.
     * @param event - Event.
     */
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    /**
     * @method processKeyUp
     * Processes the event key up pressed.
     * @param event - Event.
     */
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    /**
     * @method isKeyPressed
     * Updates array of active keys according to the one pressed.
     * @param {String} keyCode - Code of the key pressed.
     */
    isKeyPressed(keyCode) {
        if (this.activeKeys[keyCode] === true && (keyCode == "keyL" || keyCode == "keyP")) {
            this.activeKeys[keyCode] = false;
            return true;
        }

        return this.activeKeys[keyCode] || false;
    }
}
