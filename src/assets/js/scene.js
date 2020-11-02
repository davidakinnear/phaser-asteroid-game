import { Scene } from 'phaser';
import Ship from './ship';
import Keyboard from './keyboard';
import Bullet from './bullet';

export default class AsteroidScene extends Scene {

  /**
   * Use this function to load images which can be used in sprites
   */
  preload() {
    // loads images which can be used in sprites
    this.load.image('space', 'assets/media/images/deep-space.jpg');
    this.load.image('bullet', 'assets/media/images/bullets.png');
    this.load.image('ship', 'assets/media/images/ship.png');
  }

  /**
   * Create game objects and stuff here
   */
  create() {
    this.add.tileSprite(0, 0, 1600, 1200, 'space');
    this.shipSpeedLabel = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
    this.ship = new Ship(this, 400, 300);
    this.keyboard = new Keyboard(this);
    this.ship.setDrag(true,0.8);
    this.ship.setMaxVelocity(500);
    this.bullets = [];
    
  }

  /**
   * This is where all the game logic goes. This is similar to the
   * autonomousPeriodic and teleopPeriodic functions in robot code
   */
  update(time, delta) {

    //console.log('is down pressed:', this.keyboard.isDownPressed());
    //console.log('is Space pressed:', this.keyboard.isSpacePressed());

    if(this.keyboard.isUpPressed()){
        this.ship.setForwardAcceleration(150);
        //console.log('accel forward');
    }else if(this.keyboard.isDownPressed()){
        this.ship.setForwardAcceleration(-150);
        //console.log('accel backward');
    }else{
        this.ship.setForwardAcceleration(0);
        //console.log('no accel');
    }
    if(this.keyboard.isRightPressed()){
        this.ship.setAngularVelocity(100);
    }else if(this.keyboard.isLeftPressed()){
        this.ship.setAngularVelocity(-100);
    } else {
        this.ship.setAngularVelocity(0);
    }
    if(this.keyboard.isSpacePressed()){
     let bullet = new Bullet(this,this.ship.getX(),this.ship.getY(),
     'bullet');
     bullet.setRotation(this.ship.getRotation());
     bullet.setForwardVelocity(250);
     this.bullets.push({
         bullet:bullet,
         time:time
     });
    }
    this.bullets.forEach(element => {
        if(time - element.time >1500){
            element.bullet.destroy();
            
        }
        
    });
    this.bullets = this.bullets.filter(element => {
        return !element.bullet.isDestroyed();
    });
    
    this.ship.wrap();
    console.log('bullets length: ', this.bullets.length);
  }

}
