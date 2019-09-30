class BiteFish extends Fish {

  constructor(options) {
    super(options);
    this.imageUri = '/images/fish02.gif';
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }

    const near = this.tank.getProximateDenizens(this.position, 20);

    for (const fish in near) {
      if (near[fish].id !== this.id && !near[fish].isStarter) {
        this.tank.removeDenizen(near[fish].id, 0);
      }
    }
  }
}
