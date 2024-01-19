import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre        : '',
    Descripcion   : '',
    Tipo          : '',
    categoria_id : ''
  };
}

export function validationSchema() {
  return Yup.object({    
    categoria_id : Yup.string().required(' La categoria es requerida '),
    nombre : Yup.string().required(' El nombre es requerido '),
    Descripcion : Yup.string().required(' La descripcion es requerida '),
    Tipo   : Yup.string().required(' El Tipo es requerido ')
 });
}
