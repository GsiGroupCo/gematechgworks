import * as Yup from 'yup';

export function initialValue(Omc) { 
  return { 
    taqComponente: Omc.taqComponente,
    taqMantenimiento: Omc.taqMantenimiento,
    Responsable: Omc.taqresponsable,
    Descripcion: Omc.descripcion,
    Tipo: Omc.tipo, 
    Prioridad:Omc.prioridad
  };
}

export function validationSchema() {
  return Yup.object({
    taqComponente: Yup.string().required('El Componente es requerido'),
    taqMantenimiento: Yup.string().required('El mantenimiento es requerido'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Descripcion:Yup.string().required('La Descripcion es requerida'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Prioridad:Yup.string().required('La Prioridad es requerida'),
 });
}
