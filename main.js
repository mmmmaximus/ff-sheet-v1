window.onload=function(){

console.log('test');

// rolls 1 die---------------------------------------------------
function rollD1(){
    return Math.ceil(Math.random()*6)
}

// save game progress---------------------------------------------
var saveFile
var save = document.getElementById('save')
save.addEventListener('click',function(e){
    //save stats, enemy stats, gold, provisions, inventory, notes in local storage
    localStorage.setItem('skill',skill.value)
    localStorage.setItem('stamina',stamina.value)
    localStorage.setItem('luck',luck.value)
    localStorage.setItem('initialSkill',skill.max)
    localStorage.setItem('initialStamina',stamina.max)
    localStorage.setItem('initialLuck',luck.max)
    localStorage.setItem('gold',gold.value)
    localStorage.setItem('provisions',provisions.value)
    localStorage.setItem('inventory',inventory.value)
    localStorage.setItem('notes',notes.value)

    //save hide state of initial buttons, lock state of stats
    localStorage.setItem('lockInitial',lockInitial.state)
    
    //save number of new stats added, their values
    localStorage.setItem('additionalStatCounter', additionalStatCounter)
    
    // create array of all newStatName & newStatValue save both arrays
    var newStatNames = []
    var newStatValues = []
    for(let i = 0;i<additionalStatCounter;i++){
        newStatNames.push(document.getElementsByClassName('newStatName')[i].value)
    }
    for(let i = 0;i<additionalStatCounter;i++){
        newStatValues.push(document.getElementsByClassName('newStatValue')[i].value)
    }
    localStorage.setItem('newStatNames',newStatNames)
    localStorage.setItem('newStatValues',newStatValues)
    
    //change save and load and deleteSave button text when save is clicked
    save.innerHTML = 'Progress is saved'
    load.innerHTML = 'Load save'
    deleteSave.innerHTML = 'Delete save file'   
})

// load game progress---------------------------------------------
var load = document.getElementById('load')
load.addEventListener('click',function(e){

    //load saved values into respective boxes
    skill.value = localStorage.getItem('skill')
    stamina.value = localStorage.getItem('stamina')
    luck.value = localStorage.getItem('luck')
    skill.max = localStorage.getItem('initialSkill')
    stamina.max = localStorage.getItem('initialStamina')
    luck.max = localStorage.getItem('initialLuck')
    gold.value = localStorage.getItem('gold')
    provisions.value = localStorage.getItem('provisions')
    inventory.value = localStorage.getItem('inventory')
    notes.value = localStorage.getItem('notes')

    //check state of lockInitial then show/hide inital text accordingly
    lockInitial.state = localStorage.getItem('lockInitial')
    if(lockInitial.state==null){
        lockInitial.state = 'unlocked'
    }
    showHideInitial()

    //load the number of times newStats was added and call it that num of times
    additionalStatCounter = localStorage.getItem('additionalStatCounter')
    for(let i=0;i<additionalStatCounter;i++){
        newStat()
    }

    //parse the stored string and load the new stat names and values
    newStatNames = JSON.parse('['+localStorage.getItem('newStatNames')+']')
    newStatValues = JSON.parse('['+localStorage.getItem('newStatValues')+']')
    for(let i = 0;i<additionalStatCounter;i++){
        document.getElementsByClassName('newStatName')[i].value = newStatNames[i]
    }
    for(let i = 0;i<additionalStatCounter;i++){
        document.getElementsByClassName('newStatValue')[i].value = newStatValues[i]
    }

    //change save and load deleteSave button text when load is clicked
    load.innerHTML = 'Progress is loaded'
    save.innerHTML = 'Save progress'
    deleteSave.innerHTML = 'Delete save file'

    //if there are no saves stored, change load button text
    if(localStorage.length==0){
        load.innerHTML = 'There are no save files'
    }
})

// delete save file-------------------------------------------------------
var deleteSave = document.getElementById('deleteSave')
deleteSave.addEventListener('click',function(e){
    //clear local storage and change save, load, delete button names
    localStorage.clear()
    deleteSave.innerHTML = 'Save file deleted'
    load.innerHTML = 'Load Save'
    save.innerHTML = 'Save progress'
})

// initialise stat variables-------------------------------------------
var skill = document.getElementById('skill')
var stamina = document.getElementById('stamina')
var luck = document.getElementById('luck')
var initialSkill = document.getElementById('initialSkill')
var initialStamina = document.getElementById('initialStamina')
var initialLuck = document.getElementById('initialLuck')

// increase and decrease initial values------------------------
var increaseInitialSkill = document.getElementById('increaseInitialSkill')
var decreaseInitialSkill = document.getElementById('decreaseInitialSkill')
var increaseInitialStamina = document.getElementById('increaseInitialStamina')
var decreaseInitialStamina = document.getElementById('decreaseInitialStamina')
var increaseInitialLuck = document.getElementById('increaseInitialLuck')
var decreaseInitialLuck = document.getElementById('decreaseInitialLuck')

// to edit initial skill stat
increaseInitialSkill.addEventListener('click',function(e){
    skill.max++
    initialSkill.innerHTML='Initial: '+skill.max
})
decreaseInitialSkill.addEventListener('click',function(e){
    skill.max--
    initialSkill.innerHTML='Initial: '+skill.max
})
// to edit initial stamina stat
increaseInitialStamina.addEventListener('click',function(e){
    stamina.max++
    initialStamina.innerHTML='Initial: '+stamina.max
})
decreaseInitialStamina.addEventListener('click',function(e){
    stamina.max--
    initialStamina.innerHTML='Initial: '+stamina.max
})
// to edit initial luck stat
increaseInitialLuck.addEventListener('click',function(e){
    luck.max++
    initialLuck.innerHTML='Initial: '+luck.max
})
decreaseInitialLuck.addEventListener('click',function(e){
    luck.max--
    initialLuck.innerHTML='Initial: '+luck.max
})

// buttons to change initial stats are hidden until stats are locked
var initialButton = document.getElementsByClassName('initialButton')
for (let i=0; i<initialButton.length;i++){
    initialButton[i].style.display = 'none'
}

//add additional stats like fear, hero pts etc-----------------------
var stats = document.getElementById('stats')
// count number of times addAdditionalStat is clicked
var additionalStatCounter = 0
var addAdditionalStat = document.getElementById('addAdditionalStat')
addAdditionalStat.addEventListener('click',function(){
    incrementStatCounter()
    newStat()
})

//increase new stat counter when add stat is clicked
function incrementStatCounter(){
    additionalStatCounter+=1
}

//creates new stat
function newStat(){
    
    //for name of new stat
    var newStatName = document.createElement('input')
    newStatName.classList.add('newStatName')
    stats.appendChild(newStatName)
    
    //for value of new stat
    var newStatValue = document.createElement('input')
    newStatValue.type = 'number'
    newStatValue.min = 0
    newStatValue.classList.add('newStatValue')
    stats.appendChild(newStatValue)
}

// roll inital stats for skill stamina luck------------------------
var rollInitial = document.getElementById('rollInitial');
// if stats are locked and roll initial is clicked, text show up
var lockedText = document.getElementById('lockedText');
rollInitial.addEventListener('click', function(ev){  
    //only can roll initial if stats are unlocked
    if(lockInitial.state=='unlocked'){    
        // set skill stamina luck values
        skill.value = rollD1()+6
        stamina.value = rollD1()+rollD1()+12
        luck.value = rollD1()+6
    } else{
        lockedText.innerHTML = 'UNLOCK before rolling stats'
    }
});

//lock initial stats-----------------------------------------------------
var lockInitial = document.getElementById('lockInitial')
//default state unlocked, stats are editable
lockInitial.state = 'unlocked' 
lockInitial.addEventListener('click', checkLocked)

//function to show/hide initial stat text and buttons
function showHideInitial(){
    if(lockInitial.state=='locked'){
        initialSkill.innerHTML='Initial: '+skill.max
        initialStamina.innerHTML='Initial: '+stamina.max
        initialLuck.innerHTML='Initial: '+luck.max
        for (let i=0; i<initialButton.length;i++){
            initialButton[i].style.display = 'block'
        }
    } else {
        initialSkill.innerHTML=''
        initialStamina.innerHTML=''
        initialLuck.innerHTML=''
        for (let i=0; i<initialButton.length;i++){
            initialButton[i].style.display = 'none'
        }
    }
}

//function to check if initial stats are locked
function checkLocked(){
    if(lockInitial.state=='unlocked'){
        //change lock state and button name
        lockInitial.state = 'locked'
        lockInitial.innerHTML = 'Unlock stats'

        //set current stats as the maximum and initial values
        skill.max = skill.value
        stamina.max = stamina.value
        luck.max = luck.value

        //show initial value text via external function
        showHideInitial()
 
    } else {
        //change lock state and button name
        lockInitial.state = 'unlocked'
        lockInitial.innerHTML = 'Lock initial stats'

        //delete max attribute when unlocked
        skill.removeAttribute('max')
        stamina.removeAttribute('max')
        luck.removeAttribute('max')
        
        //remove initial value text via external function
        showHideInitial()

        //remove locked text if any
        lockedText.innerHTML = ''
    }
}

//test luck------------------------------------------------------
var testLuck = document.getElementById('testLuck');
testLuck.addEventListener('click', function(ev){
    if(luck.value>0){
        //unlucky if total of 2 dice > current luck, luck -1 after
        if(rollD1()+rollD1()>luck.value){
            testLuck.innerHTML = 'Test luck: unlucky'
        } else{
            testLuck.innerHTML = 'Test luck: lucky'
        }
        luck.value--
    }
})

//roll 1 die-----------------------------------------------------
var rolldie = document.getElementById('rolldie')
rolldie.addEventListener('click', function(e){
    document.getElementById('rolldie').innerHTML = 'Roll 1 die: '+rollD1()
})

//roll2 dice----------------------------------------------------
var rolldice = document.getElementById('rolldice')
rolldice.addEventListener('click', function(e){
    document.getElementById('rolldice').innerHTML = 'Roll 2 dice: '+rollD1()+' , '+rollD1()
})

//fight mechanic------------------------------------------------------------
var enemy = document.getElementsByClassName('enemy')
var enemySkill = document.getElementsByClassName('enemySkill')
var enemyStamina = document.getElementsByClassName('enemyStamina')
var attackStrength
var enemyAttackStrength
var battleText = document.getElementById('battleText')
var fight = document.getElementById('fight')
var addEnemyInput = document.getElementById('addEnemyInput')
var allEnemies = document.getElementById('allEnemies')
var enemyList = [{'enemySkill': enemySkill[0].value,
                  'enemyStamina': enemyStamina[0].value}]

//add enemy button
addEnemyInput.addEventListener('click',function(e){
    //adds additional enemy skill stamina inputs
    allEnemies.appendChild(enemy[enemy.length-1].cloneNode(true))
    enemyList.push({})
    if(enemyList.length>28){
        allEnemies.appendChild(allEnemies.cloneNode(true))
        allEnemies.appendChild(allEnemies.cloneNode(true))
        allEnemies.appendChild(allEnemies.cloneNode(true))
        allEnemies.appendChild(allEnemies.cloneNode(true))
        allEnemies.appendChild(allEnemies.cloneNode(true))
        addEnemyInput.innerHTML = '3,2,1,0!'
    } else if(enemyList.length>27){
        allEnemies.appendChild(allEnemies.cloneNode(true))
        allEnemies.appendChild(allEnemies.cloneNode(true))
        addEnemyInput.innerHTML = '4'
    } else if(enemyList.length>26){
        allEnemies.appendChild(allEnemies.cloneNode(true))
        addEnemyInput.innerHTML = '5'
    } else if(enemyList.length>25){
        addEnemyInput.innerHTML = 'Click 5 more times and i will lag you'
    } else if(enemyList.length>20){
        addEnemyInput.innerHTML = 'Still clicking?!?'
    } else if(enemyList.length>15){
        addEnemyInput.innerHTML = 'Quite a fast clicker arent you?'
    } else if(enemyList.length>10){
        addEnemyInput.innerHTML = 'But you dont listen, do you'
    } else if(enemyList.length>5){
        addEnemyInput.innerHTML = 'This isnt a clicking game lmao'
    } else if(enemyList.length>3){
        addEnemyInput.innerHTML = 'I dont believe theres that many enemies'
    } else {
        addEnemyInput.innerHTML = 'Add enemy'
    }
})

// add enemy stats to enemyList array
function addEnemyStats(){
    for(let i=0; i<enemy.length;i++){
        enemyList[i]['enemySkill'] = enemySkill[i].value
        enemyList[i]['enemyStamina'] = enemyStamina[i].value
    }
}

//fight button
fight.addEventListener('click',fightOneAtATime)

function fightOneAtATime(e){
    // refresh stats on enemyList whenever fight is clicked
    addEnemyStats()
    
    // if empty stats between enemy stats input
    if(enemyList[0]['enemySkill']=='' || enemyList[0]['enemyStamina']==''){
        enemyList.shift()
        enemy[0].remove()
    }

    // ensure both player and enemy skill and stamina is > 0
    if (skill.value>0 && enemyList[0]['enemySkill']>0 && stamina.value>0 && enemyList[0]['enemyStamina']>0){
       
        // calculate attack strength for player and enemy
        attackStrength = Number(skill.value)+rollD1()+rollD1()
        enemyAttackStrength = Number(enemyList[0]['enemySkill'])+rollD1()+rollD1()
       
        // you hit enemy
        if (attackStrength> enemyAttackStrength){
            // update stamina in the enemy list
            enemyList[0]['enemyStamina']= Number(enemyList[0]['enemyStamina'])-2
            // update stamina on the screen
            enemyStamina[0].value = Number(enemyStamina[0].value)-2
            battleText.innerHTML = 'You hit enemy! Enemy loses 2 stamina'
            // gives the choice to use luck after every turn
            useLuck.addEventListener('click', usingLuck)

        //enemy hits you
        } else if (attackStrength< enemyAttackStrength){
            stamina.value= Number(stamina.value)-2
            battleText.innerHTML = 'Enemy hits you! You lose 2 stamina'
            // gives the choice to use luck after every turn
            useLuck.addEventListener('click', usingLuck)

        // both miss
        } else{
            battleText.innerHTML = 'Both missed!'
            //cant use luck if both miss
            useLuck.removeEventListener('click',usingLuck)
        }
        //if either you or enemy defeated
        if(stamina.value<1){
            battleText.innerHTML = 'You are dead'
            useLuck.removeEventListener('click',usingLuck)
        } else if(enemyList[0]['enemyStamina']<1){
            battleText.innerHTML = 'You won!'
            useLuck.removeEventListener('click',usingLuck)
            //remove the defeated enemy from list and from screen
            if(enemy.length>1){
                enemyList.shift()
                enemy[0].remove()
            }    
        }
    }
}

// use luck in battle--------------------------------------------
var useLuck = document.getElementById('useLuck')
function usingLuck(){
    if(luck.value>0){
        if (attackStrength> enemyAttackStrength){
            if(rollD1()+rollD1()>luck.value){
                //update stamina in list
                enemyList[0]['enemyStamina'] = Number(enemyList[0]['enemyStamina'])+1
                // update stamina on the screen
                enemyStamina[0].value = Number(enemyStamina[0].value)+1
                battleText.innerHTML = 'Unlucky! Enemy lost 1 less stamina'
            } else{
                //update stamina in list
                enemyList[0]['enemyStamina'] = Number(enemyList[0]['enemyStamina'])-2            
                // update stamina on the screen
                enemyStamina[0].value = Number(enemyStamina[0].value)-2
                battleText.innerHTML = 'Lucky! Enemy lost 2 extra stamina'
            }
        } else if (attackStrength< enemyAttackStrength){
            if(rollD1()+rollD1()>luck.value){
                stamina.value = Number(stamina.value)-1
                battleText.innerHTML = 'Unlucky! You lost 1 extra stamina'
            } else{
                stamina.value = Number(stamina.value)+1           
                battleText.innerHTML = 'Lucky! You lost 1 less stamina'
            }
        }
        luck.value--
        //can only use luck once every turn
        useLuck.removeEventListener('click',usingLuck)

        //if either you or enemy defeated
        if(stamina.value<1){
            battleText.innerHTML = 'You are dead'
        } else if(enemyList[0]['enemyStamina']<1){
            battleText.innerHTML = 'You won!'
            //remove the defeated enemy from list and from screen
            if(enemy.length>1){
                enemyList.shift()
                enemy[0].remove()
            }
        }
    }
}

//use provisions-----------------------------------------------
var provisions = document.getElementById('provisions')
var useProvisions = document.getElementById('useProvisions');
useProvisions.addEventListener('click', function(ev){
    //if there are provisions, increase stamina and reduce provisions
    if (provisions.value>0){
        //only if stamina is below max
        if(Number(stamina.value)<Number(stamina.max)){
            provisions.value--
            //replenish stamina by 4 or to initial, whichever lower
            stamina.value = Math.min(Number(stamina.value)+4,stamina.max)
        }
    }
})
}