import { useFormik } from "formik";

import { initialValue, validationSchema } from './FormCertificacion.form';
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";


const FormCertificacion = ({ taqActivos, onClose }) =>  {
  

  const [files, setFiles] = useState([]);
  const { data, post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqActivos         = taqActivos;
      data.fechacertificacion = formValue.fechacertificacion;
      data.frecuencia         = formValue.frecuencia;
      files.forEach((file, index) => {
        const propertyName = `Image_${index + 1}`;
        data[propertyName] = file;
      });
      data.CantImages = files.length;
      post('/certificacion/store')
      onClose()
    }
  })

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(Array.from(selectedFiles));
  };
  
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file));
    };
  }, [files]);

  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className = " w-auto md:w-[650px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3 "
      method = "POST"
      enctype="multipart/form-data"
    >
      <h3 className='font-bold'>
        Subiendo Certificacion
      </h3> 
      <div className="w-full flex flex-col sm:flex-row gap-3 ">
        <div className="w-full sm:w-1/2 flex flex-col ">
          <div className="w-auto flex gap-2">
            <label htmlFor="fechacertificacion">
              Fecha de Certificacion
            </label>
            <div>
              <span className="text-red-500 font-bold">*</span>
            </div>
          </div>
          <input 
            type="date"
            name="fechacertificacion"
            id="fechacertificacion" 
            value={formik.values.fechacertificacion}
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col ">
          <div className="w-auto flex gap-2">
            <label htmlFor="frecuencia">
              Frecuencia
            </label>
            <div>
              <span className="text-red-500 font-bold">*</span>
            </div>
          </div>
          <select 
            name="frecuencia"
            id="frecuencia"
            value={formik.values.frecuencia}
            onChange={formik.handleChange}
          >
            <option value="" disabled>Seleccione una opcion </option>
            <option value="3">3 Meses</option>
            <option value="6">6 Meses</option>
            <option value="1">1 Año</option>
            <option value="5">5 Años</option>
            <option value="10">10 Años</option>
          </select>
        </div>
      </div>
      {
        files.length > 0 ?  (
          <div className='w-full h-full grid grid-cols-3 gap-4  px-4 py-2'>
            {
              files.map((file, index) => (
              <div key={index} className='w-auto max-w-[200px] max-h-[150px] h-auto rounded-md'>
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`File ${index}`}
                    className="w-full h-full object-cover "
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full border-2 px-4 py-2 border-gray-300 border-dashed rounded-lg">
                    <p>{file.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <label htmlFor="Image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para subir</span> o selecciona y desliza aqui </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="Image"
              name="Image"
              type="file"
              accept="image/*,.pdf,.doc,.docx" 
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )
      }
      {
        formik.touched.taq && formik.errors.taq && (
          <div className="text-red-500 font-bold">{formik.errors.taq}</div>
        )
      }
      <input type="submit" value = "Subir Certificacion" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormCertificacion;
