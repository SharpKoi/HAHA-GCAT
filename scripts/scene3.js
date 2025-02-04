function make_scene_31(loader, loader_cat, loader_buttons, scene_name = "scene3-1"){
    
    scene = new Scene(scene_name);
    const harbour = new SpriteNode(loader.get_handle("harbour.png"));
    const btn_next = new SpriteNode(loader_buttons.get_handle(["btn-next.png","btn-next-hovered.png"]),false, true);
    const checkbox1 = new SpriteNode(loader_buttons.get_handle(["checkbox-green.png","checkbox-green-checked.png"]),false, true);
    const checkbox2 = new SpriteNode(loader_buttons.get_handle(["checkbox-green.png","checkbox-green-checked.png"]),false, true);
    const question_31 = new SpriteNode(loader.get_handle("question3-1.png"));
    const option1 = new Node("option1",false);
    const option2 = new Node("option2",false);
    const answer_311 = new SpriteNode(loader.get_handle("answer3-1-1.png"));
    const answer_312 = new SpriteNode(loader.get_handle("answer3-1-2.png"));
    const cat_init = new SpriteNode(loader.get_handle("cat-init.png"));
    const backpack = new SpriteNode(loader.get_handle("backpack.png"));
    
    const water = new Node("water",false)
    const waterLevelAvg = windowHeight * 0.7

    const background_scene = new Node("background_scene",false);

    const birds = new Node("birds",false);
    const bird1 = new SpriteNode(loader.get_handle(["bird.png","bird-flap.png"]))
    const bird2 = new SpriteNode(loader.get_handle(["bird.png","bird-flap.png"]))
    const bird3 = new SpriteNode(loader.get_handle(["bird.png","bird-flap.png"]))
    
    const cloud = new Node("clouds", false)
    const cloud_small = new SpriteNode(loader.get_handle("cloud-small.png"))
    const cloud_medium = new SpriteNode(loader.get_handle("cloud-medium.png"))
    const cloud_large = new SpriteNode(loader.get_handle("cloud-large.png"))

    const normal_cat = new SpriteNode(loader_cat.get_handle(["normal-cat.png", "normal-cat-1.png", "normal-cat-2.png", "normal-cat-3.png", "normal-cat-4.png", "normal-cat-blink.png"]));
    const float_wood = new SpriteNode(loader.get_handle("float-wood.png"));
   
    const boat = new SpriteNode(loader.get_handle("boat.png"));
    const alert = new SpriteNode(loader.get_handle("alert.png"));
    
    alert.setCenter(windowWidth/2, windowHeight/2);
    alert.hide()
    alert.deactivate()
    alert.updateSelf = function(){
      if(this.accTime > 500){
        this.setCenter(windowWidth/2 + Math.random()*5, windowHeight/2+Math.random()*5);
      }
    }

    const FloatWoodInitX  = windowWidth*0.35
    float_wood.setTranslate(FloatWoodInitX, waterLevelAvg-float_wood.drawnSize[1]*0.3);
    float_wood.setAlpha(0)
    float_wood.hide()
    float_wood.deactivate()
    float_wood.updateSelf = function(){
      if(this.accTime < 500){
        this.alpha = this.accTime/500
      }
      else{
        this.alpha = 1
      }
    }

    background_scene.addChild(harbour);
    background_scene.addChild(birds)
    background_scene.addChild(boat)

    
    boat.updateSelf = function(){
      boat.setTranslate(windowWidth*1.6, waterLevelAvg-boat.drawnSize[1]*0.8)
      if(this.accX > windowWidth){
        this.setScale(0.2)
      }
      else{
        const percent = (windowWidth - this.accX) / (windowWidth*0.4)

        this.setScale(0.2 + percent*0.8)
      }
    }
    normal_cat.hide(); normal_cat.activate(false)
    normal_cat.setScale(0.27)
    normal_cat.setTranslate(0, windowHeight - normal_cat.drawnSize[1] - harbour.drawnSize[1]*0.8);

    // the counter cycling through the walk_cycle
    normal_cat.state.walk_cnt = 0
    // the frame number and the moving length between each frame
    normal_cat.state.walk_cycle = [
      [0 , normal_cat.drawnSize[0] * 0.01],
      [0 , normal_cat.drawnSize[0] * 0.01],
      [1 , normal_cat.drawnSize[0] * 0.01],
      [1 , normal_cat.drawnSize[0] * 0.01],
      [2 , normal_cat.drawnSize[0] * 0.01],
      [2 , normal_cat.drawnSize[0] * 0.01],
      [3 , normal_cat.drawnSize[0] * 0.01],
      [3 , normal_cat.drawnSize[0] * 0.01],
      [4 , normal_cat.drawnSize[0] * 0.01],
      [4 , normal_cat.drawnSize[0] * 0.01],
      [4 , normal_cat.drawnSize[0] * 0.01],
      [4 , normal_cat.drawnSize[0] * 0.01],
      [4 , normal_cat.drawnSize[0] * 0.01],
      [4 , normal_cat.drawnSize[0] * 0.01],
      [3 , normal_cat.drawnSize[0] * 0.001],
      [3 , normal_cat.drawnSize[0] * 0.001],
      [2 , normal_cat.drawnSize[0] * 0.001],
      [2 , normal_cat.drawnSize[0] * 0.001],
      [1 , normal_cat.drawnSize[0] * 0.001],
      [1 , normal_cat.drawnSize[0] * 0.001],
      [0 , normal_cat.drawnSize[0] * 0.001],
      [0 , normal_cat.drawnSize[0] * 0.001],
      [0 , normal_cat.drawnSize[0] * 0.001],
      [0 , normal_cat.drawnSize[0] * 0.001]
    ]
    // estimate the average crawling speed of cat using walk_cycle 
    var CatCrawlSpeed = 0
    for(let i = 0; i < normal_cat.state.walk_cycle.length; i++){
      CatCrawlSpeed += normal_cat.state.walk_cycle[i][1]
    }
    CatCrawlSpeed /= normal_cat.state.walk_cycle.length
    console.log("cat Crawl Speed", CatCrawlSpeed)

    normal_cat.crawl = function(){
      normal_cat.state.walk_cnt = (normal_cat.state.walk_cnt + 1) % normal_cat.state.walk_cycle.length
      const newFrame = normal_cat.state.walk_cycle[normal_cat.state.walk_cnt]
      const spriteIndex = newFrame[0]
      const delX = newFrame[1]
      const newX = normal_cat.translation[0] + delX / this.accScale
      normal_cat.setTranslate(newX, normal_cat.translation[1])
      normal_cat.setSpriteIndex(spriteIndex)
    }

    normal_cat.updateSelf = function(){
      if(this.accTime > 1000){
        // cat crawl to the edge of the harbour
        if(this.accX < harbour.drawnSize[0]){
          this.crawl()
        }
        else if(this.accX < FloatWoodInitX + 50){
          // cat jump onto floatwood or into water 
          this.crawl()
          const percent = (this.accX - harbour.drawnSize[1]) / (FloatWoodInitX - harbour.drawnSize[1])
          const skewed_percent = percent ** 1.5
          console.log("percent ", percent, " skewed_percent ", skewed_percent)
          const y_target = waterLevelAvg - float_wood.drawnSize[1]*0.2
          const y_init = harbour.drawnSize[1] + this.drawnSize[1]
          const y_current = y_init + (y_target - y_init) * percent
          this.setTranslate(this.translation[0], y_current)
        }else if(this.accX < windowWidth*0.35){
            // cat swim or float  to the middle of the screen
            if(scene.state.option == 1){
              // float speed = 2 pix / frame
              this.translation[0] += 2
              float_wood.translation[0] += 2
            }
            else{
              // swim speed = crawling speed - 1 pix / frame
              this.translation[0] -= 1 / this.accScale
              this.crawl()
            }
        }else if(background_scene.translation[0] > -windowWidth){
          // cat continue swinming until boat appear 
          if(scene.state.option == 1){
            // float speed = 2 pix / frame
            background_scene.translation[0] -= 2
          }
          else{
            // swim speed = crawling speed - 4 pix / frame
            background_scene.translation[0] -= (CatCrawlSpeed - 1) / this.accScale
            this.translation[0] -= CatCrawlSpeed / this.accScale
            this.crawl()
          }
        }
        else{
          // show alert message
          alert.show()
          alert.activate()
        }
      } 
    
    }


    cat_init.setTranslate(0, windowHeight - cat_init.drawnSize[1] - harbour.drawnSize[1]*0.8);
  
    backpack.hide()
    backpack.activate(false)
    backpack.setTranslate(windowWidth, 0);
    backpack.updateSelf = function(){
      const source = [windowWidth, 0]
      const target = cat_init.translation
      const percent = this.accTime / 1000;
      const x = source[0] * (1 - percent) + target[0] * percent;
      const y = source[1] * (1 - percent) + target[1] * percent;
      //console.log(x,y)
      this.setTranslate(x, y);
      this.setRotate(10*PI *percent )
      if(this.accTime > 1000){
        this.hide()
        this.activate(false)
        cat_init.hide()
        cat_init.activate(false)
        normal_cat.activate()
        normal_cat.show()

        if(scene.state.option == 1){
          // option1 : use float wood
            float_wood.show()
            float_wood.activate()
        }else{
          // option2 : swim
        }

      }
    }

    btn_next.setTranslate(windowWidth*0.9, windowHeight*0.9);
    btn_next.onMouseEnter = function(){
      this.nextSprite()
    }
    btn_next.onMouseExit = function(){
      this.prevSprite()
    }
    btn_next.onMouseClick = function(){
      if(scene.state.option != null){
        question_31.hide();question_31.activate(false);
        option1.hide();option1.activate(false);
        option2.hide();option2.activate(false);
        backpack.show();
        backpack.activate();

        this.hide()
        this.activate(false);
      }
    }

    scene.state.option = null;
    
    checkbox1.onMouseClick = function(){
      if(this.spriteIndex == 0){
        //check box currently not checked
        if(checkbox2.spriteIndex == 1){
          checkbox2.setSprite(0)
        }
        this.setSprite(1)
        scene.state.option = 1
      }
      else{
        // currently checked
        this.setSprite(0)
        scene.state.option = null
      }
    }

    checkbox2.onMouseClick = function(){
      if(this.spriteIndex == 0){
        //check box currently not checked
        if(checkbox1.spriteIndex == 1){
          checkbox1.setSprite(0)
        }
        this.setSprite(1)
        scene.state.option = 2
      }
      else{
        // currently checked
        this.setSprite(0)
        scene.state.option = null
      }
    }

    

    question_31.setTranslate(windowWidth*0.2, windowHeight*0.1);
    option1.addChild(answer_311);
    option1.addChild(checkbox1);
    option2.addChild(answer_312);
    option2.addChild(checkbox2);
    answer_311.setTranslate(checkbox1.drawnSize[0]+10,0)
    answer_312.setTranslate(checkbox2.drawnSize[0]+10,0)
    option1.setTranslate(windowWidth*0.23, windowHeight*0.2);
    option2.setTranslate(windowWidth*0.23, windowHeight*0.3);

    birds.addChild(bird1)
    birds.addChild(bird2)
    birds.addChild(bird3)
  
    bird1.setTranslate(windowWidth*0.7,100)
    bird1.setScale(0.3)
  
    bird2.setTranslate(windowWidth*0.73 ,200)
    bird2.setScale(0.7)
    bird2.setRotate(-0.4)
  
    bird3.setTranslate(windowWidth*0.9, 200)
    bird3.setScale(0.5)
    bird3.setRotate(0.1)
  
    bird1.updateSelf = function(){
      const duty = this.accTime % 1000
      if(duty > 200 && duty < 500){
        if(this.spriteIndex == 0){
          this.setSprite(1)
          this.setTranslate(this.translation[0],this.translation[1]-10)
        }
      }
      else{
        if(this.spriteIndex == 1){
          this.setSprite(0)
          this.setTranslate(this.translation[0],this.translation[1]+10)
        }
      }
    } 
  
    bird2.updateSelf = function(){
      const duty = this.accTime % 1000
      if(duty > 100 && duty < 400){
        if(this.spriteIndex == 0){
          this.setSprite(1)
          this.setTranslate(this.translation[0],this.translation[1]-10)
        }
      }
      else{
        if(this.spriteIndex == 1){
          this.setSprite(0)
          this.setTranslate(this.translation[0],this.translation[1]+10)
        }
      }
    } 
  
    bird3.updateSelf = function(){
      const duty = this.accTime % 1000
      if(duty > 300 && duty < 600){
        if(this.spriteIndex == 0){
          this.setSprite(1)
          this.setTranslate(this.accX,this.accY-10)
        }
      }
      else{
        if(this.spriteIndex == 1){
          this.setSprite(0)
          this.setTranslate(this.translation[0],this.translation[1]+10)
        }
        
      }
    }  
    cloud.addChild(cloud_small)
    cloud.addChild(cloud_medium)
    cloud.addChild(cloud_large)
    cloud_small.updateSelf = function(){
        this.setScale(pulse(1, 1.1, 3000, 0.6, 0.4) (this.accTime))
    }
    cloud_medium.updateSelf = function(){
        this.setScale(pulse(1, 1.1, 3000, 0.5, 0.4)(this.accTime))
    }
    cloud_large.updateSelf = function(){
        this.setScale(pulse(1, 1.1, 3000, 0.4, 0.4)(this.accTime))
    }
    cloud_small.setTranslate(windowWidth*0.15, windowHeight*0.12)
    cloud_medium.setTranslate(windowWidth*0.26, windowHeight*0.20)
    cloud_large.setTranslate(windowWidth*0.70, windowHeight*0.10)
      
    cloud.updateSelf = function(){
        this.setTranslate(10*sin(this.accTime/600),10*cos(this.accTime/600))
    }

    
    water.drawSelf = function(){
      const water_col = color('#37CADE')
      water_col.setAlpha(0.48*255*this.accAlpha)
      const waterStep = 10
      fill(water_col);
      noStroke();
      beginShape();
      for(let i = 0; i < windowWidth; i+=waterStep){
        let water_level = 0
        water_level += cos(this.accTime/700+i/65)
        water_level += cos(-this.accTime/300+i/150)*5
        water_level += sin(this.accTime/2000+i/400)*10
        vertex(i, water_level + waterLevelAvg);
      }
      vertex(windowWidth, waterLevelAvg)
      vertex(windowWidth, windowHeight);
      vertex(0, windowHeight);
      endShape(CLOSE); 
    }

    harbour.setTranslate(0,this.windowHeight - harbour.drawnSize[1])

    scene.reloadSelf = function(){
      this.activate()
      this.show()
      this.state.invokeNextScene = false
      this.alpha = 0.0
    }
    scene.updateSelf = function(){
      if(this.accTime < 1500){
        this.alpha = this.accTime / 1500
      }
      else{
        this.alpha = null
      }
    }

    const bg = new Node("bg",false);
    bg.drawSelf = function(){
      background(color("#FEFFD2"))
    }
    scene.addChild(bg);
    
    scene.addChild(cloud)
    scene.addChild(water);
    scene.addChild(background_scene)
    //scene.addChild(birds)
    scene.addChild(question_31);
    scene.addChild(option1);
    scene.addChild(option2);
    scene.addChild(cat_init);
    //scene.addChild(harbour);
    scene.addChild(btn_next);
    scene.addChild(backpack);
    scene.addChild(float_wood);
    scene.addChild(normal_cat);
    scene.addChild(alert);
    return scene
  }

  function make_scene_32(loader, name="scene3-2"){
    const scene = new Scene(name)
    const cat = new SpriteNode(loader.get_handle("cat-init.png"));
    
    const cloud_small = new SpriteNode(loader.get_handle("cloud-small.png"))
    const cloud_medium = new SpriteNode(loader.get_handle("cloud-medium.png"))
    const cloud_large = new SpriteNode(loader.get_handle("cloud-large.png"))

    const cloud = new Node("clouds", false)

    cloud.addChild(cloud_small);
    cloud.addChild(cloud_medium);
    cloud.addChild(cloud_large);



    //cat.setTranslate(windowWidth*0.5, windowHeight*0.5);
    //cat.setTranslate(windowWidth*0.5 - cat.size[0]/2, windowHeight*0.5-cat.size[1]/2);
    
    cat.setCenter(windowWidth*0.5, windowHeight*0.5);

    cat.updateSelf = function(){
      this.setCenter(windowWidth*0.5, windowHeight*0.5)
    }

    cloud.setTranslate(windowWidth*0.1, windowHeight*0.2);
    cloud.setScale(1.5)

    

    cloud_small.setTranslate(0,0)
    cloud_medium.updateSelf = function(){
      this.setDrawnSize(100,100)
    }
    cloud_medium.setTranslate(150,0)
    cloud_large.setTranslate(600,0)

    scene.reloadSelf = function(){
      this.activate()
      this.show()
    }

    scene.addChild(cat);
    scene.addChild(cloud);
    return scene 
  }