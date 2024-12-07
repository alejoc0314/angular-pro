// @ts-check

// Importamos los módulos necesarios para configurar ESLint
const eslint = require("@eslint/js"); // Configuración base de ESLint
const tseslint = require("typescript-eslint"); // Configuraciones específicas para TypeScript
const angular = require("angular-eslint"); // Configuraciones específicas para proyectos Angular

// Exportamos la configuración de ESLint utilizando el API de TypeScript ESLint
module.exports = tseslint.config(
  {
    // Configuración para archivos TypeScript (*.ts)
    files: ["**/*.ts"], // Afecta todos los archivos con extensión .ts

    // Extiende configuraciones recomendadas para TypeScript, Angular y estilo de código
    extends: [
      eslint.configs.recommended, // Configuraciones generales de ESLint
      ...tseslint.configs.recommended, // Buenas prácticas recomendadas para TypeScript
      ...tseslint.configs.stylistic, // Reglas estilísticas para un código consistente
      ...angular.configs.tsRecommended, // Configuraciones específicas para Angular
    ],

    // Procesa templates inline en componentes Angular
    processor: angular.processInlineTemplates,

    // Reglas personalizadas
    rules: {
      // Reglas específicas para Angular
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute", // Las directivas deben usarse como atributos
          prefix: "app", // Prefijo obligatorio para identificar directivas del proyecto
          style: "camelCase", // Estilo de nombre en camelCase
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element", // Los componentes deben usarse como elementos HTML
          prefix: "app", // Prefijo obligatorio para componentes
          style: "kebab-case", // Estilo de nombre en kebab-case
        },
      ],

      // Reglas para mejorar la calidad del código TypeScript
      "@typescript-eslint/explicit-function-return-type": "warn", // Se recomienda declarar los tipos de retorno de funciones
      "@typescript-eslint/no-explicit-any": "error", // Prohíbe el uso de `any` para evitar tipado débil
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" }, // Se recomienda usar `type imports` para claridad y optimización
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all", // Detecta variables sin usar
          args: "after-used", // Detecta argumentos no utilizados después de ser definidos
          argsIgnorePattern: "^_", // Ignora variables que comienzan con "_"
        },
      ],
      "@typescript-eslint/array-type": [
        "error",
        { default: "array-simple" }, // Prefiere usar `T[]` en lugar de `Array<T>` por simplicidad
      ],

      // Reglas generales para consistencia en el proyecto
      "no-console": [
        "warn",
        { allow: ["warn", "error"] }, // Permite solo los métodos `console.warn` y `console.error`
      ],
      "prefer-const": "error", // Obliga a usar `const` siempre que sea posible
      "no-multiple-empty-lines": ["error", { max: 1 }], // Limita líneas vacías consecutivas a 1
      "eol-last": ["error", "always"], // Asegura que los archivos terminan con una nueva línea
      "newline-before-return": "warn", // Requiere una línea vacía antes de `return`
      "semi": ["error", "always"], // Obliga a usar punto y coma al final de cada línea

      // Reglas estilísticas para un código limpio y legible
      "indent": ["error", 2], // Usa 2 espacios para indentación
    },
  },
  {
    // Configuración para archivos HTML (*.html)
    files: ["**/*.html"], // Afecta todos los archivos con extensión .html

    // Extiende configuraciones recomendadas para plantillas Angular
    extends: [
      ...angular.configs.templateRecommended, // Buenas prácticas generales para plantillas
      ...angular.configs.templateAccessibility, // Reglas para mejorar accesibilidad en plantillas
    ],

    // Reglas personalizadas para plantillas
    rules: {
      "@angular-eslint/template/no-any": "error", // Prohíbe el uso de `any` en plantillas para mantener tipos fuertes
      "@angular-eslint/template/eqeqeq": "warn", // Obliga al uso de comparaciones estrictas (`===` en lugar de `==`)
      "@angular-eslint/template/no-negated-async": "error", // Evita negar observables directamente en plantillas
      // "@angular-eslint/template/i18n": [
      //   "warn",
      //   {
      //     checkId: true, // Requiere que los elementos visibles tengan un identificador i18n
      //     checkText: true, // Requiere internacionalización para textos visibles
      //     ignoreAttributes: ["mat-icon", "aria-label"], // Excluye atributos específicos que no requieren i18n
      //   },
      // ],
    },
  }
);
