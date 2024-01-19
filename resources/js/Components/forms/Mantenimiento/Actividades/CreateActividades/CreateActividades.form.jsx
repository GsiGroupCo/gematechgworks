import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre         :'',
    sistema        :'',
    componente     :'',
    frecuencia     :'',
    Descripcion    :''
  };
}

export function validationSchema() {
  return Yup.object({    
    nombre         : Yup.string().required(' El nombre es requerida '),
    sistema        : Yup.string().required(' El sistema es requerida '), 
    frecuencia     : Yup.string().required(' La frecuencia es requerida '),
    Descripcion    : Yup.string().required(' La descripcion es requerida ')
 });
}
