import Sprite from './sprite';

export default class Bullet extends Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
  }
}