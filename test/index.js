

var sm;
const DEFAULT_WIDTH = 1440, DEFAULT_HEIGHT = 680;
const cvAspectRatio = DEFAULT_HEIGHT/DEFAULT_WIDTH;

function preload(){
  // create scene manager
  sm = new getSceneManager();
}

async function setup() {

  cv = createCanvas(DEFAULT_WIDTH, DEFAULT_HEIGHT);
  resetCanvasSize();
  cv.elt.style.zIndex = 1000;
  
  // create scene loaders
  const loader1 = new SpriteLoader("../TexturePacker/Scene1.json");
  const loader2 = new SpriteLoader("../TexturePacker/Scene2.json");
  const loader3 = new SpriteLoader("../TexturePacker/Scene3.json");
  const loader_buttons = new SpriteLoader("../TexturePacker/Buttons.json");
  const loader_cats = new SpriteLoader("../TexturePacker/Cats.json");

  // wait all loader to complete
  await Promise.all([loader1.load(), loader2.load(), loader3.load(), loader_buttons.load(), loader_cats.load()]);

  // add scenes to scene manager
  const scene = t_local_scaling();
  sm.addScene(scene);
  
  // jump to specific page using url search parameter
  let url = new URL(window.location.href);
  let p = url.searchParams.get("page");
  console.log(url,p)
  if(p) {
    PubSub.publish(p,"reload");
  }else {
    // activate scene1
    PubSub.publish("scene1-1","reload");
  }
}

function draw() {
  sm.update(deltaTime);
  sm.render();
}

/**
 * Reset the canvas size with respect to the window size.
 */
function resetCanvasSize() {
  let winAspectRatio = windowHeight / windowWidth;
  // 比較視窗縱橫比及畫布縱橫比，若視窗縱橫比較大則代表視窗高度比預期的高度高，計算視窗寬及畫布寬的比例：反之則計算高比例
  let scale = winAspectRatio > cvAspectRatio? windowWidth / width : windowHeight / height;
  resizeCanvas(width * scale, height * scale);
  sm.scenes.forEach(scene => {
    scene.setScale(scale);
  })
}

/**
 * This will be called on window size changed.
 */
function windowResized() {
  resetCanvasSize();
}

function mousePressed(){
  sm.handleMousePress()
}
function mouseReleased(){
  sm.handleMouseRelease()
}
function mouseDragged(event){
  sm.handleMouseDrag(event)
}

function mouseWheel(event){
  sm.handleMouseScroll(event.delta)
  // disable page scrolling behavior
  return false
}