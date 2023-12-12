import * as Yup from 'yup';

export function initialValue() {
  return {
    Nombre       :'',
    Descripcion  :'',
    Tipo         :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    Nombre : Yup.string().required(' El nombre es requerido '),
    Descripcion : Yup.string().required(' La descripcion es requerida '),
    Tipo   : Yup.string().required(' El Tipo es requerido ')
 });
}
