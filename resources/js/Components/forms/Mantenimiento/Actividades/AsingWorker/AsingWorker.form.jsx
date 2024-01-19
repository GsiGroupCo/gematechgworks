import * as Yup from 'yup';

export function initialValue() {
  return {
    taqresponsable:''
  };
}

export function validationSchema() {
  return Yup.object({    
    taqresponsable : Yup.string().required(' El Responsable es requerido ')
 });
}
