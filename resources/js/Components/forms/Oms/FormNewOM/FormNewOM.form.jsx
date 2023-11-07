import * as Yup from 'yup';

export function initialValue(LastOm) {
  return {
    taqom: '',
    Empresa:'',
    Responsable: '',
    Descripcion:'',
    Tipo:'', 
    Prioridad:'',
    LastOm:LastOm
  };
}

export function validationSchema() {
  return Yup.object({    
    taqom: Yup.string().required('La OM es requerida'), 
    Responsable: Yup.string().required('El Responsable es requerido'),
    Descripcion:Yup.string().required('La Descripcion es requerida'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Prioridad:Yup.string().required('La Prioridad es requerida'),
 });
}
