---
title: "Por qué construí mi propio tutor"
date: 2026-09-22
description: "Sobre el exceso de información, los cursos que ya no hacen falta, y por qué el conocimiento no debería tener precio."
tags: ["programación", "IA", "open source", "aprendizaje"]
---

Llevo semanas construyendo una cosa rara: un tutor que vive dentro de un repositorio. No es una app ni un curso. Son unos cuantos ficheros de texto que le dicen a un modelo de IA cómo enseñarte algo, y un fichero más donde se guarda qué ya sabes.

Está en [GitHub](https://github.com/AlejandroVegaFullstackDev/ai-skill-coach), es MIT, y funciona para cualquier habilidad. Lo estoy usando para inglés y para guitarra.

Este post no es sobre cómo funciona. Es sobre por qué lo hice.

## El problema no es la falta de información

Hace veinte años, aprender algo difícil requería acceso. A una biblioteca, a una universidad, a alguien que supiera.

Ese problema se resolvió. Hoy está todo. Literalmente todo: documentación, papers, foros, vídeos, gente explicando en directo cómo hacer exactamente lo que quieres hacer.

Y aun así la gente no aprende. Yo incluido.

Porque el problema se movió. Ya no es acceder a la información, es **saber cuál sirve**. Abres una búsqueda sobre cualquier cosa y te salen doscientos resultados: quince buenos, cincuenta mediocres, y el resto contenido escrito para posicionar, no para enseñar. Blogs que repiten lo mismo con otras palabras. Tutoriales de 2019 que ya no aplican. Gente segura de sí misma diciendo cosas falsas.

Investigar bien es una habilidad. No te la enseñan en ningún sitio, y sin ella el exceso de información es tan paralizante como la falta.

Eso es lo primero que hace la herramienta: buscar por ti, y **descartar**. No te trae veinte enlaces. Lee, evalúa qué tiene autoridad, contrasta lo que se contradice, y destila lo poco que sirve. Lo que no pasa el filtro se descarta, y te dice por qué.

## Los cursos eran la respuesta a una pregunta que ya no existe

Platzi, Udemy, Coursera. Yo he pagado esas plataformas. Tengo un certificado de Platzi ahora mismo en mi CV.

Y hacían falta. De verdad. La estructura que daban era el producto: alguien que sabía del tema ponía los conceptos en orden, decidía qué enseñar primero y qué después, y te ahorraba el trabajo de descubrirlo por tu cuenta. Esa curaduría valía dinero porque era escasa. Era el trabajo de una persona con experiencia, y las personas con experiencia tienen un tiempo limitado.

Eso se acabó.

Un modelo puede investigar un tema en minutos mejor que yo en una semana. Puede leer cincuenta fuentes, ver dónde se contradicen, e identificar en qué punto concreto se atasca la gente que aprende eso. Puede construir un roadmap y **rehacerlo cuando falla**, que es lo que un curso grabado no puede hacer nunca.

Porque ese es el otro problema del curso: es lineal y es igual para todos. Empieza en la lección 1 aunque tú ya sepas las primeras cinco. Asume que tienes una hora libre y ganas. Y cuando te atascas en el minuto 40 de la clase 12, el vídeo sigue.

Yo abandoné tres intentos de aprender inglés. Siempre por lo mismo: el curso volvía a empezar por el verbo *to be*. Ya sabía el verbo *to be*. Nunca llegué a la parte donde estaba mi problema real, que era hablar sin congelarme.

Por eso lo primero que escribí de esta herramienta fue la memoria. Lo que ya demostraste que sabes **no se vuelve a enseñar**. Nunca. Suena obvio y es exactamente lo que ninguna plataforma hace, porque ninguna plataforma te conoce.

## De dónde salió esto

No fue una idea original. Estaba usando un proyecto llamado [ai-job-search](https://github.com/MadsLorentzen/ai-job-search) para buscar trabajo: un repositorio con comandos que evalúan una oferta, adaptan tu CV y te preparan la entrevista.

Lo que me voló la cabeza no fue lo que hacía, sino **cómo estaba montado**. No era una app ni un SaaS. Eran ficheros de texto. Instrucciones escritas para un agente, en markdown, que cualquiera puede leer, entender y cambiar. Sin servidor, sin cuenta, sin suscripción. Clonas y funciona.

Y pensé: si esto funciona para buscar trabajo, funciona para aprender cualquier cosa.

Así que lo copié descaradamente. Misma anatomía: comandos que hacen un paso cada uno, tu perfil en ficheros, y un estado que sobrevive entre sesiones. Lo que cambia es el dominio.

## Está en TRIAL, y lo digo

No es un producto. Es la versión cero de algo que estoy usando yo mismo mientras lo construyo, y hay partes que todavía no sé si funcionan.

Prefiero decirlo a vender humo. Ya hay bastante de eso.

Lo que sí tengo claro es que va a ser open source desde el primer día. Sin versión pro, sin cuenta, sin "gratis hasta cierto límite".

## Por qué gratis

Porque yo no pagué por casi nada de lo que sé.

Aprendí leyendo respuestas de Stack Overflow escritas por gente que no iba a cobrar nada por escribirlas. Usando librerías que alguien mantiene los fines de semana. Leyendo issues de GitHub donde un desconocido explicaba, con paciencia, por qué mi error no era el que yo creía. Copiando código de repositorios de gente que nunca voy a conocer.

Toda mi carrera está construida sobre trabajo que otros regalaron.

Esto es devolver una parte pequeña. No es generosidad: es lo que corresponde.

Y hay algo que se entiende tarde: en esto **no somos competencia**. Da igual si estás por hobby o porque necesitas el dinero — yo necesito el dinero, no voy a fingir lo contrario. Seguimos siendo gente resolviendo los mismos problemas, y la única razón por la que cualquiera de nosotros puede resolver algo es que otros mil ya resolvieron las partes de abajo.

El junior que abre un issue mal escrito está sosteniendo esto igual que el senior que lo responde. Uno encuentra el fallo, el otro lo arregla. Los dos hacen falta. Es un equipo, aunque no se conozcan y aunque no se den cuenta.

## Y ahora la parte política

Creo que las plataformas de cursos de pago no deberían existir.

No porque la gente que enseña no merezca cobrar — merece cobrar, y mucho más de lo que suele cobrar. Sino porque **el conocimiento no es un producto**. Es lo único que se puede dar sin perderlo. Yo te enseño algo y sigo sabiéndolo. No hay escasez. La escasez es artificial, la pone una empresa en medio, y se llama muro de pago.

Y no es neutral. Un curso de cincuenta dólares es nada para un desarrollador en Europa y es una decisión real para un pelado en Bogotá que gana en pesos. El mismo conocimiento, el mismo esfuerzo, distinta puerta. La barrera no filtra por ganas ni por capacidad: filtra por dónde naciste.

Ya sé que suena raro viniendo de alguien con un certificado de Platzi en el CV. Lo pagué, lo usé, y me sirvió para demostrar un nivel de inglés que necesitaba demostrar. Puedo sostener las dos cosas: que me fue útil y que no debería haber hecho falta.

Sé también que las plataformas hacen cosas que un repositorio no hace. Dan una credencial que un reclutador reconoce, dan un calendario que te obliga, dan la sensación de que alguien te está esperando. Eso es real y tiene valor. Pero fíjate en que nada de eso **es el conocimiento**. Es acompañamiento y es acreditación. Se vende el acceso al saber y lo que en realidad se entrega es estructura y un papel.

Esa es la parte que se puede replicar. Y cada vez más barato.

Así que sí: esto es gratis, es MIT, y si lo mejoras no me debes nada. Cógelo, úsalo, cámbialo, móntate el tuyo. Si algún día enseñas algo que aprendiste con esto, y lo enseñas gratis, ya está pagado.

---

El repo está en [github.com/AlejandroVegaFullstackDev/ai-skill-coach](https://github.com/AlejandroVegaFullstackDev/ai-skill-coach). Funciona con Claude Code en la terminal, y también desde ChatGPT, Claude o Gemini para quien no programa.

Se agradecen issues, incluso los mal escritos.
