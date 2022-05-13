var test
function make_scene_1(sm, scene_name="scene1"){      
    loader = new SpriteLoader("TexturePacker/Scene1.json");    
    var scene1 = new Scene(scene_name);
    var bg = new Node("background");
    bg.drawSelf = ()=>{background(color("#FEFFD2"));}
   
    var cat  = new Node("cat");
    var cat_body = new SpriteNode(loader.get_handle("cat-body.png"));
    var cat_tail = new SpriteNode(loader.get_handle("cat-body.png"));
    var cat_face = new Node("cat_face");
    var cat_eye1 = new SpriteNode(loader.get_handle(["cat-eye.png", "cat-eye-hovered.png"]));
    var cat_eye2 = new SpriteNode(loader.get_handle(["cat-eye.png", "cat-eye-hovered.png"]));
    var cat_mouse = new SpriteNode(loader.get_handle(["cat-mouse.png", "cat-mouse-hovered.png"]));
    var cat_antenna_left = new SpriteNode(loader.get_handle("cat-antenna-left.png"));
    var cat_antenna_right = new SpriteNode(loader.get_handle("cat-antenna-right.png"));
    var title = new SpriteNode(loader.get_handle("title.png"));
    var btn_go = new SpriteNode(loader.get_handle(["btn-go.png","btn-go-hovered.png"]),false, true);
    var water = new Node("water")
    
    
    title.updateSelf = function(){
      console.log(this.accScale,this.size ,this.translation)
      if(btn_go.mouseHovered){
        title.setScale(1.2);
      }else{
        title.setScale(1)
      }
      title.setCenter((windowWidth)/2, windowHeight*0.35);
    }
    test = title
    
    btn_go.updateSelf = function(){
      btn_go.setCenter(windowWidth/2, windowHeight*0.7);
    }
    btn_go.onMouseEnter = function(){
      btn_go.nextSprite();
      cat_eye1.nextSprite();
      cat_eye2.nextSprite();
      cat_antenna_left.setRotate(0.2,[0,100]);
      cat_antenna_right.setRotate(0.1,[0,100]);
    }
    btn_go.onMouseExit = function(){
      btn_go.prevSprite();
      cat_eye1.prevSprite();
      cat_eye2.prevSprite();
      cat_antenna_left.setRotate(0);
      cat_antenna_right.setRotate(0);
    }
    btn_go.onMouseClick = function(){
      console.log("go to scene 2")
      this.sm.addScene(make_scene_2(this.sm, loader));
      scene1.removeSelf();

    }

    cat.addChild(cat_body);
    cat.addChild(cat_tail);
    cat_body.addChild(cat_face);
    cat_face.addChild(cat_eye1);
    cat_face.addChild(cat_eye2);
    cat_face.addChild(cat_mouse);
    cat_face.addChild(cat_antenna_left);
    cat_face.addChild(cat_antenna_right);
    
    cat_body.updateSelf = function(){
      var float_height = (water.state.drift11 + water.state.drift12)/2 / this.accScale;
      var float_theta = atan2(water.state.drift12-water.state.drift11,530);
      this.setTranslate(0, float_height/2);
      this.setRotate(float_theta/2,[750,100]);
    }

    cat_tail.updateSelf = function(){
      var w = windowWidth / this.accScale
      var float_height = (water.state.drift21 + water.state.drift22)/2 / this.accScale;
      var float_theta = atan2(water.state.drift22-water.state.drift21,530);
      this.setTranslate(w, float_height/2);
      this.setRotate(float_theta/2, [250,100]);
    }
    cat_face.setTranslate(730,110);
    cat_eye1.updateSelf = function(){
      const mouseDiff = [mouseX - (this.accX+24), mouseY - (this.accY+3)];
      const th = atan2(mouseDiff[1], mouseDiff[0]);
      if(this.spriteIndex == 0){
        cat_eye1.setRotate(th,[4,4]);
      }
      else{
        cat_eye1.setRotate(0);
      }
      cat_eye1.setTranslate(24,3)
    }

    cat_eye2.updateSelf = function(){
      const mouseDiff = [mouseX - (this.accX+82), mouseY - (this.accY+3)];
      const th = atan2(mouseDiff[1], mouseDiff[0]);
      if(this.spriteIndex == 0){
        cat_eye2.setRotate(th,[4,4]);
      }
      else{
        cat_eye2.setRotate(0);
      }
      cat_eye2.setTranslate(82,3);
    }
    
    cat_mouse.setTranslate(40,66);
    cat_antenna_left.setTranslate(80,-180)
    cat_antenna_right.setTranslate(40,-190)

    cat.updateSelf = function(){
        this.setScale(1.2);
        this.setTranslate(-473*this.accScale,windowHeight*0.32*this.accScale);
    }
    
    water.state.drift11 = 0;
    water.state.drift12 = 0;
    water.state.drift21 = 0;
    water.state.drift22 = 0;
    water.drawSelf = function(){
      fill('rgba(10,10,255,0.5)');
      noStroke();
      //rect(0,0,windowWidth, windowHeight*0.4);
      beginShape();
      for(let i = 0; i < windowWidth; i+=10){
        let water_level = 0
        water_level += cos(this.accTime/700+i/65)
        water_level += cos(-this.accTime/300+i/150)*10
        water_level += sin(this.accTime/2000+i/400)*30
        water_level += sin((i-mouseX+ this.accTime/200)/200)*50 * exp(-(abs(mouseX - i))/windowWidth*3)
      

        
        vertex(i, water_level+windowHeight*0.7);
        // store water level value for cat body drifting
        if(i==0){
          this.state.drift11 = water_level;
        }
        else if(i==530){
          this.state.drift12 = water_level;
        }
        else if(i== (windowWidth- (windowWidth % 10)-530)){
          this.state.drift21 = water_level;
        }
        else if(i==windowWidth - (windowWidth % 10)){
          this.state.drift22 = water_level;
        }
      }
      vertex(windowWidth, windowHeight);
      vertex(0, windowHeight);
      endShape(CLOSE);
      
    }
    //water.setTranslate(0, windowHeight*2/3);
  
    const tk = mouseTracker(sm);
    scene1.addChild(bg);
    scene1.addChild(cat);
    scene1.addChild(water);
    scene1.addChild(title);
    scene1.addChild(btn_go);
    scene1.addChild(tk);
  

    loader.load().then(function(loader){
      PubSub.publish(scene_name, "activate");
      PubSub.publish(scene_name, "show");
    })
    console.log(scene1)
    return scene1;
} 

function make_scene_2(sm, loader){
  scene2 = new Scene("scene2");
  bg = new Node("bg",false);
  scene2.addChild(bg)
  
  bg.drawSelf = function(){
    background(0,0,0);
  }

  scene2.activate()
  scene2.show()
  return scene2;
}