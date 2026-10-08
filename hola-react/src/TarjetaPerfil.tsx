import {
    Insignia,
} from './Insignia';

interface TarjetaPerfilProps {
    nombre: string;
    carrera: string;
    semestre: number;
}

export function TarjetaPerfil({
    nombre,
    carrera,
    semestre,
}: TarjetaPerfilProps) {

    // Tomamos la primera letra de los nombres
    // para formar las iniciales
    const iniciales =
        nombre
            .split(' ')
            .map(
                (parte) =>
                    parte.charAt(0),
            )
            .join('')
            .toUpperCase();

    // De séptimo semestre en adelante
    // aparece una segunda insignia
    const avanzado =
        semestre >= 7;

    return (
        <article className="tarjeta">

            <div className="tarjeta__avatar">
                {iniciales}
            </div>

            <h2 className="tarjeta__nombre">
                {nombre}
            </h2>

            <p className="tarjeta__carrera">
                {carrera}
            </p>

            <Insignia
                texto={`${semestre}.º semestre`}
            />

            {avanzado && (
                <Insignia
                    texto="Por egresar"
                    tipo="extra"
                />
            )}

        </article>
    );
}