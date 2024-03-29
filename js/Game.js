class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];
    car1.addImage("car1",car_1);
    car2.addImage("car2",car_2);
    car3.addImage("car3",car_3);
    car4.addImage("car4",car_4);
    
  }

  play(){
    form.hide();
    player.getRank();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;
      background("black");
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          fill("red");
          ellipse(x,y,60,60);
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)

      }

    }
if (player.distance>3650){
  gameState=2;
  player.rank++;
  Player.updateRank(player.rank);
}
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      console.log(player.distance);
      sound.play();
      sound.setVolume(0.1);
    }
    if (keyWentUp(UP_ARROW)){
      sound.pause();
    }
    
    drawSprites();
  }
  end(){
    console.log("Game Ended!");
    console.log(player.rank);
  }
}
