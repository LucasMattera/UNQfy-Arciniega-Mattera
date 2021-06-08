const commands = require('./src/commands');

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
	let unqfy ;
	if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
	}
    else {
        unqfy = new unqmod.UNQfy();
    }
	return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
	unqfy.save(filename);
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

	Se deberán implementar los comandos:
		- Alta y baja de Artista
		- Alta y Baja de Albums
		- Alta y Baja de tracks

		- Listar todos los Artistas
		- Listar todos los albumes de un artista
		- Listar todos los tracks de un album

		- Busqueda de canciones intepretadas por un determinado artista
		- Busqueda de canciones por genero

		- Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
		con el string pasado.

		- Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
		tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

	La implementacion de los comandos deberá ser de la forma:
	 1. Obtener argumentos de linea de comando
	 2. Obtener instancia de UNQfy (getUNQFy)
	 3. Ejecutar el comando correspondiente en Unqfy
	 4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {

	//manejar la excepcion de un comando que no va

	const unqfy = getUNQfy()
	
    //consola
	consoleMethod = process.argv[2] //el metodo que se ingresa en consola
	consoleArgs = process.argv.slice(3) //los argumentos del metodo ArrLs
	
    //console.log('   ********************');
    //console.log('       ENTRADA         ');
    //console.log('   ********************');
	//console.log('los parametros totales son: ', process.argv);
	//console.log('el metodo es: ', consoleMethod);
	//console.log('los argumentos a procesar son: ', consoleArgs);

	//transformando argumentos
	command = commands[consoleMethod];
	
	//console.log('Comando creado: ', command);
//
    //console.log('   *****************************')
    //console.log('           SALIDA');
    //console.log('   *****************************')
    
	//ejecuto el metodo
	command.executeMethod(consoleArgs, unqfy);
	
	saveUNQfy(unqfy);
	//console.log( getUNQfy());
	//console.log( '////////////////////////////////////////////////////////////////////////////////////');
	//console.log( '////////////////////////////////////////////////////////////////////////////////////');

}

//main();

module.exports = {getUNQfy, saveUNQfy};