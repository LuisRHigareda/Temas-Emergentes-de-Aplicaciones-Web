import estilos from './alerta-app.css?raw';

type TipoAlerta =
    | 'exito'
    | 'aviso'
    | 'error';

export class AlertaApp extends HTMLElement {

    // Observamos el atributo tipo.
    static get observedAttributes() {
        return ['tipo'];
    }

    constructor() {
        super();

        this.attachShadow({
            mode: 'open',
        });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    private render() {
        if (!this.shadowRoot) {
            return;
        }

        const tipo =
            this.getAttribute('tipo') ??
            'aviso';

        const tiposValidos:
            TipoAlerta[] = [
                'exito',
                'aviso',
                'error',
            ];

        const clase =
            tiposValidos.includes(
                tipo as TipoAlerta,
            )
                ? tipo
                : 'aviso';

        this.shadowRoot.innerHTML = `
      <style>
        ${estilos}
      </style>

      <div class="alerta ${clase}">
        <span>
          <slot></slot>
        </span>

        <button
          type="button"
          aria-label="Cerrar">
          ×
        </button>
      </div>
    `;

        const boton =
            this.shadowRoot
                .querySelector('button');

        boton?.addEventListener(
            'click',
            () => {

                // Avisamos que la alerta fue cerrada.
                this.dispatchEvent(
                    new CustomEvent(
                        'alerta-cerrada',
                        {
                            detail: {
                                tipo: clase,
                            },
                            bubbles: true,
                            composed: true,
                        },
                    ),
                );

                this.hidden = true;
            },
        );
    }
}

if (!customElements.get('alerta-app')) {
    customElements.define(
        'alerta-app',
        AlertaApp,
    );
}