import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Menu";
import SidebarContainer from "../../componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from 'sweetalert'

const MostrarClientes = () => {

    const [clientes, setClientes] = useState([])

    const getClientes = async () => {

        const response = await APIInvoke.invokeGET('/api/clientes');
        setClientes(response.clientes);

    }
    useEffect(() => {
        getClientes();
    }, [])

    const eliminarClientes = async (e, idCliente) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/clientes/${idCliente}`);

        if (response.msg === 'El cliente fue Eliminado') {
            const msg = "El cliente fue eliminado correctamente"

            swal({
                title: 'Informacion',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true

                    }
                }

            });
            getClientes();
        } else {
            const msg = "El cliente no fue eliminado correctamente"
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true

                    }
                }

            });

        }

    }


    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <div className="content-wrapper">


                <ContentHeader
                    titulo={"Listado de Clientes"}
                    breadCrumb1={"Incio"}
                    breadCrumb2={"Clientes"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/clientes/agregar"}
                                className="btn btn-block btn-primary btn-sm">Agregar Clientes</Link></h3>
                            <div className="card-tools">

                                <button type="botton" className="btn btn-tool" data-card-widget="collapse"
                                    title="Collapse">
                                    <i className="fas fa-times" />
                                </button>


                                <button type="botton" className="btn btn-tool" data-card-widget="remove"
                                    title="Remove">
                                    <i className="fas fa-items" />
                                </button>

                            </div>
                        </div>

                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15' }}> Nombres Cliente</th>
                                        <th style={{ width: '15' }}> Apellidos</th>
                                        <th style={{ width: '15' }}> Cedula</th>
                                        <th style={{ width: '15' }}> Correo</th>
                                        <th style={{ width: '15' }}> Telefono</th>
                                        <th style={{ width: '15' }}> Direccion</th>
                                        <th style={{ width: '15' }}> Acciones</th>

                                    </tr>

                                </thead>

                                <tbody>
                                    {clientes.map((cliente, index) => (
                                        <tr key={index}>
                                            <td> {cliente.nombres}</td>
                                            <td> {cliente.apellidos}</td>
                                            <td> {cliente.cedula}</td>
                                            <td> {cliente.correo}</td>
                                            <td> {cliente.telefono}</td>
                                            <td> {cliente.direccion}</td>
                                            <td>
                                                <Link to={`/clientes/editar/${cliente._id}`} className='btn btn-sm btn-primary'>Editar</Link>

                                                <button onClick={(e) => eliminarClientes(e, cliente._id)} className="btn btn-sm btn-danger">Borrar</button>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <Footer></Footer>
            </div>
        </div>
    )
}



export default MostrarClientes


