## Table of Contents

- [Conceptos](#conceptos)
- [Configuración](#configuración)
- [Comandos Básicos](#comandos-básicos)
- [Ramas](#ramas)
- [Etiquetas](#etiquetas)
- [Stash](#stash)
- [Commits](#commits)
- [Reverts](#reverts)
- [Flujo De Trabajo](#flujo-de-trabajo)
- [Archivo .ignore](#archivo-ignore)
- [Aliases](#aliases)
- [Notas](#notas)



## Conceptos

- **Claves SSH:** Claves públicas SSH sirven para autenticarse en servidores git.
El archivo terminado en '.pub' es tu clave pública, y el otro archivo es tu clave privada.
La clave pública es la que se comparte en github o bitbucket.

- **Repositorio:** Es el historial de cambios de un proyecto

- Hay 3 áreas:
  * **Working área:** Es el área (carpeta) donde está el proyecto, susceptible a cambios
  * **Staging área:** Área donde se eligen los archivos con modificaciones y que se quieren guardar en el commit
  * **Repository:** Área donde se almacenan los commits



## Configuración

- Configurar nombre del usuario:
```git config --global user.name "Diego Rayo"```

- Configurar email del usuario:
```git config --global user.email "diegofrayo@gmail.com"```

- Configurar los colores de la consola:
```git config --global color.ui true```

- Listar las variables de configuracion:
```git config --global --list```

Git contiene y genera registros de configuración con la idea de que puedas personalizar ciertas acciones de GIT.

Estos registros se colocan en diferentes lugares de tu computadora. Dependiendo de dónde quieres que se ejecuten esas configuraciones, será el comando que debes ejecutar.

Existen 3 niveles en tu computadora donde se desarrolla registros de configuración de GIT:

Como puedes observar, cada nivel tiene su propio contexto. Lo explicamos con detalle a continuación:

- **System:**
  Es una configuración para todos los usuarios de tu computadora. En la práctica, lo ideal es que no trabajes en este nivel realmente. Al crear preferencias de GIT en System, afectará todo el entorno de tu área local. Regularmente es un archivo que se encuentra, dependiendo del sistema operativo, en: ```etc/gitconfig``` ó ```/usr/local/git/etc/gitconfig```

  Para hacer modificaciones al registro de GIT en System, debes utilizar en terminal: ```git config --system [variable] "[descripción de variable]"```

- **User:**
  Esta configuración es la más usada y recomendada. Aplica para el usuario de tu computadora, específicamente. Para encontrar este archivo, tienes que ir al "root" ó a la carpeta principal de usuario. Puedes llegar ahí con el carácter tilde (~) ```~/.gitconfig```. Para hacer modificaciones al registro de GIT en User, debes utilizar en terminal: ```git config --global [variable] "[descripción de variable]"```

- **Project:**
  Puedes generar una configuración específica para un proyecto puntual. Si por ejemplo, para ese proyecto necesitas utilizar otro correo ó un nombre diferente. Con esto, determinamos que puedes crear configuraciones por proyecto. El archivo de gitconfig (configuraciones) para un proyecto específico lo puedes encontrar en: ```~/[Ruta del proyecto]/.git/config```

  Para hacer modificaciones al registro de GIT en un proyecto específico, debes utilizar en terminal:   ```git config [variable] "[descripción de variable]"```

  Como puedes observar, el git config se coloca directamente con la variable. Ya no utilizamos como en los anteriores algún --global ó --system. Cabe aclarar que para ejecutar configuraciones al proyecto, debemos iniciar GIT con git init.

- Para solucionar el tema de los saltos de linea, es recomendable configurar GIT en Windows de la siguiente manera: ```git config --global core.autocrlf true```. Esto hace que cuando se haga un checkout del repositorio, los archivos LF se conviertan automaticamente en archivos CRLF. Despues cuando se haga un commit, Git convertira los archivos CRLF en archivos LF. En sistemas Unix, se debe configurar Git de la siguiente manera: ```git config --global core.autocrlf input```. Esto hace que los archivos CRLF se conviertan en archivos LF cuando se haga un commit.



## Comandos Básicos

- Clonar un repositorio con usuario y password: ```git clone https://username:password@github.com/username/repo-name.git```

- Saber que archivos han sido modificados y que líneas de código han cambiado: ```git diff [--staged]``` | [Link](https://git-scm.com/book/es/v1/Fundamentos-de-Git-Guardando-cambios-en-el-repositorio)

- Sirve para ver los repositorios remotos del repositorio en donde se encuentra trabajando: ```git remote -v``` | [Link](https://git-scm.com/book/es/v1/Fundamentos-de-Git-Trabajando-con-repositorios-remotos)

- Sirve para ver el historial de commits: ```git log [file_name]``` | [Link](https://git-scm.com/book/es/v1/Fundamentos-de-Git-Viendo-el-hist%C3%B3rico-de-confirmaciones)
  * -p: Sirve para ver las líneas de código modificadas en los commits
  * -2: Sirve para ver los dos últimos commits
  * --oneline: Ver el id del commit y su mensaje en una sola linea

- Sirve para clonar o traer los cambios de alguna rama de un repositorio remoto en el repositorio local. Antes de utilizar este comando hay que agregar un repositorio remoto al repositorio: ```git fetch [nombre_repositorio_remoto]```

- Renombrar un archivo: ```git mv -f name.java Name.java```



## Ramas

Las ramas se utilizan para crear funcionalidades aisladas. Después que se terminen esas funcionalidades las ramas se deben unir a la rama principal.

- Crear una rama y pasarse a ella: ```git checkout -b [nombre_rama]``` | [Link](https://git-scm.com/book/es/v1/Ramificaciones-en-Git-Procedimientos-b%C3%A1sicos-para-ramificar-y-fusionar)

- Eliminar una rama: ```git branch -d branch_name => git push origin :branch_name```



## Etiquetas

Sirven para crear "imágenes o copias" del proyecto. Ideal cuando se hace un build. Sirven para regresar a un estado anterior del proyecto de una manera fácil. | [Link](https://git-scm.com/book/es/v1/Fundamentos-de-Git-Creando-etiquetas)

- Crear un tag: ```git tag 1.0.0 1b2e1d63ff``` | 1.0.0 es el nombre del tag. El otro valor es el identificador único del commit

- Lista las etiquetas de un proyecto: ```git tag```

- Eliminar un tag: ```git tag -d tag_name```

- Subir todos los tags a un repositorio remoto: ```git push origin --tags```

- Subir un tag especifico a un repositorio remoto: ```git push origin tag_name```



## Stash

Sirve para guardar los cambios temporalmente para poder cambiar de rama sin necesidad de hacer un commit. [Link 1](https://git-scm.com/book/es/v1/Las-herramientas-de-Git-Guardado-r%C3%A1pido-provisional) | [Link 2](https://frontendlabs.io/940--la-importancia-del-comando-git-stash-en-un-proyecto)

- Guardar los cambios de todos los archivos modificados: ```git stash```

- Eliminar un cambio temporal especifico: ```git stash drop -q stash@{0}```

- Mostrar la lista de cambios que han sido guardados temporalmente: ```git stash list```

- Recuperar los ultimos cambios guardados: ```git stash apply```

- Recuperar un stach especifico: ```git stash apply stash@{2}```

-  Guardar cambios temporales y asignarle un nombre al cambio:```git stash save "Activé el modal de actualizacion de plan"```

-  Mostrar todos los cambios almacenados en cambio temporal especifico:```git stash show stash@{0} -u```



## Commits

- Saber que archivos están en el commit y cuáles no: ```git status -s``` | [Link](https://git-scm.com/book/es/v1/Fundamentos-de-Git-Guardando-cambios-en-el-repositorio)

- Sobrescribir un commit anterior. Útil para cuando se hace un commit pero se olvida agregar un archivo o el mensaje del commit es erróneo. Solo sirve si no se ha hecho push: ```git commit --amend``` | [Link](https://git-scm.com/book/es/v1/Fundamentos-de-Git-Deshaciendo-cosas)



## Reverts

- Eliminar archivos del staging area, archivos que por error fueron agregados a traves de ```git add```: ```git reset HEAD [ files / *]```

-  Eliminar el ultimo commit antes de hacer push. Los cambios que se hicieron en el commit quedan en el staging area: ```git reset HEAD~```

- Borrar todos los commits, desde el ultimo hasta el indicado (Head queda apuntando al commit indicado). El working area es borrado: ```git reset --hard [commit_id]```

- Revertir el comando anterior, hay que ejecutar el mismo comando pero utilizar el id del ultimo commit del repositorio: ```git reset --hard [commit_id]```

- Para hacer lo mismo que el anterior comando, pero haciendo que todos los ultimos cambios de los commits borrados queden en el working area: ```git reset --mixed [commit_id]```

- Mas ejemplos: [Link](http://ohshitgit.com/)

- Explicacion de ```git revert```
![alt text](/assets/notes/images/diegofrayo/git/revert.png "revert")



## Flujo De Trabajo

```
git init - crear repo
git remote add [remote_name] [url repo] - anadir repo remoto
git fetch origin - trae los cambios del repo a la rama origin/master
git merge origin/master - merge entre la rama local y la rama remota
git push origin - hacer push al repo
```

Un repositorio tiene ramas locales y ramas remotas. Uno modifica las ramas locales y despues uno las pushea. Uno deberia mantener haciendo fetch de las ramas remotas y hacer merge con las ramas locales, o hacer esto mismo pero usando git pull.

Git pull lo que hace es hacer un git fetch / git merge origin/master desde la rama master local.

Cuando uno hace forks, uno deberia crear un remote llamado upstream, y ahi se bajaran las ramas del repositorio original, para ir haciendo merges entre las ramas remotas del repo original y las ramas locales de uno

Uno deberia tener estas ramas:
- master
- bugs
- releases
- development
- features

Los bugs salen de master. cuando hay merge entre master y bugs, tambien debe haber merge con development para actualizar esta rama.
los features salen de development.
los releases salen de development. si hay cambios en releases hay que actualizar development.
Se hace merge entre master y release cuando se va a hacer un deploy



## Archivo .ignore

```jsx
// Ignorar el contenido de una carpeta, excepto una carpeta que esta al interior
!bower_components/
bower_components/*
!bower_components/festa-angular-directives/

// Ignorar una carpeta y su contenido
node_modules/

// Ignorar un archivo en especifico
config.json

// Ignorar todos los archivos con una extension especifica
*.bat
```

```
pre {
  background-color: darken(white, 10%);
  padding: 20px;
  code {
    color: darken(white, 70%);
    &::before {
      content: '';
    }
    &::after {
      content: '';
    }
  }
}
```

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <title>Notes</title>
  <link rel="icon" href="/notes/images/favicon.png"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600"/>
  <!-- INJECT:css -->
</head>
<body>
  <!-- INJECT:js -->
</body>
</html>
```

```
// npm libs
import React from 'react';

class About extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <section>About page</section>;
  }
}

export default About;
```



## Aliases

`git config --global alias.superlog "log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"`

`git config --global alias.spull '!git checkout master; git pull; git checkout devDiego; git merge master'`

`git config --global alias.sprod '!git checkout master; git pull; git checkout production; git pull; git merge master; git push; git checkout devDiego'`



## Notas

- ¿Qué pasa si elimino un archivo en local y después hago pull?

  > No sale ningún error. Los nuevos archivos se cargan y los archivos borrados salen como 'missing' pero no generan ningún conflicto.

- ¿Qué pasa si hago pull y en el ultimo commit borraron varios archivos y yo en local modifique e hice commit de esos archivos?

  > Hay conflictos. Se puede dejar el archivo con los cambios o resolver el conflicto borrando ese archivo.

- ¿Qué pasa si hago pull antes de hacer commit, pierdo mis cambios? Si se hace efectivo el pull?

  > Se hace el pull siempre y cuando no hayan conflictos entre los archivos modificados y los nuevos, si hay conflictos simplemente el pull no se hace

- ¿Qué pasa si cambio la URL del repositorio, como actualizo la información en el repositorio local?

  > En la carpeta .git, los archivos config y fetch_head.
  Igual no hay que modificar estas rutas porque github hace una redirección automática
