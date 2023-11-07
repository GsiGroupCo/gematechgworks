import * as Yup from 'yup';

export function initialValue() {
  return {
    Responsable :'',
    Actividad   :'',
    Frecuencia  :'',
    UltimoMtto  :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    Responsable : Yup.string().required(' El responsable es requerido '),
    Actividad : Yup.string().required(' La actividad es requerida '),
    Frecuencia : Yup.string().required(' La frecuencia es requerida '),
    UltimoMtto : Yup.string().required(' El ultimo mtto es requerido ')
 });
}
