import * as Yup from 'yup';

export function initialValue() {
  return {
    Responsable :'',
    Actividad   :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    Responsable : Yup.string().required(' El responsable es requerido '),
    Actividad : Yup.string().required(' La actividad es requerida ')
 });
}
