"use strict";
var app = angular.module("mainApp.home");
app.service("portfolioData", function() {
  this.getData = function() {
    return [
      {name:"Majority", desc: "A reddit like site for submitting links and discussing them. All links and comments on links have 'points' attached.", images: ["http://i.imgur.com/Y6hf3s0.png","http://i.imgur.com/dikASot.png"], index: 0, git: "https://github.com/JacobTheEvans/majority" },
      {name:"Learn Angular Online", desc: "A website built to teach users the JavaScript Framework Angular. Built with Angular and Bootstrap. angular.jacobtheevans.com", images: ["http://i.imgur.com/w5mqD0E.png","http://i.imgur.com/3O4hGh1.png"], index: 0, git: "https://github.com/JacobTheEvans/learn-angular" },
      {name:"JavaScript RPG", desc: "JavaScript RPG Game in the style of final fantasy with CSS Animation made with Bootstrap.", images: ["http://i.imgur.com/BYt9DlO.png","http://i.imgur.com/l9twj8v.png"], index: 0, git: "https://github.com/JacobTheEvans/RPG-HTML-Game" },
      {name:"Ponidex", desc: "A pony charcter and clip database website. Made using Angular and Bootstrap.", images: ["http://i.imgur.com/9KRJ8FE.png","http://i.imgur.com/CXpL21O.png","http://i.imgur.com/O5C3aAE.png"], index: 0, git: "https://github.com/JacobTheEvans/Ponidex-Angular-API-Project" },
      {name:"Anarchy Chat", desc: "A website chat room with no moderators made using PHP. Where votes from users maintain order.", images: ["http://i.imgur.com/DFPzoPc.png","http://i.imgur.com/KD2d8sJ.png"], index: 0, git: "https://github.com/JacobTheEvans/AnarchyChat" },
      {name:"Ugly Things Forum", desc: "Picture sharing site. Upload images and click on them to see full image/comment. Made with Angular and Bootstrap.", images: ["http://i.imgur.com/lHBF2iL.png","http://i.imgur.com/AdGuw2l.png","http://i.imgur.com/LIQHEXO.png"], index: 0, git: "https://github.com/JacobTheEvans/Ugly-Things-Forum" },
    ];
  };
});
