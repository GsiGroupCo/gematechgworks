import * as Yup from 'yup';

export function initialValue(Empresa) {
  return {
    Empresa: Empresa[0].taqempresa,
   taqom:'',
    Responsable: '',
    Descripcion:'',
    Tipo:'',
    Clasificacion:'',
    Prioridad:'',
    mecanica:'',
    instrumentacion:'',
    metalmecanica:'',
    electrico:'',
    pintura:'',
    equipopesado:'',
    ensayonodestructivo:'',
    soldadura:'',
    alquiler:'',
    fabricacion:''
  };
}

export function validationSchema() {
  return Yup.object({    
   taqom: Yup.string().required('La OT es requerida'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Descripcion:Yup.string().required('La Descripcion es requerida'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Clasificacion:Yup.string().required('La Clasificacion es requerida'),
    Prioridad:Yup.string().required('La Prioridad es requerida'),
 });
}
