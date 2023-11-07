import * as Yup from 'yup';

export function initialValue() {
  return {
    taqempresa:'',
    id_tipo   :'',
    nombre    :'',
    serial    :'',
    area      :'',
    horasuso  :'',
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
