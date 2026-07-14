---
id: TRAM-HOGAR-SEGURO-2000
titulo: Emisión de Hogar Seguro 2000
version: 1.0
estado: borrador
workflow: WF-CAD-REV-DIG-FIN
roles:
  - ROLE-CAD
  - ROLE-REVISION
  - ROLE-DIGITACION
  - ROLE-FINIQUITO
documentos:
  - DOC-SOLICITUD-HOGARSEG-P1
  - DOC-SOLICITUD-HOGARSEG-P2
  - DOC-SOLICITUD-HOGARSEG-P3
  - DOC-SOLICITUD-HOGARSEG-P4
  - DOC-COTIZACION-HOGAR
  - DOC-PERFECCIONAMIENTO
  - DOC-DEBER-INFORMACION
sistemas_relacionados:
  - Pricose
  - INS
ultima_revision: 2026-07-13
---

# Emisión de Hogar Seguro 2000

## 1. Resumen

El trámite de **Emisión de Hogar Seguro 2000** permite la emisión por ROL-DIGITACION.

El trámite ingresa como una **solicitud** al ROL-CAD **CAD - Centro de Atención Digital**. CAD valida la documentación recibida, extrae datos relevantes y crea el trámite en el sistema.

## 2. ROL-CAD primer paso
El sistema muestra los documentos faltantes en caso de que no se hayan adjuntados los documentos requeridos. CAD puede solicitar que se complete la documentación y mantener la solicitud en espera.

Si los documentos minimos requeridos están presentes se hace una revisón de los datos extraídos con el **asistente para crear tramites** y se valida la consistencia de la información.

ROL-CAD debe completar los datos faltantes.

- ➜ **ENVÍA** a ROL-REVISION en el resto de los casos.

## 3 ROL-REVISION, segundo paso Revisión 

- Si no existe DOC-COTIZACION-HOGAR, el revisor debe cotizar y subir el documento. El tramite se ➜ **ENVÍA** al sistema para ser procesado y derivado nuevamente a ROL-REVISION cuando esté listo.

ROL-REVISION valida la información técnica.

- ➜ **ENVÍA** a ROL-DIGITACION para que se digite la póliza en los sistemas del INS o para realizar correcciones.
- ➜ **ENVÍA** a ROL-FINIQUITO si la póliza ya fue digitada.
- ↩ **DEVUELVE** a ROL-CAD si detecta inconsistencias, con comentarios para que el revisor haga las correcciones necesarias.
  - Los tramites devueltos a ROL-CAD quedan en **Pendientes** mientras CAD realiza su trabajo.

## 4. ROL-DIGITACION, cuarto paso Digitación 
Digita la póliza en los sistemas del INS, debe ingresar el **número de póliza**.

- ➜ **ENVÍA** a ROL-REVISION para validación final.
- ↩ **DEVUELVE** a ROL-REVISION si detecta inconsistencias, con comentarios para que el revisor haga las correcciones necesarias.

## 5 ROL-REVISION, Revisión final

ROL-REVISION valida la información digitada y la compara con la información del sistema.

- ➜ **ENVÍA** a ROL-FINIQUITO si la póliza ya fue digitada.
- ↩ **DEVUELVE** a ROL-CAD si detecta inconsistencias, con comentarios para que el revisor haga las correcciones necesarias.
  - Los tramites devueltos a ROL-CAD quedan en **Pendientes** mientras CAD realiza su trabajo.

## 6. ROL-FINIQUITO

Lee la póliza vía webservice y la carga en SIP.

Se realizan validaciones automáticas.
En caso de no pasar las validaciones, ↩ **DEVUELVE** a ROL-REVISION para que se hagan las correcciones necesarias.

## 6. Diagrama del flujo 1 a 5 para usuarios

```mermaid
flowchart TD
  A["1. ROL-CAD recibe la solicitud"] --> B{"Documentación mínima completa?"}
  B -->|"No"| C["Devolver para completar documentos"]
  B -->|"Sí"| D["ROL-CAD completa datos"]

  D --> F["ROL-REVISION"]
    
  F --> J{"¿Revisión aprobada?"}
  J -->|"No"| C
  J -->|"Sí"| H["ROL-DIGITACION digita póliza"]

  H --> K{"¿Digitación correcta?"}
  K -->|"No"| F
  K -->|"Sí"| R["ROL-REVISION revisión final"]
  
  R --> S{"¿Revisión aprobada?"}
  S -->|"No"| F
  S -->|"Sí"| I["ROL-FINIQUITO"]

  I --> N["Validar automáticamente y cargar en SIP"]
  N --> O["Trámite finalizado"]
```

