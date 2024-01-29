import * as Yup from 'yup';

export function initialValue(Tipe) {
  return { 
    taqActivos:'',
    taqMantenimiento: '',
    Responsable: '',
    Descripcion:'',
    Tipo: Tipe ? Tipe : '', 
    Prioridad:''
  };
}

export function validationSchema() {
  return Yup.object({     
    taqActivos: Yup.string().required('El Activo es requerido'),
    taqMantenimiento: Yup.string().required('El Mantenimiento es requerido'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Descripcion:Yup.string().required('La Descripcion es requerida'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Prioridad:Yup.string().required('La Prioridad es requerida'),
 });
}
