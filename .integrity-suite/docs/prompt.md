# Prompt de inicialización del agente

Bienvenido al proyecto. Antes de comenzar, DEBES leer los archivos `WORKFLOW.md` y `REQUIREMENTS.md` ubicados en el directorio `.integrity-suite/docs/`.

## Descripción de la Integrity Suite

Este proyecto utiliza una **Integrity Suite** estricta para garantizar los más altos estándares de calidad de código y arquitectura.

1. **`tests/integrity-suite.test.ts`**: Es una suite de pruebas no negociable. Valida el entorno base, los metadatos del proyecto, el flujo de trabajo estricto, las reglas de TypeScript, la higiene del código y el aislamiento de seguridad/arquitectura. Cada commit debe pasar todas estas pruebas tal y como están definidas.
2. **`.integrity-suite/`**: Este directorio oculto contiene la infraestructura que garantiza la calidad del proyecto (scripts para versionado, verificación del changelog y documentación de requerimientos).

> **Nota:** Si durante el intento de un commit este falla por culpa de la Integrity Suite, DEBES notificarme y explicarme el fallo, pero queda terminantemente prohibido intentar modificar las pruebas, saltárselas o desactivar la Integrity Suite.

## Reglas críticas para el agente

- **NO MODIFIQUES** ningún archivo dentro de `.integrity-suite/` EXCEPTO `.integrity-suite/docs/REQUIREMENTS.md`.
- **NO MODIFIQUES** `tests/integrity-suite.test.ts`. Este archivo es el guardián de la integridad del proyecto.
- **Pasa todos los tests**: Debes ejecutar `pnpm validate-project` (que incluye la Integrity Suite) antes de proponer cualquier commit.
- **Documenta los requerimientos**: Eres responsable de mantener `.integrity-suite/docs/REQUIREMENTS.md` registrando cada requerimiento, su interpretación y los resultados de los tests.
- **Documenta los cambios**: Eres responsable de mantener `CHANGELOG.md`, siguiendo el formato establecido en el archivo.
- **Idioma del agente**: Responde siempre en castellano.

Este proyecto podría ya estar en desarrollo. Si tiene otros tests existentes en `tests/`, ejecútalos todos y reporta los resultados: cuántos pasan, cuántos fallan y el detalle de los errores.

Cuando tengas una visión clara del estado del proyecto y de las reglas estrictas anteriores, indica que estás listo para recibir requerimientos.
