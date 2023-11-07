import * as Yup from 'yup';

export function initialValue(Actividad) {
  return {
    fecha          :Actividad.fecha ? new Date(Actividad.fecha) : null,
    frecuencia     :Actividad.frecuencia,
    taqresponsable :Actividad.taqresponsable,
    actividad      :Actividad.actividad
  };
}

export function validationSchema() {
  return Yup.object({
    fecha          : Yup.date().required('La fecha es requerida'),
    frecuencia     : Yup.string().required('La frecuencia es requerida'),
    taqresponsable : Yup.string().required('El responsable es requerido'),
    actividad      : Yup.string().required('La actividad es requerida')
 });
}
