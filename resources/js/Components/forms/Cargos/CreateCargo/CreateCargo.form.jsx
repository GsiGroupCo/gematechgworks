import * as Yup from 'yup';

export function initialValue() {
  return { 
    cargo :'',
    descripcion :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    cargo       : Yup.string().required(' El Cargo es requerido '),
    descripcion : Yup.string().required(' La Descripcion es requerida ')
 });
}
