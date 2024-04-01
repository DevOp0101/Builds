body, html {
    background-color: #000;
    color: #fff;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.fps-counter {
    position: fixed;
    top: 100px;
    right: 100px;
    font-family: Arial, sans-serif;
    font-size: 30px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 5px;
    z-index: 100
}

.game-light-glow{
    position:absolute;
    top:0;
    left:0;
    opacity: .4;
    z-index: 8;
}
.game-lighting{
    opacity: .1;
}
.game-container {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    z-index:1;
}

.game-level{
    width: 2048px;
    height: 2048px;
    background-image: url('../Images/Tileset1.jpg');
    position:absolute;
    top:0;
    left:0;
    opacity: 1;
    z-index: 1;
}

.game-border-wall {
    background-image: url("../Images/Stone.jpg");
    background-repeat: repeat;
    width: 6580px;
    height: 6520px;
    position: absolute;
    top: -250px;
    left: -220px;
    filter: brightness(.08);
    border: none;
    z-index: 1;
}

.game-landscape {
    width: 2048px;
    height: 2048px;
    position: absolute;
    top: 0px;
    left: 0px;
    filter: brightness(2);
    border: none;
    z-index: 1;
}

.game-landscape-shadowmap {
    width: 2048px;
    height: 2048px;
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: .93;
    border: none;
    z-index: 6;
    /*animation: flicker .5s linear infinite;*/
    filter: hue-rotate(20deg);
}

@keyframes flicker {
    0% {
        filter: hue-rotate(20deg);
    }
    50% {
        filter: hue-rotate(40deg);
    }
    100% {
        filter: hue-rotate(20deg);
    }
}

.game-character {
    width: 100px; 
    height: 150px; 
    background: url("../Images/Puppet.png") no-repeat;
    background-position: -00 -150;
    position: absolute;
    top: 42vh;
    left: 4vw;
    filter: brightness(1);
    border: none;
    z-index: 11;
}

.game-character-shadowmap {
    width: 2048px;
    height: 2048px;
    position: absolute;
    top: 0px; 
    left: 0px;
    object-fit: cover;
    opacity: .8;
    border: none;
    z-index: 13;

}

.game-strings {
    width: 200px;
    height: 600px;
    position: absolute;
    top: -11vh;
    left: 44.125vw;
    background-size: cover;
    opacity: .5;
    border: none;
    z-index: 9;
}

.game-character-inner-bloom {
    width: 2048px;
    height: 2048px;
    position: absolute;
    top: 0px; 
    left: 0px;
    object-fit: cover;
    opacity: .5;
    border: none;
    z-index: 12;
    animation: bloomdim .15s linear infinite;
}

.game-character-middle-bloom {
    width: 2048px;
    height: 2048px;
    position: absolute;
    top: 0px; 
    left: 0px;
    object-fit: cover;
    opacity: .5;
    border: none;
    z-index: 12;
    animation: bloombright .35s linear infinite;
}

.game-character-outter-bloom {
    width: 2048px;
    height: 2048px;
    position: absolute;
    top: 0px; 
    left: 0px;
    object-fit: cover;
    opacity: .5;
    border: none;
    z-index: 12;
    animation: bloomdim .25s linear infinite;
}

@keyframes bloomdim {
    0%{
        opacity: .1;
    }
    50%{
        opacity: .5;
    }
    100%{
        opacity: .1;
    }
}
@keyframes bloombright {
    0%{
        opacity: .3;
    }
    50%{
        opacity: .5;
    }
    100%{
        opacity: .3;
    }
}    