import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateMovimiento.form';
import { useState } from "react";
import { useForm } from "@inertiajs/react";

const CreateMovimiento = ({ Taq, onClose, Rigs, Oms }) =>  {

    const { data, post } = useForm()
    
    const [FiltroOms, setFiltroOms] = useState("");
    const [FiltroRigs, setFiltroRigs] = useState("");

    const formik = useFormik({
        initialValues:initialValue(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async () => {
        data.Taq = Taq;
        data.taqrig = formvalue.taqrig,
        data.taqom = formvalue.taqom,
        data.fechaSalida = formvalue.fechaSalida,
        data.fechaRetorno = formvalue.fechaRetorno, 
        data.descripcion = formvalue.descripcion, 
        post(`/movimiento/activo/store`)
        onClose();
        }
    })

    return (
        <form 
            onSubmit = { formik.handleSubmit }
            className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
            method = "POST"
        >
            <h3 className='font-bold'>
                Registrando Movimiento
            </h3>
            <div className='w-full flex justify-center items-center gap-3'>
                <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
                    <div className='w-full h-auto flex gap-2 justify-start items-center'>
                        <label htmlFor="taqrig" className='font-bold text-black'>
                            Rigs
                        </label> 
                        <span className='text-red-500 font-bold text-2xl'>
                        *
                        </span>
                    </div>
                    <input 
                        type="text" 
                        value={FiltroRigs} 
                        onChange={(e) => setFiltroRigs(e.target.value)} 
                        placeholder="Filtrar por nombre..."
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <select id="taqrig" name="taqrig" value = { formik.values.taqrig } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                        <option value = "" disabled>
                            POR FAVOR SELECCIONA UNA OPCION
                        </option>
                        {
                            Rigs ? (
                                Rigs.filter(data => data.nombre.includes(FiltroRigs)).map((data) => (
                                    <option 
                                        key = { data.taqrig } 
                                        value = { data.taqrig }
                                    >
                                        { data.nombre } 
                                    </option>
                                ))
                            ) : null
                        }
                    </select>
                </div> 
            </div>
            <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
                <div className='w-full h-auto flex gap-2 justify-start items-center'>
                    <label htmlFor="taqom" className='font-bold text-black'>
                        OM
                    </label> 
                    <span className='text-red-500 font-bold text-2xl'>
                        *
                    </span>
                </div>
                <input 
                    type="text" 
                    value={FiltroOms} 
                    onChange={(e) => setFiltroOms(e.target.value)} 
                    placeholder="Filtrar por nombre..."
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <select id="taqrig" name="taqrig" value = { formik.values.taqrig } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                    <option value = "" disabled>
                        POR FAVOR SELECCIONA UNA OPCION
                    </option>
                    {
                        Oms ? (
                            Oms.filter(data => data.nombre.includes(FiltroOms)).map((data) => (
                                <option 
                                    key = { data.taqrig } 
                                    value = { data.taqrig }
                                >
                                    { data.nombre } 
                                </option>
                            ))
                        ) : null
                    }
                </select>
                {
                    formik.touched.taqom && formik.errors.taqom && (
                    <div className="text-red-500 font-bold">{formik.errors.taqom}</div>
                    )
                }
            </div>
            <div className='w-full h-auto flex-col justify-center items-center gap-3'>
                <div className='w-full h-auto flex gap-2 justify-start items-center'>
                    <label htmlFor="taqom" className='font-bold text-black'>
                        Fecha Salida
                    </label> 
                    <span className='text-red-500 font-bold text-2xl'>
                        *
                    </span>
                </div> 
                <input 
                    type="date" 
                    name="taqom"
                    id="taqom"
                    value={formik.values.taqom}
                    onChange={formik.handleChange} 
                    className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.taqom && formik.errors.taqom ? 'border-red-500' : 'border-black' }`}
                />
                {
                    formik.touched.taqom && formik.errors.taqom && (
                        <div className="text-red-500 font-bold">{formik.errors.taqom}</div>
                    )
                }
            </div>
            <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
                <div className='w-full h-auto flex gap-2 justify-start items-center'>
                    <label htmlFor="descripcion" className='font-bold text-black'>
                        descripcion
                    </label> 
                    <span className='text-red-500 font-bold text-2xl'>
                        *
                    </span>
                </div>  
                <textarea 
                    name="descripcion"
                    id="descripcion"
                    value={formik.values.descripcion}
                    onChange={formik.handleChange}
                    className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.descripcion && formik.errors.descripcion ? 'border-red-500' : 'border-black' }`}
                    placeholder="Escribe aquí"
                ></textarea>
                {
                    formik.touched.descripcion && formik.errors.descripcion && (
                        <div className="text-red-500 font-bold">{formik.errors.descripcion}</div>
                    )
                }
            </div> 
            <input type="submit" value = "Agregar Orden de Mantenimiento" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
        </form>
    )
}

export default CreateMovimiento;
