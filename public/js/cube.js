//convert degrees to string.
function toDegString(axis, degrees) {
    return 'rotate' + axis + '(' + (degrees) + 'deg) ';
};

class Cube {
    constructor(cube) {
        this.rateOfChange = 7;
        //Cube model
        this.cubeModel = {
            X: 0,
            Y: 0
        };
        //axises model
        this.axises = {
            x: 'X',
            y: "Y"
        };

        this.running = false;

        this.cube = cube;

        this.animationLoop();
    };

    increaseAxis(axis) {
        this.cubeModel[axis] += this.rateOfChange;
    };

    stop() {
        this.running = false;
    }

    animationLoop() {
        requestAnimationFrame(() => {
            //Update the cube
            this.cube.style['transform'] = toDegString(this.axises.x, this.cubeModel.X) +
                toDegString(this.axises.y, this.cubeModel.Y);
            //keep the loop alive.
            this.animationLoop();
        });
    };

    decreaseAxis(axis) {
        this.cubeModel[axis] -= this.rateOfChange;
    };

    animateTheCube() {
        this.running = true;
        requestAnimationFrame(() => {
            this.increaseAxis(this.axises.x);
            this.increaseAxis(this.axises.y);
            setTimeout(() => {
                if (this.running) {
                    this.animateTheCube();
                }
            }, 300);
        });
    };

};
