# Last Escape GDD
![nnd488_negate](https://user-images.githubusercontent.com/81875802/134952453-7c453107-a870-46ed-be91-e4a61608e402.png)

Twitter: https://twitter.com/NameNotDet

_**v. 0.2.1** (24/09/2021)_

## Descripción
En este juego web basado en una de los legendarios cortos de _Alfred Hitchcock Presenta_, somos un viejo sepulturero de una cárcel femenina, preparando la huida de una convicta con la que nos hemos aliado. Debemos conseguir lo necesario para poder crear un ataúd, para así poder enterrarla y que pueda escapar, sin que nos pillen los guardias.

## Jugabilidad
### Mecánicas del personaje
- **Movimiento:** el personaje será capaz de moverse por el escenario en cualquier dirección.
- **Cataratas:** el personaje irá perdiendo la visión con el transcurso de las noches.
- **Barra de Sospecha:** el personaje tendrá una barra que indicará si los guardias sospechan de él. La barra se irá llenando gradualmente si los guardias sospechan de él, y disminuirá a medida que dejen de hacerlo.
- **Escucha:** el personaje puede escuchar a los guardias patrullar, en pantalla se verán unas ondas para representarlo.

### Mecánicas del escenario
- **Coger objetos clave:** el personaje puede coger objetos específicos del escenario y transportarlos.
- **Dejar objetos:** el personaje puede dejar objetos recogidos con anterioridad en cualquier lugar.
- **Zonas restringidas:** hay zonas en las que los guardias sospecharán del jugador aunque no lleve objetos, se indicará con un cono de visión de otro color o tono.
- **Objetos grandes:** tablones, taladro, pala… Si un guardia ve al jugador con un objeto grande sospechará. Si sólo ve el objeto lo devuelve a su sitio.
- **Objetos pequeños:** martillo, clavos… El jugador puede cogerlos y guardarlos en el bolsillo. Los guardias no verán si el jugador ha recogido objetos pequeños. 
#### Enemigos
- **Guardias:** los guardias patrullan por la cárcel y sospecharán del jugador si le ven con objetos extraños. Si no lleva nada encima el jugador pasará desapercibido. Los guardias pueden recoger los objetos del suelo si se los encuentran, devolviéndolos a su lugar. Para representarlo en pantalla se quejarán al verlo.

### Controles
- **Ratón:**
LMB para indicar a dónde moverse,
RMB para indicar dónde coger/dejar un objeto

- **Teclado:**
WASD para moverse,
Space para coger/dejar un objeto

### Cámara
El juego tendrá una perspectiva top down. El mapa ocupa toda la pantalla, sin embargo, el jugador solo verá un área que se irá reduciendo.

### Dinámica
El objetivo del juego es ir consiguiendo objetos por la prisión para realizar la fuga sin que los guardias de la cárcel se den cuenta.

Cada noche tiene un tiempo límite para recoger objetos, indicado en pantalla. El jugador podrá recoger tantos objetos como le dé tiempo. Esto permite poder acabar la lista antes de que transcurran las 5 noches.

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

### Personajes
- **Matasanos:** es el sepulturero de la cárcel. Es un señor con edad avanzada (unos 60-70 años). Tiene cataratas por la edad, lo que hace que vea mal incluso con sus gafas.

- **Convicta:** es una mujer de edad media (unos 30-40 años). Ha sido apresada por cometer asesinato y otros delitos. Es de personalidad retorcida y siempre intenta usar a las personas para su beneficio.

- **Guardias:** son los enemigos del juego. Distintos guardias patrullan la cárcel para impedir que los presos escapen o hagan actividades extrañas. Tienen también en vigilancia siempre al sepulturero, ya que tiene libre acceso a la cárcel.

## Referencias:
- **Alfred Hitchcock Presents: Final Escape** _(historia, concepto)_: https://youtu.be/xmSNjhHKtCk
- **Yumori Forest** _(visuales, mecánicas)_: https://store.steampowered.com/app/911120/Yumori_Forest/
- **Teleglitch** _(visuales, mecánicas)_: https://store.steampowered.com/app/234390/Teleglitch_Die_More_Edition/

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
