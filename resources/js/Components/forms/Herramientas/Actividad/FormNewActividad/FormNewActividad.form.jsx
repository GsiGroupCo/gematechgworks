import * as Yup from 'yup';

export function initialValue() {
  return {
    Responsable  :'',
    Descripcion  :'',
    Ubicacion    :''
  };
}

export function validationSchema() {
  return Yup.object({    
    Responsable : Yup.string().required(' El responsable es requerido '),
    Descripcion : Yup.string().required(' La descripcion es requerida '),
    Ubicacion   : Yup.string().required(' La ubicacion es requerida ')
 });
}
