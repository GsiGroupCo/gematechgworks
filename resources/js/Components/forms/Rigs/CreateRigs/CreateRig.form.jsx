import * as Yup from 'yup';

export function initialValue() {
  return {
    Nombre :'',
    Taq    :'',
    Image  :''
  };
}

export function validationSchema() {
  return Yup.object({    
    Nombre : Yup.string().required(' El nombre del rig es requerido'),
    Taq    : Yup.string().required(' El taq es rquerido '),
 });
}
