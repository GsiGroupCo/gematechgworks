import * as Yup from 'yup';

export function initialValue(LastOmas, Tipe) {
  return {
    taqom: '',
    taqActivos:'',
    taqMantenimiento: '',
    Responsable: '',
    Descripcion:'',
    Tipo: Tipe ? Tipe : '', 
    Prioridad:'',
    LastOm:LastOmas
  };
}

export function validationSchema() {
  return Yup.object({    
    taqom: Yup.string().required('La OM es requerida'),
    taqActivos: Yup.string().required('El Activo es requerido'),
    taqMantenimiento: Yup.string().required('El Mantenimiento es requerido'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Descripcion:Yup.string().required('La Descripcion es requerida'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Prioridad:Yup.string().required('La Prioridad es requerida'),
 });
}
