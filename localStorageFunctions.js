function getLSSFXVolume(){
    let sfxVolume = localStorage.getItem("sfxVolume");
    return (sfxVolume == null ? 1 : sfxVolume);
}
function setSLSFXVolume(newVolume){
    localStorage.setItem("sfxVolume", newVolume);
}

function getLSMusicVolume(){
    let musicVolume = localStorage.getItem("musicVolume");
    return (musicVolume == null ? 1 : musicVolume);
}
function setLSMusicVolume(newVolume){
    localStorage.setItem("musicVolume", newVolume);
}

function getLSReachedLevel(){
    let reachedLevel = localStorage.getItem("reachedLevel");
    return (reachedLevel == null ? 1 : reachedLevel);
}
function setSLReachedLevel(newReachedLevel){
    localStorage.setItem("reachedLevel", newReachedLevel);
}

function getLSInformation(){
    if(localStorage.length == 0){
        //no local storage has been saved
        setSLSFXVolume(audioVolume['sfx']);
        setLSMusicVolume(audioVolume['music']);
        setSLSFXVolume(reachedLevel);
    }else{
        //there are existing local storage values
        audioVolume['sfx'] = getLSSFXVolume();
        audioVolume['music'] = getLSMusicVolume();
        reachedLevel = getLSReachedLevel();
    }
}
getLSInformation();