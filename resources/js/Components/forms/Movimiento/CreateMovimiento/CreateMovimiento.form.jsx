import * as Yup from 'yup';

export function initialValue() {
  return {
    taqrig: '', 
    fechaSalida:'',  
    descripcion:''
  };
}

export function validationSchema() {
  return Yup.object({    
    taqrig: Yup.string().required('El Rig es requerido'),  
    fechaSalida: Yup.string().required('La fecha de salida es requerida'), 
    descripcion:Yup.string().required('La descripcion es requerida'),
 });
}
