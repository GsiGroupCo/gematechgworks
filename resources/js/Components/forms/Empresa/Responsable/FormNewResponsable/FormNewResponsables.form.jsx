import * as Yup from 'yup';

export function initialValue() {
  return {
    primernombre    :'',
    segundonombre   :'',
    primerapellido  :'',
    segundoapellido :'',
    id_cargo        :'',
    urlImage        :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    primernombre   : Yup.string().required(' El Primer nombre es requerido '),
    primerapellido : Yup.string().required(' El Primer Apellido es requerido '),
    id_cargo       : Yup.string().required(' El Cargo es requerido ')
 });
}
