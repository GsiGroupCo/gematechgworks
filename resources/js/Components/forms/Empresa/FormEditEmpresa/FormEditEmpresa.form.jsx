import * as Yup from 'yup';

export function initialValue(Empresa) {
  return {
    Nombre :Empresa[0].nombre,
    Taq    :'',
    Image  :''
  };
}

export function validationSchema() {
  return Yup.object({    
    Nombre : Yup.string().required(' El nombre de la empresa es requerida ')
 });
}
