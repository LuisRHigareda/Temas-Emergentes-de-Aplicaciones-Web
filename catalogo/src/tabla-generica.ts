import estilos from './tabla-generica.css?raw';

// Cada columna indica qué dato usar y qué título mostrar.
export interface ColumnaTabla {
    clave: string;
    titulo: string;
}

// Las filas pueden contener diferentes tipos de datos.
export type FilaTabla =
    Record<string, string | number>;

export class TablaGenerica extends HTMLElement {
    private _columnas: ColumnaTabla[] = [];
    private _filas: FilaTabla[] = [];

    constructor() {
        super();

        // La tabla tiene su propio Shadow DOM.
        this.attachShadow({
            mode: 'open',
        });
    }

    connectedCallback() {
        this.render();
    }

    // Usamos propiedades porque columnas es un arreglo.
    set columnas(valor: ColumnaTabla[]) {
        this._columnas = valor;
        this.render();
    }

    get columnas() {
        return this._columnas;
    }

    // Las filas también llegan como arreglo.
    set filas(valor: FilaTabla[]) {
        this._filas = valor;
        this.render();
    }

    get filas() {
        return this._filas;
    }

    private render() {
        if (!this.shadowRoot) {
            return;
        }

        const encabezados =
            this._columnas
                .map(
                    (columna) =>
                        `<th>${columna.titulo}</th>`,
                )
                .join('');

        // Si no hay registros mostramos "Sin datos".
        const filas =
            this._filas.length === 0
                ? `
          <tr>
            <td
              class="sin-datos"
              colspan="${this._columnas.length}">
              Sin datos
            </td>
          </tr>
        `
                : this._filas
                    .map(
                        (fila) => `
                <tr>
                  ${this._columnas
                                .map(
                                    (columna) =>
                                        `<td>${fila[columna.clave] ?? ''
                                        }</td>`,
                                )
                                .join('')}
                </tr>
              `,
                    )
                    .join('');

        this.shadowRoot.innerHTML = `
      <style>
        ${estilos}
      </style>

      <div class="contenedor">
        <table>
          <thead>
            <tr>
              ${encabezados}
            </tr>
          </thead>

          <tbody>
            ${filas}
          </tbody>
        </table>
      </div>
    `;
    }
}

if (!customElements.get('tabla-generica')) {
    customElements.define(
        'tabla-generica',
        TablaGenerica,
    );
}