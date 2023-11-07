import * as Yup from 'yup';

export function initialValue(TrabajoData) {

  console.log(TrabajoData.taqresponsable)

  return {
    taqresponsable :TrabajoData.taqresponsable,
   taqom          :TrabajoData.taqot,
    descripcion    :TrabajoData.descripcion,
    cantHoras	     :TrabajoData.cantHoras,
    estado	       :TrabajoData.estado,
  };
}

export function validationSchema() {
  return Yup.object({    
    descripcion: Yup.string().required('La descripcion es requerida'),
    cantHoras:Yup.string().required('La Cantidad de horas es requerida'),
    estado:Yup.string().required('El estado requerido'),
 });
}
