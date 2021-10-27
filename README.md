# Last Escape: the GDD
<p align="center">  
<img src= "/images/nnd488_negate.png">
  
[Twitter](https://twitter.com/NameNotDet)
  

_**v. 0.4** (13/10/2021)_

## Descripción
En este juego web basado en una de los legendarios cortos de _Alfred Hitchcock Presenta_, somos un viejo sepulturero de una cárcel femenina, preparando la huida de una convicta con la que nos hemos aliado. Debemos conseguir lo necesario para poder crear un ataúd, para así poder enterrarla y que pueda escapar, sin que nos pillen los guardias.

## Vista General
  
<p align="center">  
<img src= "/images/Boceto_juego_fondo_blanco.png">

## Jugabilidad
### Mecánicas del personaje
- **Movimiento:** el personaje será capaz de moverse por el escenario en cualquier dirección.
- **Cataratas:** el personaje irá perdiendo la visión con el transcurso de las noches, se reducirá el radio del círculo de visión.
- **Barra de Sospecha:** el personaje tendrá una barra que indicará si los guardias sospechan de él. La barra se irá llenando gradualmente si el jugador entra en el cono de visión de los guardias con un objeto grande. La barra disminuye lentamente si el jugador se encuentra en el taller.
- **Escucha:** el personaje puede escuchar a los guardias que patrullan fuera de su radio de visión, en pantalla se verán unas ondas para representarlo. El jugador escuchará a los guardias en intervalos de tiempo. No es visible la dirección de los guardias o hacia dónde se encuentran mirando.

### Mecánicas del escenario
- **Coger objetos clave:** el personaje puede coger objetos específicos del escenario y transportarlos.
- **Dejar objetos:** el personaje puede dejar objetos recogidos con anterioridad en cualquier lugar.
- **Zonas restringidas:** hay zonas en las que los guardias sospecharán del jugador aunque no lleve objetos, se indicará con un cono de visión de otro color o tono.
- **Objetos grandes:** tablones, pala, cruz… Si un guardia ve al jugador con un objeto grande sospechará. Si sólo ve el objeto lo devuelve a su sitio. El jugador carga los objetos grandes, por lo que serán visibles.
- **Objetos pequeños:** martillo, clavos… Una vez recogidos, los objetos pequeños se añaden automáticamente a la lista. Los guardias no verán si el jugador ha recogido objetos pequeños. 
#### Enemigos
- **Guardias:** los guardias patrullan por la cárcel por rutas predefinidas, que no cambian entre noches, y sospecharán (sube la barra de sospecha) del jugador si entra en su cono de visión junto con un objeto grande. Si no lleva nada encima el jugador pasará desapercibido. Los guardias pueden recoger los objetos del suelo si se los encuentran, devolviéndolos a su lugar. Para representarlo en pantalla se quejarán al verlo (saldrá un bocadillo visible siempre, sin tener en cuentar el rango de visión). Su cono de visión estará representado por la luz de la linterna.

### Controles
- **Ratón:**
LMB para indicar a dónde moverse,
RMB para indicar dónde coger/dejar un objeto

- **Teclado:**
WASD para moverse,
Space para coger/dejar un objeto

### Cámara
El juego tendrá una perspectiva cenital. El mapa ocupa toda la pantalla, sin embargo, el jugador solo verá un área circular que se irá reduciendo.

### Dinámica
El objetivo del juego es ir consiguiendo objetos por la prisión para realizar la fuga sin que la barra de sospecha llegue al máximo. Si la barra llega al máximo el jugador es detenido, se le quita el objeto grande que lleve encima y se pasa directamente a la siguiente noche.

Cada noche tiene un tiempo límite para recoger objetos, indicado en pantalla con un reloj. El jugador podrá recoger tantos objetos como le dé tiempo. Esto permite poder acabar la lista antes de que transcurran las 5 noches.

Cada noche tendrá una duración de 2 minutos(temporal).

## Estética
La estética del juego será pixelart, con colores casi monótonos para proporcionar el ambiente triste y opaco característico de una prisión.
Esto permitirá una mejor experiencia y sensaciones, a la vez que facilitará la representación gráfica y  comprensión de varias mecánicas.

## Contenido
### Historia
Una mujer es mandada a la cárcel con cadena perpetua por realizar diversos crímenes, tales como estafa y asesinato. Una vez dentro intenta por todos los medios escapar. Un día conoce al sepulturero de la cárcel apodado “Matasanos” y lo engaña para que le ayude a escapar de la cárcel. 
El sepulturero se encargará entonces de preparar el ataúd para enterrar a la mujer junto con el siguiente preso que muera.	

### Niveles
El juego se dividirá en 5 noches. 
Cada noche comenzará en la zona del taller del sepulturero.

Al final de las 5 noches habrán 3 resultados: 
1. El jugador ha completado la lista a tiempo. Se llega al final neutral (mismo final del capítulo original).
2. El jugador no ha logrado completar la lista. Se llega al final malo: la convicta no consigue escapar.
3. El jugador completa la lista antes de tiempo. Se llega al final bueno: la convicta consigue escapar y el sepulturero no muere.

### Lista de objetos
El juego acaba cuando el jugador complete esta lista. Se compone de:

#### Objetos grandes
- 8 tablas de madera.
- 1 cruz.
- 1 pala.
- 1 sierra.

#### Objetos pequeños
- 1 caja de clavos.
- 1 martillo.
- 1 set de visagras.

### Personajes
- **Matasanos:** es el sepulturero de la cárcel. Es un señor con edad avanzada (unos 60-70 años). Tiene cataratas por la edad, lo que hace que vea mal incluso con sus gafas.

- **Convicta:** es una mujer de edad media (unos 30-40 años). Ha sido apresada por cometer asesinato y otros delitos. Es de personalidad retorcida y siempre intenta usar a las personas para su beneficio.

- **Guardias:** son los enemigos del juego. Distintos guardias patrullan la cárcel para impedir que los presos escapen o hagan actividades extrañas. Tienen también en vigilancia siempre al sepulturero, ya que tiene libre acceso a la cárcel.

## Referencias:
- **Alfred Hitchcock Presents: Final Escape** _(historia, concepto)_: https://youtu.be/xmSNjhHKtCk
- **Yumori Forest** _(visuales, mecánicas)_: https://store.steampowered.com/app/911120/Yumori_Forest/
- **Teleglitch** _(visuales, mecánicas)_: https://store.steampowered.com/app/234390/Teleglitch_Die_More_Edition/
- **The Legend of Zelda: Majora's Mask** _(mecánica de paso del tiempo)_
- **Darkwood** _(tipo de visibilidad)_: https://store.steampowered.com/app/274520/Darkwood/

## Contacto:
- enrijuan@ucm.es
- rodsan05@ucm.es
- pablos16@ucm.es
- gonzaf05@ucm.es

#

#

## _ChangeLog:_
### v0.1: 
- Created Game Design Document 
- Specified main mechanics
### v0.2: 
- Defined game dynamic
- Added new mechanics
### v0.2.1:
- Formatted GDD
- Implemented into GitHub repository
### v0.3:
- Redefined mechanics and dinamics
- Added items list
### v0.4:
- Added game image
