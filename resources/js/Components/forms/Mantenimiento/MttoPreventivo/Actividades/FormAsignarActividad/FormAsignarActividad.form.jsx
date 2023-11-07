import * as Yup from 'yup';

export function initialValue() {
  return {
    Responsable :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    Responsable : Yup.string().required(' El responsable es requerido '),
 });
}
