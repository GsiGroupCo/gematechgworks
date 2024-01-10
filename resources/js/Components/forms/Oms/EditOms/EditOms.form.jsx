import * as Yup from 'yup';

export function initialValue(Om) { 
  return { 
    Responsable: Om.taqresponsable,
    Descripcion:Om.descripcion,
    Tipo:Om.tipo, 
    Prioridad:Om.prioridad
  };
}

export function validationSchema() {
  return Yup.object({     
    Responsable: Yup.string().required('El Responsable es requerido'),
    Descripcion:Yup.string().required('La Descripcion es requerida'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Prioridad:Yup.string().required('La Prioridad es requerida'),
 });
}
