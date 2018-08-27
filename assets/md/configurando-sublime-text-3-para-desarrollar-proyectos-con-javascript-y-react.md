En este tutorial quiero mostrar como configurar **Sublime Text 3** para facilitar el desarrollo de proyectos usando **JavaScript** y **React**.


## Requisitos

En mi computador cuento con el siguiente Software:

* [nvm](https://github.com/creationix/nvm)
* Node.js 8.6.0
* Sublime Text 3.1.1 Build 3176
* [Package Control](https://packagecontrol.io)
* mac OS High Sierra 10.13.5


## Configurando ESLint

Para configurar **ESLint**, hay que seguir los siguientes pasos:

1. Instalar los siguientes packages en **Sublime Text**:

   > * [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)
   > * [SublimeLinter-eslint](https://packagecontrol.io/packages/SublimeLinter-eslint)
   > * [SublimeLinter-contrib-eslint_d](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint_d)

2. Instalar **ESLint** de manera global `npm install -g eslint`.

3. Configurar el package **SublimeLinter** de la siguiente manera:

```
// SublimeLinter Settings - User
{
  "paths": {
    "linux": [],
    "osx": [
      "/users/diegofrayo/.nvm/versions/node/v8.6.0/bin"
    ],
    "windows": []
  },
  "linters": {
    "eslint": {
      "disable": true,
      "env": {
        "PATH": "/users/diegofrayo/.nvm/versions/node/v8.6.0/bin"
      }
    },
    "stylelint": {
      "disable": true,
      "env": {
        "PATH": "/users/diegofrayo/.nvm/versions/node/v8.6.0/bin"
      }
    }
  }
}
```

> Cabe decir que la ubicación de **Node.js** en mi computador es `/users/diegofrayo/.nvm/versions/node/v8.6.0/bin`, ya que yo uso **nvm.**

Además, por lo general yo desactivo **ESLint** de manera global y solo lo activo para ciertos proyectos. Esto lo hago porque yo no uso **ESLint** en todos mis proyectos, entonces, si lo dejo activado globalmente, cuando abra un archivo **JavaScript** de algún proyecto que no use **ESLint**, **Sublime Text** lanzaría un molesto error en su consola. Aquí dejo un ejemplo de la configuración de uno de mis proyectos en el que hago uso de **ESLint.**

```
// config.sublime-project
{
  "folders": [{
    "path": "."
  }],
  "settings": {
    "SublimeLinter.linters.eslint.disable": false,
    "SublimeLinter.linters.stylelint.disable": false
  }
}
```

Con la anterior configuración, **Sublime Text** ya debería tener activado **ESLint** para analizar nuestro código de manera automática, tal como se ve en la siguiente imagen.

![ESLint funcionando en Sublime Text 3](/blog/images/posts/configurando-sublime-text-3-para-desarrollar-proyectos-con-javascript-y-react/1.png 'ESLint funcionando en Sublime Text 3')


## Configurando Prettier

Para configurar **Prettier**, hay que seguir los siguientes pasos:

1. Instalar el siguiente package en **Sublime Text**:

   > * [JsPrettier](https://packagecontrol.io/packages/JsPrettier)

2. Instalar **Prettier** de manera global `npm install -g prettier`.

3. Configurar el package **JsPrettier** de la siguiente manera:

```
// JsPrettier Settings - User
{
  "node_path": "/users/diegofrayo/.nvm/versions/node/v8.6.0/bin/node",
  "prettier_cli_path": "/users/diegofrayo/.nvm/versions/node/v8.6.0/bin/prettier",
  "auto_format_on_save": false,
  "prettier_options": {
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "parser": "flow",
    "printWidth": 100,
    "singleQuote": true,
    "semicolons": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "useTabs": false
  }
}
```

> Es necesario actualizar los valores de los atributos `node_path` y `prettier_cli_path` con la ubicación de los archivos binarios de **Node.js** almacenados en nuestro computador.

También pueden configurar **JsPrettier** a nivel de proyecto. Por ejemplo, yo por lo general desactivo la opción `auto_format_on_save` de manera global y solo la habilito para ciertos proyectos, tal como se puede ver en la siguiente configuración:

```
// config.sublime-project
{
  "folders": [{
    "path": "."
  }],
  "settings": {
    "tab_size": 2,
    "translate_tabs_to_spaces": true,
    "js_prettier": {
      "auto_format_on_save": true,
      "prettier_options": {
        "printWidth": 120,
        "singleQuote": true,
        "tabWidth": 2,
        "useTabs": false,
        "trailingComma": "es5"
      }
    }
  }
}
```

Por otro lado, también se personalizar el atajo de teclado necesario para ejecutar **JsPrettier** en algún archivo que se esté editando. Para esto, hay que añadir el siguiente objeto a la configuración de los atajos de teclado _(Key Bindings o Keyboard Shortcuts)_ de **Sublime Text.**

```
{
  "keys": ["ctrl+shift+7"],
  "command": "js_prettier",
  "context": [{
    "key": "selector",
    "operator": "equal",
    "operand": "source.jsx,source.js"
  }]
}
```


## Configurando Emmet

**Emmet** es un package que ayuda a escribir código `HTML` y `CSS` de manera rápida, ya que contiene algunos snippets que nos ayudan a generar código de una forma muy simple. En este [enlace](https://emmet.io/) se puede conocer un poco más sobre este package. Por lo general, este package se usa para escribir código en archivos `HTML`, pero tambien es muy útil usarlo para escribir código en archivos `JSX`. A continuación, dejo los pasos necesarios para poder usar **Emmet** en archivos `JSX`.

1. Instalar los siguientes packages en **Sublime Text**:

   > * [Emmet](https://packagecontrol.io/packages/Emmet)
   > * [RegReplace](https://packagecontrol.io/packages/RegReplace)
   > * [Chain of Command](https://packagecontrol.io/packages/Chain%20of%20Command)

2. Añadir el siguiente objeto a la configuración de los atajos de teclado _(Key Bindings o Keyboard Shortcuts)_ de **Sublime Text**.

```
  {
    "keys": ["tab"],
    "command": "expand_abbreviation_by_tab",

    // put comma-separated syntax selectors for which
    // you want to expandEmmet abbreviations into "operand" key
    // instead of SCOPE_SELECTOR.
    // Examples: source.js, text.html - source
    "context": [{
        "operand": "source.js,source.html,source.jsx",
        "operator": "equal",
        "match_all": true,
        "key": "selector"
      },

      // run only if there's no selected text
      {
        "match_all": true,
        "key": "selection_empty"
      },

      // don't work if there are active tabstops
      {
        "operator": "equal",
        "operand": false,
        "match_all": true,
        "key": "has_next_field"
      },

      // don't work if completion popup is visible and you
      // want to insert completion with Tab. If you want to
      // expand Emmet with Tab even if popup is visible --
      // remove this section
      {
        "operand": false,
        "operator": "equal",
        "match_all": true,
        "key": "auto_complete_visible"
      }, {
        "match_all": true,
        "key": "is_abbreviation"
      }
    ]
  }
```

Siguiendo los anteriores pasos, **Sublime Text** ya debería quedar configurado para permitir escribir código `HTML` usando los snippets y herramientas de autocompletado de **Emmet** en archivos `JSX`.


## Packages recomendados

Aquí dejo una lista con algunos packages que me parecen útiles.

* [A File Icon](https://packagecontrol.io/packages/A%20File%20Icon)
* [ayu (theme)](https://packagecontrol.io/packages/ayu)
* [Babel](https://packagecontrol.io/packages/Babel)
* [Bracket Highlighter](https://packagecontrol.io/packages/BracketHighlighter)
* [Color Highlighter](https://packagecontrol.io/packages/Color%20Highlighter)
* [EditorConfig](https://packagecontrol.io/packages/EditorConfig)
* [HTMLAttributes](https://packagecontrol.io/packages/HTMLAttributes)
* [HTMLBeautify](https://packagecontrol.io/packages/HTMLBeautify)
* [Markdown Highlighting](https://packagecontrol.io/packages/MarkdownHighlighting)


## Para finalizar

Tener estos packages configurados en nuestro editor, se convierte en una buena ayuda al momento de programar.

Espero que les haya servido este tutorial, hasta la próxima...
