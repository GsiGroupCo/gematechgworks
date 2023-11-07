import * as Yup from 'yup';

export function initialValue() {
  return {
    Numero_Preoperacional:'',
    Area: '',
    Activo: '',
    Actividad:'',
    Responsable: '',
  };
}

export function validationSchema() {
  return Yup.object({
    Numero_Preoperacional: Yup.string()
    .oneOf(['DDM', 'IDP', 'IDS', 'IHSQE','AHSQE','CONT'], 'Selecciona un Mantenimiento válido')
    .required('El Mantenimiento es requerido'),
    Area: Yup.string().required('El Area es requerida'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Activo: Yup.string(),
    Actividad: Yup.string(),
  });
}
