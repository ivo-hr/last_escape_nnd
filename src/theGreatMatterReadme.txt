   _       _                                                           _    
  FJ_     FJ___      ____         ___ _    _ ___    ____      ___ _   FJ_   
 J  _|   J  __ `.   F __ J       F __` L  J '__ ", F __ J    F __` L J  _|  
 | |-'   | |--| |  | _____J     | |--| |  | |__|-J| _____J  | |--| | | |-'  
 F |__-. F L  J J  F L___--.    F L__J J  F L  `-'F L___--. F L__J J F |__-.
 \_____/J__L  J__LJ\______/F    )-____  LJ__L    J\______/FJ\____,__L\_____/
 J_____F|__L  J__| J______F    J\______/F|__L     J______F  J____,__FJ_____F
                                J______F                                    
    __  __           _         ____     ____       ____         ___         
   F  \/  ]         /.\       /_  _\   /_  _\     F ___J       F _ ",       
  J |\__/| L       //_\\      [J  L]   [J  L]    J |___:      J `-'(|       
  | |`--'| |      / ___ \      |  |     |  |     | _____|     |  _  L       
  F L    J J     / L___J \     F  J     F  J     F L____:     F |_\  L      
 J__L    J__L   J__L   J__L   J____L   J____L   J________L   J__| \\__L     
 |__L    J__|   |__L   J__|   |____|   |____|   |________|   |__|  J__|     
                                   _                                        
   _ ___    ____      ___ _     ___FJ    _ _____      ____                  
  J '__ ", F __ J    F __` L   F __  L  J '_  _ `,   F __ J                 
  | |__|-J| _____J  | |--| |  | |--| |  | |_||_| |  | _____J                
  F L  `-'F L___--. F L__J J  F L__J J  F L LJ J J  F L___--.               
 J__L    J\______/FJ\____,__LJ\____,__LJ__L LJ J__LJ\______/F               
 |__L     J______F  J____,__F J____,__F|__L LJ J__| J______F         

THE README FOR EVERYTHING matter.js  WE'LL (supposedly) USE

initially created by ivO
everybody is welcome to add whatever!

------------------------------------------------------------

FORMATTING:
/*
      _                   
  ___| | __ _ ___ ___     
 / __| |/ _` / __/ __|    
| (__| | (_| \__ \__ \  _ 
 \___|_|\__,_|___/___/ (_) : classDefinition
                          
X. typeOfElement
    - element (unitOfUse): definition
        + subElements: definition
        ! warnings
    - element (unitOfUse): definition

X. typeOfElement
...

*/

I.E.:
/*
                  _                
  ___ _ __   __ _(_)_ __   ___     
 / _ \ '_ \ / _` | | '_ \ / _ \    
|  __/ | | | (_| | | | | |  __/  _ 
 \___|_| |_|\__, |_|_| |_|\___| (_) : used to...
            |___/   

1. Methods
    - create
    ...

2. Properties
    - constraintIterations (Nº): to limit...
    - enableSleeping (bool)
        ! careful declaring because of...
    - timing (obj)
        ! careful tryng to...
        + timeScale (Nº): changes...
            ! don't surpass...
        + timeStamp (Nº): gives...
    - velocityIterations (Nº): to...
*/

------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------

                  _                
  ___ _ __   __ _(_)_ __   ___     
 / _ \ '_ \ / _` | | '_ \ / _ \    
|  __/ | | | (_| | | | | |  __/  _ 
 \___|_| |_|\__, |_|_| |_|\___| (_) : used to create and edit the engine (basically world simulation controllers)
            |___/   

1. Methods
    - create
    - clear
    - merge
    - run (has the same use as Runner.run)
    - update

2. Properties
    - constraintIterations (Nº): to limit the number of iterations each update
    - enableSleeping (bool)
    - plugin: to use plugins, duh
    - positionIterations (Nº): to limit the times position is done/checked each update    
    - timing (obj)
        + lastDelta (Nº): the Delta for the current engine.update
        + lastElapsed (Nº): time since the last update
        + timeScale (Nº): changes the global speed (higher is faster)
        + timeStamp (Nº): gives the current time that instant
    - velocityIterations (Nº): to limit the times velocities are calculated each update
    - world (composite): contains everything simulated by the current iteration of the engine

3. Events: these are emitted by obj created by the engine and recieved by obj with matter.events on
    - afterUpdate: goes after update and ALL collisions. It gives out:
        + event (obj)
        + timeStamp
        + Source of the event
        + Name of the event
    - beforeUpdate: goes just before update. It gives out:
        + event (obj)
        + timeStamp
        + Source of the event
        + Name of the event
    - collisionStart: goes just after update, gives all obj that started to collide. It gives out:
        + event (obj)
        + Pairs that collided
        + timeStamp
        + Source of the event
        + Name of the event
    - collisionActive: goes just after update, gives all obj that are colliding. It gives out:
        + event (obj)
        + Pairs that collided
        + timeStamp
        + Source of the event
        + Name of the event
    - collisionEnd: goes just after update, gives all obj that ended their collisions. It gives out:
        + event (obj)
        + Pairs that stopped colliding
        + timeStamp
        + Source of the event
        + Name of the event


                    _               
 _ __ ___ _ __   __| | ___ _ __     
| '__/ _ \ '_ \ / _` |/ _ \ '__|    
| | |  __/ | | | (_| |  __/ |     _ 
|_|  \___|_| |_|\__,_|\___|_|    (_) : simple canvas renderer for instances of .engine (intended for debugging)

1. Methods
    - create (render)
    - startViewTransform() (render): based on render.bounds
    - endViewTransform() (render)
    - lookAt: position and size of viewports around a given obj's bounds. The obj must have either:
        + .bounds   + .position     + .min and .max     + .x and .y
    - run: updates on requestAnimationFrame(event)
    - setPixelRatio
    - stop
    - world
    
        
        