## 7. Documentos requeridos

| Orden | Documento | Código | Obligatorio | Responsable de validación | Observaciones |
|---:|---|---|---|---|---|
| 1 | Solicitud de hogar - parte 1 | DOC-SOLICITUD-HOGARSEG-P1 | Sí | ROL-CAD | Documento base del trámite |
| 2 | Solicitud de hogar - parte 2 | DOC-SOLICITUD-HOGARSEG-P2 | Sí | ROL-CAD | Documento base del trámite |
| 3 | Solicitud de hogar - parte 3 | DOC-SOLICITUD-HOGARSEG-P3 | Sí | ROL-CAD | Documento base del trámite |
| 4 | Solicitud de hogar - parte 4 | DOC-SOLICITUD-HOGARSEG-P4 | Sí | ROL-CAD | Documento base del trámite |
| 5 | Perfeccionamiento | DOC-PERFECCIONAMIENTO | Condicional | ROL-CAD | Se utiliza para el cierre del trámite |
| 6 | Deber de información | DOC-DEBER-INFORMACION | Condicional | ROL-CAD | Se utiliza para el cierre del trámite |
| 7 | Cotización | DOC-COTIZACION-HOGAR | Condicional | ROL-CAD / ROL-REVISION | Si no viene, puede cargarla revisión |

## 8. Datos del trámite

---

# 5. Campos actuales del trámite

Los campos se documentan usando el **nombre actual del campo**, la **sección del formulario** y el **tipo de dato** informado en el archivo de campos.

## 5.1 Datos generales de la solicitud

| Sección | Campo actual | Label | Tipo de dato | Uso |
|---|---|---|---|---|
| FECHA DE SOLICITUD | `Fecha` | Fecha | Date | Fecha de ingreso o firma de solicitud |
| TIPO DE TRAMITE | `TIPOTRAMITE` | Tipo | List | Debe corresponder a Emisión |
| TIPO DE TRAMITE | `PolizaMadre` | Póliza Colectiva | Text | Aplica si pertenece a póliza colectiva |
| TIPO DE TRAMITE | `Poliza` | Poliza | Text | Número de póliza si corresponde |

## 5.3 Datos del asegurado

| Sección | Campo actual | Label | Tipo de dato | Uso |
|---|---|---|---|---|
| DATOS DEL ASEGURADO | `Asegurado.Nombre` | Nombre o Razón social | Text | Identificación del asegurado |
| DATOS DEL ASEGURADO | `Asegurado.TIpoIdentificacion` | Tipo de Identificación | List | Debe tomarse de catálogo del sistema |
| DATOS DEL ASEGURADO | `Asegurado.Identificacion` | Identificación | Text | Número de identificación |
| DATOS DEL ASEGURADO | `Asegurado.Email` | Correo Electrónico | Email | Medio de contacto |
| DATOS DEL ASEGURADO | `Asegurado.Domicilio` | Domicilio | Text | Dirección |
| DATOS DEL ASEGURADO | `Asegurado.Provincia` | Provincia | Text | Ubicación |
| DATOS DEL ASEGURADO | `Asegurado.Canton` | Cantón | Text | Ubicación |
| DATOS DEL ASEGURADO | `Asegurado.Distrito` | Distrito | Text | Ubicación |
| DATOS DEL ASEGURADO | `Asegurado.Telefono` | Teléfono | Phone | Teléfono principal |
| DATOS DEL ASEGURADO | `Asegurado.Telefono2` | Teléfono2 | Phone | Teléfono secundario |
| DATOS DEL ASEGURADO | `Asegurado.Notificacion` | Notificar | List | Tomador o asegurado |
| DATOS DEL ASEGURADO | `Asegurado.MedioNotificacion` | Notificar vía | List | Domicilio, teléfono, correo, apartado postal o fax |

## 5.9 Prima y observaciones

| Sección | Campo actual | Label | Tipo de dato | Uso |
|---|---|---|---|---|
| PRIMA DEL SEGURO | `Prima.Subtotal` | Subtotal | Number | Prima antes de ajustes |
| PRIMA DEL SEGURO | `Prima.FactorExperiencia` | Experiencia Siniestral | Number | Factor de experiencia |
| PRIMA DEL SEGURO | `Prima.IVA` | Impuestos IVA | Number | Impuestos |
| PRIMA DEL SEGURO | `Prima` | Prima Total | Number | Prima total |
| OBSERVACIONES | `Observaciones` | Observaciones | Text | Comentarios generales |

## 11. Pasos operativos por rol

### 11.1 CAD

#### Entrada

- Solicitud inicial.
- Documentos adjuntos.
- Datos capturados o extraídos automáticamente.

