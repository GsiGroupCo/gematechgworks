import * as Yup from 'yup';

export function initialValue() {
  return {
    taqrig: '',
    taqActivos:'',
    taqom: '',
    fechaSalida:'',
    fechaRetorno:'', 
    Prioridad:'',
    descripcion:''
  };
}

export function validationSchema() {
  return Yup.object({    
    taqrig: Yup.string().required('El Rig es requerido'), 
    taqActivos: Yup.string().required('El Activo es requerido'),
    taqom:Yup.string().required('La Orden de mantenimiento es requerida'),
    fechaSalida: Yup.string().required('La fecha de salida es requerida'),
    fechaRetorno:Yup.string().required('La fecha de retorno es requerida'),
    descripcion:Yup.string().required('La descripcion es requerida'),
 });
}
