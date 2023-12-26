import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre         :'',
    sistema        :'',
    componente     :'',
    frecuencia     :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    nombre         : Yup.string().required(' El nombre es requerida '),
    sistema        : Yup.string().required(' El sistema es requerida '),
    componente     : Yup.string().required(' El componente es requerida '),
    frecuencia     : Yup.string().required(' La frecuencia es requerida ')
 });
}
