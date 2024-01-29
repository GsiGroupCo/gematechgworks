import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre         :'',
    Descripcion    :''
  };
}

export function validationSchema() {
  return Yup.object({    
    nombre         : Yup.string().required(' El nombre es requerida '),
    Descripcion    : Yup.string().required(' La descripcion es requerida ')
 });
}
