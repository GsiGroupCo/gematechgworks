import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre       :'',
    Descripcion  :'',
    Tipo         :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    nombre : Yup.string().required(' El nombre es requerido '),
    Descripcion : Yup.string().required(' La descripcion es requerida '),
    Tipo   : Yup.string().required(' El Tipo es requerido ')
 });
}
