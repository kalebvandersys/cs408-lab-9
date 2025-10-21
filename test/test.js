import { Shape, Ball, EvilCircle } from '../js/main.js';

QUnit.module('Shape', function() {
    QUnit.test('constructor sets x, y, velX, velY', function(assert) {
        const shape = new Shape(10, 20, 5, 7);
        assert.equal(shape.x, 10, 'x is set correctly');
        assert.equal(shape.y, 20, 'y is set correctly');
        assert.equal(shape.velX, 5, 'velX is set correctly');
        assert.equal(shape.velY, 7, 'velY is set correctly');
    });
});

QUnit.module('Ball', function() {

    QUnit.test('constructor sets properties correctly', function(assert) {
        const ball = new Ball(10, 15, 2, 3, 'red', 12);
        // inherited
        assert.equal(ball.x, 10, 'x inherited correctly');
        assert.equal(ball.y, 15, 'y inherited correctly');
        assert.equal(ball.velX, 2, 'velX inherited correctly');
        assert.equal(ball.velY, 3, 'velY inherited correctly');
        // new
        assert.equal(ball.color, 'red', 'color set correctly');
        assert.equal(ball.size, 12, 'size set correctly');
        assert.ok(ball.exists, 'exists initialized as true');
    });

    QUnit.test('collisionDetect changes color on collision', function(assert) {
        // create two balls close enough to collide
        const ball1 = new Ball(50, 50, 0, 0, 'red', 10);
        const ball2 = new Ball(55, 50, 0, 0, 'blue', 10);
        balls.push(ball1, ball2);

        ball1.collisionDetect();

        assert.notEqual(ball1.color, 'red', 'ball1 color changed');
        assert.notEqual(ball2.color, 'blue', 'ball2 color changed');

        // clean up
        balls.pop();
        balls.pop();
    });

    QUnit.test('collisionDetect skips non-existing balls', function(assert) {
        const ball1 = new Ball(50, 50, 0, 0, 'red', 10);
        const ball2 = new Ball(50, 50, 0, 0, 'blue', 10);
        ball2.exists = false; // simulate eaten
        balls.push(ball1, ball2);

        ball1.collisionDetect();

        assert.equal(ball1.color, 'red', 'ball1 color did not change');
        balls.pop();
        balls.pop();
    });

});

QUnit.module('EvilCircle', function() {

    QUnit.test('constructor sets properties correctly', function(assert) {
        const evil = new EvilCircle(30, 40);
        assert.equal(evil.x, 30, 'x inherited correctly');
        assert.equal(evil.y, 40, 'y inherited correctly');
        assert.equal(evil.velX, 20, 'velX inherited correctly');
        assert.equal(evil.velY, 20, 'velY inherited correctly');
        assert.equal(evil.color, 'rgb(255, 255, 255)', 'color set correctly');
        assert.equal(evil.size, 10, 'size set correctly');
    });

    QUnit.test('checkBounds keeps circle inside canvas', function(assert) {
        const evil = new EvilCircle(width - 5, height - 5);
        evil.checkBounds();

        assert.ok(evil.x + evil.size <= width, 'x + size <= width');
        assert.ok(evil.y + evil.size <= height, 'y + size <= height');
    });

    QUnit.test('collisionDetect removes ball', function(assert) {
        const ball = { x: 50, y: 50, size: 10, exists: true };
        balls.push(ball);

        const evil = new EvilCircle(50, 50);
        evil.collisionDetect();

        assert.notOk(ball.exists, 'ball was removed by evil circle');

        // clean up
        balls.pop();
    });

});