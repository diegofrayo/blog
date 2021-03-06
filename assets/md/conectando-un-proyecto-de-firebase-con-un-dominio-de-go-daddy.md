En este tutorial quiero explicar como conectar un dominio que tengamos en **Go Daddy** con un proyecto de **Firebase.**


## Requisitos

- Tener **Node.js** instalado
- Tener un dominio en **Go Daddy**
- Tener un proyecto creado en **Firebase Console**


## Conectando nuestro proyecto de Firebase con un dominio de Go Daddy

1. Ir al enlace `https://console.firebase.google.com/u/0/project/[YOUR-PROJECT-ID]/hosting` y hacer clic en **Conectar un dominio.**

1. Ahora aparecerá un modal, en donde como primer paso debemos escribir el nombre del dominio que queremos conectar, por ejemplo `diegofrayo.com`. Despues hacemos clic en **Continuar.**

1. En el segundo paso, debemos verificar que somos propietarios del dominio que queremos conectar, así que tenemos que crear un **Registro TXT** en la configuración de nuestro dominio de **Go Daddy.** Para hacer esto, vamos a iniciar sesión en **Go Daddy** y entrar al siguiente enlace `https://dcc.godaddy.com/manage/[YOUR-DOMAIN.COM]/dns`. Ahora debemos agregar un **Registro TXT** con los datos que **Firebase** nos proporciona y esperar unos minutos hasta que **Firebase** compruebe que el dominio es nuestro. *Yo tuve que esperar alrededor de una hora*.

  > **IMPORTANTE:**

  > Para crear un **Registro TXT**, es necesario ingresar un *Host*. **Firebase** propone usar como *Host* el nombre de nuestro dominio, por ejemplo `diegofrayo.com`. Yo **NO** usé el nombre de mi dominio como *Host* para crear el **Registro TXT**, en vez de esto, usé el simbolo `@`.

4. Despues de que **Firebase** compruebe que el dominio es nuestro, podemos ir al tercer paso, el cual consiste en crear los **Registros A** con los datos que **Firebase** nos proporciona. Para hacer esto, debemos ir a la configuración de nuestro dominio en **Go Daddy** y crear los **Registros A** de la misma forma que creamos el **Registro TXT** en el paso anterior. Antes de crear estos registros, es importante eliminar los **Registros A** que ya tengamos creados.

  > **IMPORTANTE:**

  > Para crear un **Registro A**, es necesario ingresar un *Host* y la *dirección IP* a donde apuntará nuestro dominio. **Firebase** propone usar como *Host* el nombre de nuestro dominio, por ejemplo `diegofrayo.com`. Yo **NO** usé el nombre de mi dominio como *Host* de los **Registros A**, en vez de esto, usé el simbolo `@`.

  ![Creando un Registro A](/blog/images/posts/conectando-un-proyecto-de-firebase-con-un-dominio-de-go-daddy/1.png "Creando un Registro A")

  La configuración de nuestro dominio en **Go Daddy** debería quedar de la siguiente manera:

  ![Configuración de nuestro dominio](/blog/images/posts/conectando-un-proyecto-de-firebase-con-un-dominio-de-go-daddy/2.png "Configuración de nuestro dominio")

5. Ahora debemos esperar un par de horas hasta que los cambios surtan efecto. *Yo esperé alrededor de 4 horas*.

Después de ejecutar estos pasos, ya tendremos nuestro dominio de **Go Daddy** conectado con nuestro proyecto de **Firebase.**


## Desplegando nuestro proyecto en Firebase Hosting

Para desplegar nuestro sitio o aplicación en **Firebase Hosting**, debemos seguir los siguientes pasos:

1. Instalar **firebase-tools** `npm install -g firebase-tools`.

2. Crear un directorio para nuestro proyecto e iniciarlo.

  ```
  mkdir project-name
  cd project-name
  firebase init
  ```

  Cuando ejecutemos el tercer comando, tendremos que iniciar sesión con nuestra cuenta de **Google**.

3. Después de iniciar el proyecto, deberíamos tener la siguiente estructura de archivos.

  ![Estructura de nuestro proyecto](/blog/images/posts/conectando-un-proyecto-de-firebase-con-un-dominio-de-go-daddy/3.png "Estructura de nuestro proyecto")

  En la carpeta `public` debemos almacenar todos los assets de nuestra aplicación o sitio.

  El archivo `firebase.json` queda de la siguiente manera:

  ```
    {
      "hosting": {
        "public": "public",
        "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
      }
    }
  ```

  Podemos configurar mejor este archivo, por ejemplo, definiendo redirecciones, rewrites y otras cosas interesantes. En este [enlace](https://firebase.google.com/docs/hosting/full-config?authuser=0) pueden conocer un poco más sobre la configuración de este archivo.

5. Para probar nuestro sitio o aplicación de manera local, debemos usar el comando `firebase serve`, el cual crea un servidor HTTP al que podemos acceder desde [http://localhost:5000](http://localhost:5000).

6. Para desplegar nuestro sitio o aplicación en **Firebase Hosting**, simplemente debemos ejecutar el comando `firebase deploy`.


## Para finalizar

Cuando estén creando los **Registros TXT y A** en **Go Daddy**, es necesario que sean pacientes y esperen un tiempo prudente mientras los cambios surten efecto, yo tuve que esperar un par de horas hasta que la conexión entre **Firebase** y **Go Daddy** fuera válida.

Como pueden ver, usando **Firebase Hosting** podemos alojar de manera fácil y simple un proyecto web en la nube, además de obtener un certificado SSL gratis. Yo uso este servicio para alojar mi sitio web `diegofrayo.com`.

Espero que les haya servido este tutorial, hasta la próxima...
