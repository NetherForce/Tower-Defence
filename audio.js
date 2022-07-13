let audioElement = {}; // audio name to audio element
let isAudioPlayable = {}; // audio name to bool that tells weather the audio can be played
let audioSrc = {"./assets/audio/25-CC0-bang-sfx/bang_01.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_02.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_03.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_04.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_05.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_06.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_07.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_08.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_09.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/bang_10.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/cannon_01.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/cannon_02.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/cannon_03.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/cannon_04.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/cannon_05.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/fw_01.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/fw_02.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/fw_03.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/fw_04.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/fw_05.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/fw_06.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/fw_loop.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/shot_01.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/shot_02.ogg": "sfx",
                "./assets/audio/25-CC0-bang-sfx/shot_03.ogg": "sfx",
                
                "./assets/audio/Game_SFX_by_OwlishMedia/ahhh.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/birdchirp.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/birdchirp2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/birdchirp3.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/birdchirp4.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/birdchirp5.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/blast.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/blastoff.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/blunk.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/bonus.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/bounce.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/bubbles.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/bwah.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/collect1.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/collect2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/collect3.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/collect4.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/collect5.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/compute.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/computeron.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/echosplosion.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/explodify.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/explodify2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/explodify3.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/explodify4.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/explodify5.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/fail.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/FF_punch.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/flump.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/hit1.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/hit2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/hit3.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/hop.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/jump.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/lazer.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/hilazer2t1.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/lazer3.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/lazer4.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/move.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/oceanwave1.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/oceanwave2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/oceanwave3.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/oceanwave4.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/oceanwave5.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/offbalance.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/ouch.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/plop.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/Powerup.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/Powerup2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/punch.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/r2d2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/reflect.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/slap.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/spinning_toss.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/splash.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/spring1.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/spring2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/spring3.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/spring4.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/struggle.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/telephone.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/tinyexplode.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/tinywarble.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/transform.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/transform2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/whimper.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/whistle.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/whistle_cab.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/whistle_wolf.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/whistle2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/whistle3.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/wobbledown.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/wobbledown2.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/wobbleup.wav": "sfx",
                "./assets/audio/Game_SFX_by_OwlishMedia/wobbleup2.wav": "sfx",
                
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-SandL1.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-SandL2.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-SandL3.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-SandR1.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-SandR2.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-SandR3.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-StoneL1.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-StoneL2.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-StoneL3.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-StoneR1.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-StoneR2.ogg": "sfx",
                "./assets/audio/Fantozzi-footsteps/ogg/Fantozzi-StoneR3.ogg": "sfx",
                
                "./assets/audio/[kdd]DifferentSteps/gravel.ogg": "sfx",
                "./assets/audio/[kdd]DifferentSteps/leaves01.ogg": "sfx",
                "./assets/audio/[kdd]DifferentSteps/leaves02.ogg": "sfx",
                "./assets/audio/[kdd]DifferentSteps/mud02.ogg": "sfx",
                "./assets/audio/[kdd]DifferentSteps/stone01.ogg": "sfx",
                "./assets/audio/[kdd]DifferentSteps/wood01.ogg": "sfx",
                "./assets/audio/[kdd]DifferentSteps/wood02.ogg": "sfx",
                "./assets/audio/[kdd]DifferentSteps/wood03.ogg": "sfx",
                }; // an array of all audio sources that need to be loaded and their group
let audiToPlayOnLoad = {
                        // "bang_02": true,
                        }; // ann objects with keys, that are the name of the audio that needs to be played when loaded
let audioGroups = {
    "sfx": {},
    "music": {},
};

function loadAudio(){
    for(let src in audioSrc){
        let newAudio = new Audio();
        newAudio.src = src;
        let audioName = getNameOfDocumentFromSource(src);
        audioElement[audioName] = newAudio;
        isAudioPlayable[audioName] = false;

        audioGroups[audioSrc[src]][audioName] = true; // puts the audio in its group

        newAudio.addEventListener("canplaythrough", event => {
            // set an event that listens when the audio is playable
            // when the audio is playeble, it

            isAudioPlayable[audioName] = true;

            console.log("audio " + audioName + " is ready to be played");

            if(audiToPlayOnLoad[audioName] != undefined){
                playAudio(audioName);
            }
        });
    }
}

function playAudio(audioName){
    //plays an audio if it is loaded
    if(audioElement[audioName] == undefined) return;
    if(!isAudioPlayable[audioName]) return;

    audioElement[audioName].play();
}

function copyAudioAndPlay(audioName){
    //makes a clone of the audio element and plays it if it is loaded
    if(audioElement[audioName] == undefined) return;
    if(!isAudioPlayable[audioName]) return;

    console.log("played audio");

    let newAudioElement = audioElement[audioName].cloneNode(true);
    newAudioElement.play();
}

function setAudioVolume(audioName, newVolume){
    if(newVolume < 0) newVolume = 0;
    if(newVolume > 1) newVolume = 1;

    audioElement[audioName].volume = newVolume;
}

function setAudioGroupVolume(groupName, newVolume){
    if(audioGroups[groupName] == undefined) return;

    for(let audioName in audioGroups[groupName]){
        setAudioVolume(audioName, newVolume);
    }
}