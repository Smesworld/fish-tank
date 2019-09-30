class GoFish extends Fish {

  constructor(options) {
    super(options);
    this.surgeSecondsLeft = 0;
    this.maxSurge = 1.0;
    this.surgMult = 3.0;
    this.imageUri = '/images/dolphin.png';
    this.isTasty = false;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S * (1 + this.surgeSecondsLeft * this.surgMult));
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    this.surgeSecondsLeft = Math.max(0, this.surgeSecondsLeft - PHYSICS_TICK_SIZE_S);

    const near = this.tank.getProximateDenizens(this.position, 30);

    for (const fish of near) {
      if (fish.id !== this.id && !fish.isStarter && fish.isTasty) {
        this.tank.removeDenizen(fish.id, 0);
      }
    }


  }


  onClick(event) {
    this.surgeSecondsLeft = this.maxSurge;
  }
}
