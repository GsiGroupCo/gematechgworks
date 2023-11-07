import * as Yup from 'yup';

export function initialValue() {
  return {
    Mantenimiento:'',
    Area: '',
    Activo: '',
    Responsable: '',
    Horas_de_ultimo_mantenimiento:''
  };
}

export function validationSchema() {
  return Yup.object({
    Mantenimiento: Yup.string()
      .oneOf(['DDM', 'IDP', 'IDS', 'IHSQE','AHSQE','CONT'], 'Selecciona un Mantenimiento válido')
      .required('El Mantenimiento es requerido'),
    Area: Yup.string().required('El Area es requerida'),
    Activo: Yup.string().required('El Activo es requerido'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Horas_de_ultimo_mantenimiento:Yup.date()
  });
}
