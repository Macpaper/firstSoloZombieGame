export function detectCollision(obj1, obj2) {
  // collision with object
  let bottomOfObj1 = obj1.position.y + obj1.height;
  let leftSideOfObj1 = obj1.position.x;
  let rightSideOfObj1 = obj1.position.x + obj1.width;
  let topOfObj1 = obj1.position.y;

  let topOfObject2 = obj2.position.y;
  let leftSideOfObject2 = obj2.position.x;
  let rightSideOfObject2 = obj2.position.x + obj2.width;
  let bottomOfObject2 = obj2.position.y + obj2.height;

  if (
    bottomOfObj1 >= topOfObject2 &&
    topOfObj1 <= bottomOfObject2 &&
    rightSideOfObj1 >= leftSideOfObject2 &&
    leftSideOfObj1 <= rightSideOfObject2
  ) {
    return true;
  } else {
    return false;
  }
}

export function detectCollisionBall(ball, gameObject) {
  // collision with object
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;

  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}
export function detectCollisionBorder(obj1, obj2) {
  // collision with object
  let bottomOfObj1 = obj1.position.y + obj1.height;
  let leftSideOfObj1 = obj1.position.x;
  let rightSideOfObj1 = obj1.position.x + obj1.width;
  let topOfObj1 = obj1.position.y;

  let topOfObject2 = obj2.position.y;
  let leftSideOfObject2 = obj2.position.x;
  let rightSideOfObject2 = obj2.position.x + obj2.width;
  let bottomOfObject2 = obj2.position.y + obj2.height;

  let obj1MidX = obj1.position.x + obj1.width / 2;
  let obj2MidX = obj2.position.x + obj2.width / 2;

  let obj1MidY = obj1.position.y + obj1.height / 2;
  let obj2MidY = obj2.position.y + obj2.height / 2;

  let vectorX = obj1MidX - obj2MidX;
  let vectorY = obj1MidY - obj2MidY;
  if (vectorY * vectorY > vectorX * vectorX) {
    if (vectorY > 0) {
      topOfObj1 = bottomOfObj1;
    } else {
      topOfObj1 = topOfObject2 - obj1.height;
    }
  } else {
    if (vectorX > 0) {
      leftSideOfObj1 = rightSideOfObject2;
    } else {
      leftSideOfObj1 = leftSideOfObject2 - obj1.width;
    }
  }

  if (
    bottomOfObj1 >= topOfObject2 &&
    topOfObj1 <= bottomOfObject2 &&
    rightSideOfObj1 >= leftSideOfObject2 &&
    leftSideOfObj1 <= rightSideOfObject2
  ) {
    return true;
  } else {
    return false;
  }
}
