import * as Yup from 'yup';

export function initialValue(Cargo) { 
  return { 
    cargo :Cargo[0].cargo,
    descripcion :Cargo[0].descripcion,
  };
}

export function validationSchema() {
  return Yup.object({    
    cargo       : Yup.string().required(' El Cargo es requerido '),
    descripcion : Yup.string().required(' La Descripcion es requerida ')
 });
}