#### Tareas

1. Cargar documentos.
2. Validar documentos requeridos.
3. Validar consistencia de datos.
4. Validar consistencia de documentos.
5. Crear trámite.
6. Completar datos faltantes.
7. Enviar a ROL-TRAMITES

#### Salidas posibles

| Resultado | Próximo rol |
|---|---|
| Documentación incompleta | Agente |
| Documentación completa | ROL-REVISION |
| Requiere tratamiento especial | ROL-TRAMITES |
| Puede digitarse | ROL-DIGITACION |
| Puede finalizarse | ROL-FINIQUITO |

### 11.2 Revisión

#### Entrada

- Trámite creado por CAD.
- Documentos validados.
- Datos extraídos.
- Alertas de reglas.

#### Tareas

1. Completar cotización si no fue adjuntada.
2. Validar información técnica.
3. Validar interés asegurable.
4. Informar prima deseada.
5. Completar emisión desde / hasta.
6. Completar tipo y código de contrato.
7. Enviar a digitación.

#### Salidas posibles

| Resultado | Próximo rol |
|---|---|
| Falta documentación | Agente / ROL-CAD |
| Requiere sede o trámite especial | ROL-TRAMITES |
| Aprobado para digitar | ROL-DIGITACION |

### 11.3 Digitación

#### Entrada

- Datos ordenados del sistema.
- Indicaciones del revisor.
- Alertas aplicables.

#### Tareas

1. Tomar datos desde el sistema.
2. Cargar datos en sistemas del INS.
3. Digitar la póliza.
4. Registrar resultado.
5. Enviar a revisión final.

#### Salidas posibles

| Resultado | Próximo rol |
|---|---|
| Póliza digitada | ROL-REVISION |
| Error detectado | ROL-DIGITACION |
| Requiere aclaración | ROL-REVISION |

### 11.4 Revisión final

#### Entrada

- Póliza digitada.
- Datos del sistema.
- Condiciones de póliza.

#### Tareas

1. Validar que la digitación sea correcta.
2. Verificar póliza en sistemas del INS.
3. Comparar datos emitidos contra datos del sistema.
4. Registrar condiciones.
5. Enviar a finiquito si corresponde.

#### Salidas posibles

| Resultado | Próximo rol |
|---|---|
| Digitación incorrecta | ROL-DIGITACION |
| Datos no coinciden | ROL-REVISION |
| Datos correctos | ROL-FINIQUITO |

### 11.5 Finiquito

#### Entrada

- Póliza verificada.
- Datos coincidentes.
- Condiciones registradas.

#### Tareas

1. Generar finiquito.
2. Cerrar trámite.
3. Dejar trazabilidad del cierre.

## 12. Alertas del sistema

| Código | Mensaje | Condición | Rol visible |
|---|---|---|---|
| ALERT-VIGENCIA-CORTO-PLAZO | La vigencia es de corto plazo. Revisar envío a sede. | Vigencia = Corto Plazo | ROL-CAD / ROL-REVISION |
| ALERT-VEHICULO-MODIFICADO | Vehículo modificado o hecho a medida. Requiere revisión especial. | Vehículo modificado = Sí | ROL-CAD / ROL-REVISION |
| ALERT-EXONERADO | Vehículo exonerado. Validar forma de aseguramiento. | Exonerado = Sí | ROL-DIGITACION |
| ALERT-EXTRA-PRIMA | Aplica extra prima en repuestos. Validar digitación. | Extra prima = Sí | ROL-DIGITACION |
| ALERT-ACREEDOR | El trámite posee acreedor. Completar datos correspondientes. | Acreedor = Sí | ROL-DIGITACION |
| ALERT-BENEFICIARIO | El trámite posee beneficiario. Completar datos correspondientes. | Beneficiario = Sí | ROL-DIGITACION |

## 13. Observaciones funcionales

- El sistema debe permitir devolución al agente cuando falten requisitos.
- El sistema debe permitir devolución a CAD cuando el trámite no pueda realizarse desde digitación.
- Las devoluciones deberían manejarse con un modelo híbrido:
  - motivo tipificado;
  - observación libre;
  - documentos o datos requeridos.
- Las reglas deben quedar registradas con código estable.
- Las alertas deben ser visibles por rol y por etapa.
- El sistema debería guardar trazabilidad de:
  - usuario;
  - rol;
  - fecha;
  - acción;
  - regla aplicada;
  - destino del trámite.


## 14. Historial de cambios

| Versión | Fecha | Autor | Cambio | En Producción |
|---|---|---|---|---|
| 1.0 | 2026-07-14 | Equipo funcional | Primera versión estandarizada | No |

