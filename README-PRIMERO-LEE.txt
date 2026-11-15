CRÓNICAS DE JARAICEJO — WEB + PANEL DE ADMINISTRACIÓN
====================================================

Esta carpeta contiene una primera versión funcional de la web, preparada para publicarse gratis en Netlify y conectarse a un repositorio de GitHub.

IMPORTANTE SOBRE LA OPCIÓN B
El panel utiliza Decap CMS + Netlify Identity + Git Gateway. El panel no se protege con una contraseña escrita dentro de la web: la entrada debe quedar en modo "Invite only" en Netlify y solo deben invitarse las personas autorizadas.

ANTES DE PUBLICAR
1. Crea un repositorio nuevo en GitHub llamado: cronicas-de-jaraicejo
2. Puedes usar un repositorio público o privado, según las opciones que te muestre GitHub y Netlify. La web publicada y sus fotografías serán públicas para los visitantes.
3. Sube TODOS los archivos y carpetas de esta carpeta a la raíz del repositorio (no subas la carpeta contenedora como una subcarpeta adicional).
4. Entra en https://app.netlify.com/ y regístrate con tu cuenta.
5. En Netlify elige Add new project / Import an existing project y conecta GitHub.
6. Selecciona el repositorio cronicas-de-jaraicejo. El archivo netlify.toml ya indica que la publicación se hace desde la raíz. Pulsa Deploy.
7. Cuando Netlify cree la dirección terminada en netlify.app, abre el proyecto y entra en Project configuration / Access & security / Identity (el nombre de los menús puede cambiar ligeramente).
8. Activa Identity. En Registration, selecciona Invite only. No dejes el registro abierto.
9. En Services, activa Git Gateway.
10. En Identity, invita TU PROPIO CORREO electrónico. Acepta la invitación desde tu correo y crea el acceso.
11. Abre https://TU-SITIO.netlify.app/admin/ e inicia sesión. Ya podrás editar textos, cambiar la foto principal, añadir fotos a la galería y pegar enlaces de YouTube.

CÓMO EDITAR
- Entra en tu web y añade /admin/ al final de la dirección.
- Inicia sesión.
- Abre "Contenido de la web".
- Modifica los textos o usa el botón de imagen para cambiar fotografías.
- Pulsa Guardar y después Publicar. Netlify actualizará la web al recibir el cambio.

FOTOGRAFÍA PRINCIPAL
La imagen original aportada para la portada está guardada en:
images/plaza-mayor-jaraicejo.jpg
Se usa como imagen principal y aparece también en la galería inicial.

DATOS PENDIENTES
El correo y Facebook siguen vacíos porque no se han proporcionado. Instagram sí está incluido.

NOTAS
- El plan gratuito actual de Netlify incluye un límite mensual de uso (300 créditos en el plan Free publicado actualmente); comprueba el consumo en tu panel.
- Netlify y GitHub pueden cambiar nombres de menús o condiciones de sus planes. Comprueba el panel antes de completar el alta.
- No compartas la invitación privada ni credenciales. Invita solo a personas de confianza.
- El sitio contiene textos iniciales editables. Conviene revisar los textos históricos antes de publicarlos como documentación definitiva.
