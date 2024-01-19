import * as Yup from 'yup';

export function initialValue(LastOmc, Tipe) {
  return {
    taqom: '',
    taqComponente: '',
    taqMantenimiento:'',
    Responsable: '',
    Descripcion:'',
    Tipo: Tipe ? Tipe : '', 
    Prioridad:'',
    LastOm:LastOmc
  };
}

export function validationSchema() {
  return Yup.object({    
    taqom: Yup.string().required('La OM es requerida'),
    taqComponente: Yup.string().required('El Componente es requerido'),
    taqMantenimiento: Yup.string().required('El mantenimiento es requerido'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Descripcion:Yup.string().required('La Descripcion es requerida'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Prioridad:Yup.string().required('La Prioridad es requerida'),
 });
}
