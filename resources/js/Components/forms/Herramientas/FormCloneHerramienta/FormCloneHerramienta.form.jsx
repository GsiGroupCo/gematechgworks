import * as Yup from 'yup';

export function initialValue(Herramienta) {
  return {
    taqempresa: Herramienta[0].taqempresa,
    id_tipo   : Herramienta[0].id_tipo,
    nombre    : Herramienta[0].nombre,
    serial    : Herramienta[0].serial,
    area      : Herramienta[0].area,
    horasuso  : Herramienta[0].horasuso,
    urlImage  :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    taqempresa : Yup.string().required( 'La empresa es requerida'   ),
    id_tipo    : Yup.string().required( 'La categoria es requerido' ),
    nombre     : Yup.string().required( 'El nombre es requerido'    ),
    serial     : Yup.string().required( 'El serial es requerido'    ),
    area       : Yup.string().required( 'El area es requerida'      )
 });
}
