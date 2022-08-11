//The values that I want to pass down in the event are overwritten in the next fire of the event.
//This leads to the possibility of false inormation being passed as a parameter.


// const placeTurretEvent = new Event('placeTurret');
// const eventNameToEvent = {
//     'placeTurret': placeTurretEvent,
// }

// window.addEventListener('placeTurret', (e) => {
//     let currTurretType = e.turretType;
//     console.log("------------------------------------");
//     console.log(currTurretType);
//     console.log("------------------------------------");

//     setTimeout(() => {
//         console.log("------------------------------------");
//         console.log(currTurretType);
//         console.log("------------------------------------");
//     }, 5000)

//     //play turret place sound
// });

// function fireEvent(eventName, parameters){
//     let theEvent = eventNameToEvent[eventName];
//     let oldParameterValues = {};

//     for(let key in parameters){
//         oldParameterValues[key] = theEvent[key];
//         theEvent[key] = parameters[key];
//     }
    
//     window.dispatchEvent(placeTurretEvent);

//     for(let key in oldParameterValues){
//         theEvent[key] = oldParameterValues[key];
//     }
// }

// fireEvent('placeTurret', {turretType: 1});

// console.log(placeTurretEvent);