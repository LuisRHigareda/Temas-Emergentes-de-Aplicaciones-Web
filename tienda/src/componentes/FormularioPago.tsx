import {
  useState,
} from 'react';

import type {
  FormEvent,
} from 'react';

import type {
  Producto,
} from '../datos';

import {
  crearPedido,
} from '../servicios/pedidos.service';

interface FormularioPagoProps {
  carrito: Producto[];
  onConfirmado: () => Promise<void>;
}

export function FormularioPago({
  carrito,
  onConfirmado,
}: FormularioPagoProps) {
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const [folio, setFolio] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function pagar(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    setError('');
    setFolio('');

    if (!correo.includes('@')) {
      setError('Escribe un correo válido.');
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      setError('El teléfono debe tener 10 dígitos.');
      return;
    }

    if (carrito.length === 0) {
      setError('El carrito está vacío.');
      return;
    }

    setEnviando(true);

    try {
      const pedido =
        await crearPedido({
          correo,
          telefono,
          productos: carrito.map(
            (producto) => producto.id,
          ),
        });

      setFolio(pedido.folio);
      setCorreo('');
      setTelefono('');

      await onConfirmado();
    }
    catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'No se pudo completar el pedido.',
      );
    }
    finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <form
        className="pago"
        onSubmit={pagar}>

        <h2>Pago simulado</h2>

        <label>
          Correo
          <input
            type="email"
            value={correo}
            onChange={
              (e) =>
                setCorreo(e.target.value)
            }
          />
        </label>

        <label>
          Teléfono
          <input
            type="tel"
            value={telefono}
            maxLength={10}
            onChange={
              (e) =>
                setTelefono(e.target.value)
            }
          />
        </label>

        {
          error && (
            <p className="pago__error">
              {error}
            </p>
          )
        }

        <button
          type="submit"
          disabled={enviando}>
          {
            enviando
              ? 'Procesando...'
              : 'Pagar'
          }
        </button>
      </form>

      {
        folio && (
          <div className="confirmacion">
            Pedido confirmado. Folio: {folio}
          </div>
        )
      }
    </>
  );
}
