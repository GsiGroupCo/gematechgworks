import * as Yup from 'yup';

export function initialValue(Cargo) { 
  return {
    nombre   :'',
    cargo_id : Cargo ? Cargo : '',
    urlImage :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    nombre     : Yup.string().required(' El Nombre es requerido '),
    cargo_id   : Yup.string().required(' El Cargo es requerido ')
 });
}
