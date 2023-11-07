import * as Yup from 'yup';

export function initialValue() {
  return {
    taqresponsable :'',
   taqom          :'',
    descripcion    :'',
    cantHoras	     :'',
    estado	       :'',
  };
}

export function validationSchema() {
  return Yup.object({    
    descripcion: Yup.string().required('La descripcion es requerida'),
    cantHoras:Yup.string().required('La Cantidad de horas es requerida'),
    estado:Yup.string().required('El estado requerido'),
 });
}
