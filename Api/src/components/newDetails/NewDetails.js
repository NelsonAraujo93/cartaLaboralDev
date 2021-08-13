import './NewDetails.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import Swal from 'sweetalert2';
import {io} from 'socket.io-client';
import Modal from 'react-bootstrap/Modal'
import CreatePDF from '../createPDF/CreatePDF';
import CreatePDFPayroll from '../createPDFPayroll/CreatePDFPayroll';
import ContractorData from '../contractorData/ContractorData';
import PayrollData from '../payrollData/PayrollData';
import ReactPDF from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { BlobProvider, Page, Text, View, Document, StyleSheet, Image, Font, Link } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { format } from 'date-fns'
import { eo } from 'date-fns/locale'
import logo from '../../assets/images/metrolinea-logo.png';
import Roboto from '../../assets/fonts/Roboto-Regular.ttf';
import RobotoBold from '../../assets/fonts/Roboto-Bold.ttf';
import de from 'date-fns/locale/de/index.js';

class NewDetails extends Component{
    /**
     * get id from url
     * or get props from parent
     * 
     */
    newStateRef = React.createRef();
    
      
      // Create Document Component
     
    constructor(props){
        super(props);
        Font.register({ family: 'Roboto', src: Roboto });
        Font.register({ family: 'Roboto-Bold', src: RobotoBold });
        this.date = null;
        this.passData = React.createRef();
        
        this.passDataPayroll = React.createRef();
        this.payRollRef = React.createRef();
        this.contractorRef = React.createRef();
        this.userData = React.createRef();
        this.mailForm={};
        this.paramId= this.props.match.params.id;
        this.url = Global.url;
        this.ws = Global.ws;
        this.socket = null;
        this.styles = StyleSheet.create({
            page: {
              backgroundColor: 'white',
              padding:'20px 25px 80px 25px',
              width:'100%',
              height: '100%',
              position:'relative',
            },
            section: {
              margin: 10,
              padding: 10,
              flexGrow: 1
            },
            metrolineaImage:{
                width:'120px',
                height:'100px',
                backgroundSize:'100%'
            },
            header:{
                display:'flex',
                flexDirection:'row',
                height: '80px',
                borderBottom: '1px solid yellow',
                marginBottom:'10px'
            },
            body:{
                height:'auto',
                width:'100%',
                padding:'0 50px'
            },
            footer:{
                height:'100%',
                width:'100%',
                position:'absolute',
                top:'80px',
                left:'25px'
            },
            footerContent:{
                position:'absolute',
                height:'60px',
                width:'100%',
                bottom:'0',
                left:'0',
                borderTop: '1px solid yellow',
                paddingTop:'10px'
            },
            left:{
                margin: 10,
                padding: 10,
                flexGrow: 1
            },
            rigth:{
                margin: 10,
                padding: 10,
                flexGrow: 1,
                flexDirection:'row',
                justifyContent:'flex-end',
                alignItems:'center'
            },
            text1:{
                fontSize:'10px'
            },
            text2:{
                fontSize:'13px',
                fontFamily:'Roboto-Bold',
            },
            fo:{
                textAlign:'right',
                fontSize:'14px',
                width:'80px',
                height:'20px',
            },
            title:{
                textAlign:'center',
                padding:'10px 0',
                textTransform:'uppercase',
                fontFamily:'Roboto-Bold',
            },
            justifyP:{
                textAlign:'justify',
                fontSize:'14px',
                marginBottom:'10px'
            },
            boldP:{
                display:'inline-block',
                fontFamily:'Roboto',
                fontWeight:'bold',
                fontSize:'14px',
                float:'left',
                textAlign:'justify'
            },
            flexRow:{
                width:'100%',
                flexDirection:'row',
                fontSize:'14px',
                marginBottom:'5px',
                marginTop: '5px'
            },
            col1:{
                width: '40%',
                fontSize:'13px',
                fontFamily:'Roboto-Bold'
            },
            col2:{
                width: '60%',
                textAlign:'justify'   
            },
            fullWidthText:{
                marginBottom:'10px',
                marginTop: '10px'
            },
            contractTitle:{
                marginTop: '10px',
            },
            footerText:{
                textAlign:'center',
                fontSize:'10px',
            },
            footerTextContainer:{
                height: '10px',
                flexGrow: '1'
            },
            contractData:{
                marginBottom:'10px'
            },
            boldC:{
                display:'inline-block',
                fontFamily:'Roboto-Bold',
                fontSize: '14px',
                textAlign:'justify'
            }
        });
        this.state ={
            form: {},
            status: null,
            user: null,
            showPdf: false,
            prevPdfState: false,
            previewPDF: false,
            prevPdfObject:null,
            removedContract: {},
            contratos: {
                ejecuta: [],
                suscribio:[]
            }
        };
    }
    dateFormat = (data , type) =>{
        var date ={};
        let month=data.getMonth();
        let year=data.getFullYear();
        let dayString=data.getDay();
        let day=data.getDate();
        date.year= year;
        date.monthString= this.setMonth(month);
        date.calendarDay=day;
        date.dayString= this.setDay(dayString);
        date.dayCalendarString= this.decenas(day);
        if(type){
            if(date.dayCalendarString==='un'){
                date.dayCalendarString='primero';
            }
        }
        return date
    }
    setMonth =(data) => {
        var monthString;
        switch (data) {
            case 0:
                monthString='Enero'
            break;
            case 1:
                monthString='Febrero'
            break;
            case 2:
                monthString='Marzo'
            break;
            case 3:
                monthString='Abril'
            break;
            case 4:
                monthString='Mayo'
            break;
            case 5:
                monthString='Junio'
            break;
            case 6:
                monthString='Julio'
            break;
            
            case 7:
                monthString='Agosto'
            break;
            
            case 8:
                monthString='Septiembre'
            break;
            
            case 9:
                monthString='Octubre'
            break;
            
            case 10:
                monthString='Noviembre'
            break;
            
            case 11:
                monthString='Diciembre'
            break;
        }  
        return monthString
    }
    setDay =(data) => {
        var dayString;
        switch (data) {
            case 0:
                dayString='Domingo'
            break;
            case 1:
                dayString='Lunes'
            break;
            case 2:
                dayString='Martes'
            break;
            case 3:
                dayString='Miércoles'
            break;
            case 4:
                dayString='Jueves'
            break;
            case 5:
                dayString='Viernes'
            break;
            case 6:
                dayString='Sábado'
            break;
        }  
        return dayString
    }
    decenas=(num)=>{
        var decena = Math.floor(num/10);
        var unidad = num-(decena * 10);
        switch(decena)
        {
            case 1:
                switch(unidad)
                {
                    case 0: return 'diez';
                    case 1: return 'once';
                    case 2: return 'doce';
                    case 3: return 'trece';
                    case 4: return 'catorce';
                    case 5: return 'quince';
                    default: return 'dieci' + this.unidades(unidad);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return 'veinte';
                    default: return 'veinti' + this.unidades(unidad);
                }
            case 3: return this.decenasY('treinta', unidad);
            case 4: return this.decenasY('cuarenta', unidad);
            case 5: return this.decenasY('cincuenta', unidad);
            case 6: return this.decenasY('sesenta', unidad);
            case 7: return this.decenasY('setenta', unidad);
            case 8: return this.decenasY('ochenta', unidad);
            case 9: return this.decenasY('noventa', unidad);
            case 0: return this.unidades(unidad);
        }
    }
    decenasY = (strSin, numUnidades) =>{
        if (numUnidades > 0)
        return strSin + ' y ' + this.unidades(numUnidades)
    
        return strSin;
    }
    unidades = (num) => {
        switch(num)
        {
            case 1: return 'un';
            case 2: return 'dos';
            case 3: return 'tres';
            case 4: return 'cuatro';
            case 5: return 'cinco';
            case 6: return 'seis';
            case 7: return 'siete';
            case 8: return 'ocho';
            case 9: return 'nueve';
        }
        return '';
    }
    prevPdfObjectFunc=async ()=>{
        var mailPdf;
        if(this.state.previewPDF){
            mailPdf=this.state.prevPdfObject
            return  mailPdf
        }else{
            await this.prevPDF(this.state.form.request_type, this.passDataPayroll.current.observData);
        }
    }
    prevPDF = async (data, observ) =>{
        this.setState({
            prevPdfState: true
        });
        var blobPdf;
        if(data===1){
            var user=this.userData.current.state.payroll;
            var today=new Date();
            this.date=new Date(user.admission_date);
            this.date=this.dateFormat(this.date, 1);
            var desde=this.dateFormat(today, 0);
            user.fecha=this.date;
            user.today=desde;
            debugger
            user.observations=observ.current !==null ? observ.current.value:'';
            this.setState({previewPDF:true},()=>{
                const Carta = () => (
                        <Document>
                            <Page size="A4" style={this.styles.page}>
                                <View fixed style={this.styles.header}>
                                    <View style={this.styles.left}>
                                        <View>
                                            <Image
                                                style={this.styles.metrolineaImage}
                                                src={logo}
                                            />
                                        </View>
                                        <Text style={this.styles.text1}>Nit.830.507.387-3</Text>
                                    </View>
                                    <View style={this.styles.rigth}>
                                        <View style={this.styles.fo}>
                                            <Text style={this.styles.text2}>20-23.1.1.F0</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={this.styles.body}>
                                    {
                                        //Titulo
                                    }
                                    <View style={this.styles.mainTitle}>
                                        <Text style={this.styles.title}>Constancia</Text>
                                    </View>
                                    {
                                        //Encabezado
                                    }
                                    <View style={this.styles.fullWidthText}>
                                        <Text style={this.styles.justifyP}>
                                            La suscrita Profesional Universitario I Talento Humano, de la Sociedad Metrolinea
                                            S. A. hace constar que:
                                        </Text>
                                    </View>
                                    <View>
                                        <View style={this.styles.fullWidthText}>
                                            <Text style={this.styles.boldP}>{user.name} {user.first_surname} {user.second_surname}, 
                                            identificado con la cédula de ciudadanía No. {user.identification} expedida en {user.expedition_place}, 
                                            labora en esta empresa desde el día  {user.fecha.dayCalendarString} ({user.fecha.calendarDay}) de {user.fecha.monthString} de {user.fecha.year}, mediante contrato a término {user.contract_name}, en el cargo de {user.job_name}, de la Sociedad Metrolinea S. A.
                                            </Text>
                                        </View>
                                        <View style={this.styles.contractData}>
                                            <View style={this.styles.flexRow}>
                                                <Text style={this.styles.col1}>
                                                    Salario:  
                                                </Text>
                                                <Text style={this.styles.col2}>${user.salary}

                                                </Text>
                                            </View>
                                            
                                        </View>
                                    </View>
                                    <View style={this.styles.fullWidthText}>
                                        <Text style={this.styles.justifyP}>
                                            Se expide a solicitud del interesado, en la ciudad de Bucaramanga a {user.today.dayCalendarString} ({user.today.calendarDay}) día(s) del mes de {user.today.monthString} de {user.today.year}. Se adhiere y anula el recibo de 
                                            compra de estampilla Pro Hospitales por valor de tres mil pesos m/cte. ($3.000) y 
                                            Ordenanza por valor de Trescientos pesos mcte ($300).

                                        </Text>
                                    </View>
                                    {
                                        //obsevaciones
                                        user.observations!==''&&
                                        <View>
                                            <View style={this.styles.fullWidthText}>
                                                <Text style={this.styles.boldC}>
                                                Observaciones:
                                                </Text>
                                                <Text style={this.styles.justifyP}>
                                                    {user.observations}
                                                </Text>
                                            </View>
                                            <View style={this.styles.fullWidthText}>
                                                <Text style={this.styles.justifyP}>
                                                Cordialmente,

                                                </Text>
                                            </View>    
                                        </View>
                                    }

                                   
                                </View>
                                <View fixed style={this.styles.footer}>
                                    <View style={this.styles.footerContent}>
                                        <View style={this.styles.footerTextContainer}>
                                            <Text style={this.styles.footerText}>Autopista Floridablanca N° 86-30, Estación Provenza Occidental, Barrio Diamante II</Text>
                                        </View>
                                        <View style={this.styles.footerTextContainer}>
                                            <Text style={this.styles.footerText}>Teléfono: 6929824 Bucaramanga.</Text>
                                        </View>
                                        <View style={this.styles.footerTextContainer}>
                                            <Link src='www.metrolinea.gov.co' style={this.styles.footerText}>www.metrolinea.gov.co</Link>
                                        </View>
                                    </View>
                                </View>
                            </Page>
                        </Document>
                );
                ReactDOM.render(<PDFViewer><Carta /></PDFViewer>, document.getElementById('viewer'),async ()=>{
                    blobPdf= await ReactPDF.pdf(
                        <Carta />
                    ).toString().then( res=>{
                        
                        const blobString= res;
                        this.setState({
                            prevPdfObject:blobString,
                        });
                        debugger
                    });
                });
                
            });
        }else if(data===0){
            var user=this.contractorRef.current.contractorData;
            this.setState({previewPDF:true},()=>{
                const Carta = () => (
                    <PDFViewer>
                        <Document>
                            <Page size="A4" style={this.styles.page}>
                                <View fixed style={this.styles.header}>
                                    <View style={this.styles.left}>
                                        <View>
                                            <Image
                                                style={this.styles.metrolineaImage}
                                                src={logo}
                                            />
                                        </View>
                                        <Text style={this.styles.text1}>Nit.830.507.387-3</Text>
                                    </View>
                                    <View style={this.styles.rigth}>
                                        <View style={this.styles.fo}>
                                            <Text style={this.styles.text2}>20-23.1.1.F0</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={this.styles.body}>
                                    {
                                        //Titulo
                                    }
                                    <View style={this.styles.mainTitle}>
                                        <Text style={this.styles.title}>Constancia</Text>
                                    </View>
                                    {
                                        //Encabezado
                                    }
                                    <View style={this.styles.fullWidthText}>
                                        <Text style={this.styles.justifyP}>La suscrita Profesional Universitario I Talento Humano, de la Sociedad Metrolinea
                                            S. A. hace constar que:
                                        </Text>
                                    </View>
                                    {
                                        //CONTRATOS
                                        this.state.contratos.ejecuta.length >=1 && 
                                                //Info del Usuario
                                            <View>
                                                <View style={this.styles.fullWidthText}>
                                                    <Text style={this.styles.boldP}>{user.name}, identificado con la cédula de ciudadanía No. {user.identification} expedida en Pamplona (N. de Santander), ejecuta con Metrolínea S.A., el siguiente CONTRATO DE PRESTACION DE SERVICIOS:
                                                    </Text>
                                                </View>
                                                {
                                                    this.state.contratos.ejecuta.map((contract, i) =>{
                                                        <View  style={this.styles.contractData} key={i}>
                                                            <View style={this.styles.contractTitle}>
                                                                <Text style={this.styles.boldC}>Contrato de Prestación de Servicios No. {contract.contract_number} de {contract.year}
                                                                </Text>
                                                            </View>
    
                                                            <View style={this.styles.fullWidthText}>
                                                                <Text style={this.styles.boldC}>OBJETO: 
                                                                </Text>
                                                                
                                                                <Text style={this.styles.boldP}>{contract.object}
                                                                </Text>
                                                            </View>
                                                            
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    VALOR DEL CONTRATO:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.value_string}(${contract.value})
    
                                                                </Text>
                                                            </View>
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    PLAZO DE CONTRATO:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.execution_time}
    
                                                                </Text>
                                                            </View>
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    INTERVENTOR:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.supervisor}
    
                                                                </Text>
                                                            </View>
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    FECHA DE INICIO:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.date}
    
                                                                </Text>
                                                            </View>
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    FECHA DE TERMINACIÓN:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.finish_date}
    
                                                                </Text>
                                                            </View>
                                                            {
                                                                contract.details !==undefined &&
                                                                <View style={this.styles.flexRow}>
                                                                    <Text style={this.styles.col1}>
                                                                        DETALLES:  
                                                                    </Text>
                                                                    <Text style={this.styles.col2}>
                                                                        {contract.details}
    
                                                                    </Text>
                                                                </View>
                                                            }
                                                            
                                                        </View>
                                                    })
                                                }
                                            </View>
                                    }
                                    {
                                        //CONTRATOS
                                        this.state.contratos.suscribio.length >=1 && 
                                                //Info del Usuario
                                            <View>
                                                <View style={this.styles.fullWidthText}>
                                                    <Text style={this.styles.boldP}>{user.name}, identificado con la cédula de ciudadanía No. {user.identification} expedida en Pamplona (N. de Santander), suscribió con Metrolínea S.A., el siguiente CONTRATO DE PRESTACION DE SERVICIOS:
                                                    </Text>
                                                </View>
                                                {
                                                    this.state.contratos.suscribio.map((contract, i) =>{
                                                        <View style={this.styles.contractData} key={i}>
                                                            <View style={this.styles.contractTitle}>
                                                                <Text style={this.styles.boldC}>Contrato de Prestación de Servicios No. {contract.contract_number} de {contract.year}
                                                                </Text>
                                                            </View>
    
                                                            <View style={this.styles.fullWidthText}>
                                                                <Text style={this.styles.boldC}>OBJETO: {contract.object}
                                                                </Text>
                                                            </View>
                                                            
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    VALOR DEL CONTRATO:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.value_string}(${contract.value})
    
                                                                </Text>
                                                            </View>
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    PLAZO DE CONTRATO:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.execution_time}
    
                                                                </Text>
                                                            </View>
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    INTERVENTOR:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.supervisor}
    
                                                                </Text>
                                                            </View>
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    FECHA DE INICIO:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.date}
    
                                                                </Text>
                                                            </View>
                                                            <View style={this.styles.flexRow}>
                                                                <Text style={this.styles.col1}>
                                                                    FECHA DE TERMINACIÓN:  
                                                                </Text>
                                                                <Text style={this.styles.col2}>
                                                                    {contract.finish_date}
    
                                                                </Text>
                                                            </View>
                                                            {
                                                                contract.details !==undefined &&
                                                                <View style={this.styles.flexRow}>
                                                                    <Text style={this.styles.col1}>
                                                                        DETALLES:  
                                                                    </Text>
                                                                    <Text style={this.styles.col2}>
                                                                        {contract.details}
    
                                                                    </Text>
                                                                </View>
                                                            }
                                                        </View>
                                                    })
                                                }
                                            </View>
                                    }     
                                </View>
                                <View fixed style={this.styles.footer}>
                                    <View style={this.styles.footerContent}>
                                        <View style={this.styles.footerTextContainer}>
                                            <Text style={this.styles.footerText}>Autopista Floridablanca N° 86-30, Estación Provenza Occidental, Barrio Diamante II</Text>
                                        </View>
                                        <View style={this.styles.footerTextContainer}>
                                            <Text style={this.styles.footerText}>Teléfono: 6929824 Bucaramanga.</Text>
                                        </View>
                                        <View style={this.styles.footerTextContainer}>
                                            <Link src='www.metrolinea.gov.co' style={this.styles.footerText}>www.metrolinea.gov.co</Link>
                                        </View>
                                    </View>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                );
                ReactDOM.render(<PDFViewer><Carta /></PDFViewer>, document.getElementById('viewer'),async ()=>{
                    blobPdf = await ReactPDF.pdf(
                        <Carta />
                    ).toString().then(res=>{
                        
                        const blobString= res;
                        this.setState({
                            prevPdfObject:blobString,
                        });
                        debugger
                    });
                });
            });
        }
       
    }
    componentWillMount(){
        this.getFormById(this.paramId);
        this.veryfyUserSesion();
    }

    getUser = (id) => {
        axios.get(this.url+'get-admin/'+id)
        .then(res => {
            this.setState({
                user: res.data.data
            });
        })
    }

    veryfyUserSesion = () =>{
        const sesionToken = localStorage.getItem('userSesion');
        axios.get(this.url+'auth-user', {
            headers:{
                'x-acces-token':sesionToken
            }
        })
        .then(
            res => {
                if(res.data.status !== 'Ok'){
                    Swal.fire({
                        title: '<div class="big-square"></div>'+
                        '<div class="little-square"></div>'+
                        '<div class="bg-title-pop"><div class="list-label pop absolute-center">Estás ingresando como usuario externo, podrás visualizar más no editar</div></div>',
                        confirmButtonText: 'Seguir',
                        allowOutsideClick: false,
                        showCloseButton: true
                    }).then(()=>{
                        this.props.history.push('/login');
                    })
                }else{
                    this.getUser(res.data.data.id);
                    this.connectSocket();
                }
            },
            error =>{
                Swal.fire({
                    title: '<div class="big-square"></div>'+
                    '<div class="little-square"></div>'+
                    '<div class="bg-title-pop"><div class="list-label pop absolute-center">Estás ingresando como usuario externo, podrás visualizar más no editar</div></div>',
                    confirmButtonText: 'Seguir',
                    allowOutsideClick: false,
                    showCloseButton: true
                }).then(()=>{
                    ;
                })
            }
        )
    }

    backToNews = () => {
        this.props.history.push('/news');
    }

    connectSocket = () =>{
        this.socket = (io(this.ws));
    }

    setCheckedSocket = (res) =>{
        this.socket.emit("set-checked-news",res.data.data);
    }

    setUncheckedSocket = (res) =>{
        this.socket.emit("set-unchecked-news",res.data.data);
    }

    setCheckedForms = async () =>{
        await axios.get(this.url+"get-checked-forms")
            .then( res => {
                this.setCheckedSocket(res);
            });
    }

    setForms = async () =>{
        await axios.get(this.url+"get-unchecked-forms")
             .then( res => {
                 this.setUncheckedSocket(res);
             });
     }

    updateDataState = (data) => {
        this.newStateRef= data;
        if(this.newStateRef === 1){
            Swal.fire({
                title: '<div class="big-square"></div>'+
                '<div class="little-square"></div>'+
                '<div class="bg-title-pop"><div class="list-label pop absolute-center">¿Estás seguro?</div></div>',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, certificar',
                cancelButtonText: 'Cancelar',
                showCloseButton: true

            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: '<div class="big-square"></div>'+
                        '<div class="little-square"></div>'+
                        '<div class="bg-title-pop"><div class="list-label pop absolute-center">Se ha enviado la certificación</div></div>',
                        denyButtonColor: '#0A9B91',
                        confirmButtonText: 'Seguir',
                        allowOutsideClick: false,
                        showCloseButton: true});
                    this.updateForm();
                    debugger
                    if(!this.state.prevPdfState){
                        this.prevPdfObjectFunc().then(res=>{
                            debugger;
                            this.mailForm.email=this.state.form.email;
                            this.mailForm.name=this.state.form.name;
                            this.mailForm.mailState=1;
                            this.mailForm.data= this.state.prevPdfObject;
                            axios.post(this.url+"mail",this.mailForm)
                            .then( res => {
                                this.backToNews();
                            });
                        });
                            
                    }else{
                        debugger;
                        this.mailForm.email=this.state.form.email;
                        this.mailForm.name=this.state.form.name;
                        this.mailForm.mailState=1;
                        this.mailForm.data= this.state.prevPdfObject;
                        axios.post(this.url+"mail",this.mailForm)
                        .then( res => {
                            this.backToNews();
                        });
                            
                    }
                   

                }
            });
        }else{
            Swal.fire({
                title: '<div class="big-square"></div>'+
                '<div class="little-square"></div>'+
                '<div class="bg-title-lit"><div class="list-label pop absolute-center">Especifica el motivo del rechazo de la solicitud</div></div>'+
                '<textarea id=input-detail></textarea>',
                denyButtonColor: '#0A9B91',
                confirmButtonText: 'Enviar rechazo',
                allowOutsideClick: false,
                showCloseButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    var val = document.getElementById('input-detail').value;
                    this.updateForm(val);
                    this.mailForm.email=this.state.form.email;
                    this.mailForm.name=this.state.form.name;
                    this.mailForm.pdf={}
                    this.mailForm.mailState=0;
                    this.mailForm.denied=this.state.form.observations;
                    axios.post(this.url+"mail",this.mailForm)
                    .then( res => {
                        this.backToNews();
                    });
                }
            });
        }
    }

    updateForm= (data) =>{
        var updatedForm = this.state.form;
        updatedForm.state = this.newStateRef;
        updatedForm.checked = 1;
        updatedForm.observations = data;
        updatedForm.admin_id = this.state.user.id;
        axios.put(this.url+"/update-form", updatedForm)
        .then( res => {
            //emitir cambio en new
            this.setCheckedForms();
            this.setForms();
            this.backToNews();
        });
    }

    getPdf = () =>{
        axios({
                method: 'POST',
                data: this.state.form,
                url: this.url+"/download-stamp",
                responseType: 'blob'
        })
        .then(response => {
            const file = new Blob(
              [response.data], 
              {type: 'application/pdf'});

            const fileURL = URL.createObjectURL(file);
            window.open(fileURL,"theFrame");

        })
        .catch(error => {
            console.log(error);
        });
    }

    getFormById = (id) =>{
        axios.get(this.url+"get-form/"+id)
        .then( res => {
            this.setState({
                form: res.data.data[0],
                status: 'success'
            })
        });
    }
    addContract = (data, type) =>{
        this.passData.current.addContract(data, type);
        this.setState({
            contratos: this.passData.current.state.contratos
        })
    }
    removeContract = (data, type) =>{
        this.contractorRef.current.removeContract(data);
        this.setState({
            contratos: this.passData.current.state.contratos
        })
    }
   
    render(){
        const unCheckedObservations= () =>{
            return(
                requestType  ? (
                    <div className="row bg-title">
                        <div className="absolute-center bg-title-label">
                            Añadir Observaciones
                        </div>
                    </div>
                ):(
                    <div className="row bg-title">
                        <div className="absolute-center bg-title-label">
                            Añadir contratos
                        </div>
                    </div>
                )
            )
        };
        const checkedObservations= () =>{
            return(
                <div className="row reject-observations">
                    <div className="observation-title-container col-lg-12 h-20">
                        <div className="absolute-center bg-title-label">
                            Motivo de rechazo
                        </div>
                    </div>
                    <div className="observation col-lg-12 h-80">
                        <div className="observation-data">
                            <div className="input-text">
                                {this.state.form.observations}
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        };
        if(this.state.user!==null){
            if(this.state.form.id !== undefined && this.state.form.id !== null){
                var state = null;
                var checked = true;
                var requestType = this.state.form.request_type === 1 ? true : false;
                if(this.state.form.state === 1){
                    state=true;
                }else if( this.state.form.state === 0){
                    state = false;
                }else{
                    checked = false
                }
                return(
                    <React.Fragment >
                        <div className={checked ? "item-detail-container rejected" :  "item-detail-container" }>
                            <div className="row container-top no-gutters justify-content-center">
                                <div className="item-detail col-lg-6">
                                    <div className="row content-user-data no-gutters">
                                        <div className="col-lg-12 h-100 align-items-center">
                                            <div className="row h-10 align-items-center  justify-content-center">
                                                <div className="title-label-form">Información del formulario</div>
                                            </div>
                                            <div className="row h-40 align-items-center  justify-content-center">
                                                <div className="item-container col-lg-12">
                                                    <div className="item-label">Nombre</div>
                                                    <div className="item-data">
                                                        <div className="input-text absolute-center">
                                                            {this.state.form.name}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-container col-lg-12">
                                                    <div className="item-label">Correo</div>
                                                    <div className="item-data">
                                                        <div className="input-text absolute-center">
                                                            {this.state.form.email}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-container col-lg-12">
                                                    <div className="item-label">identification</div>
                                                    <div className="item-data">
                                                        <div className="input-text absolute-center">
                                                            {this.state.form.identification}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-container col-lg-12">
                                                    <div className="item-label">telephone</div>
                                                    <div className="item-data">
                                                        <div className="input-text absolute-center">
                                                            
                                                            {this.state.form.telephone}
                                                        </div>
                                                    </div>
                                            </div>
                                            </div>
                                            <div className="row h-50 align-items-center  justify-content-center">
                                                <div className="item-container area col-lg-12">
                                                    <div className="item-label">Contenido</div>
                                                    <div className="item-data">
                                                        <div className="input-text absolute-center">
                                                            {this.state.form.content}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item-container col-lg-12">
                                                    <div className="item-label">PDF</div>
                                                    <div className="btn-pdf" onClick={() => this.setState({showPdf:true})}>
                                                        <div className="btn-label absolute-center">ver estampilla</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Modal show={this.state.showPdf} onShow={this.getPdf}  onHide={() =>this.setState({showPdf:false})}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Estampilla</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <div className="pdf-viewer">
                                                <iframe name="theFrame"></iframe>
                                            </div>
                                            </Modal.Body>
                                        </Modal>
                                        <Modal show={this.state.previewPDF} onShow={this.prevPDF}  onHide={() =>this.setState({previewPDF:false})}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Visualizador del PDF</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <div className="pdf-viewer">
                                                <div id="viewer"></div>
                                            </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>

                                   
                                </div>
                                <div className="user-data-container col-lg-6">
                                    {
                                        requestType ? (
                                            <React.Fragment>
                                                <div className="content-payroll-data">
                                                    <PayrollData
                                                        payrollId = {this.state.form.identification}
                                                        ref = {this.userData}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        ):(
                                            <React.Fragment>
                                                <div className="content-contractor-data">
                                                    <ContractorData
                                                        contractorId = {this.state.form.identification}
                                                        pdfData = {this.addContract}
                                                        addedContract = {this.state.addedContract}
                                                        ref = {this.contractorRef}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                </div>
                               
                            </div>
                                {
                                    this.state.form.checked ? (
                                        checkedObservations()
                                    ):(    
                                        unCheckedObservations()
                                    )
                                }
                            <div className="row container-bottom no-gutters justify-content-center">
                                
                               
                                    {
                                        !checked && requestType &&
                                        <React.Fragment>
                                             <div className="col-lg-12">

                                                <div className="content-create-pdf h-90">
                                                    <CreatePDFPayroll
                                                        contractData = {this.state.addedContract}
                                                        ref = {this.passDataPayroll}
                                                        prev={this.prevPDF}
                                                    />
                                                </div>
                                             </div>
                                        </React.Fragment>
                                    }
                                    {
                                        !checked && !requestType &&
                                        <React.Fragment>
                                            <div className="col-lg-6">
                                                <div className="content-create-pdf h-90">
                                                    { 
                                                        <CreatePDF
                                                            contractData = {this.state.addedContract}
                                                            ref = {this.passData}
                                                            remove = {this.removeContract}
                                                            prev={this.prevPDF}
                                                        />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-lg-6"></div>
                                        </React.Fragment>
                                    }
                            </div>
                            
                            <div className="row options-buttons align-items-center justify-content-center">
                                {
                                    state && checked && 
                                            <div className="btn-aprove disabled active col-lg-auto">
                                                <div className="btn-label absolute-center">Certificado</div>
                                            </div>
                                }
                                {
                                    !state && checked && 
                                            <div className="btn-deny disabled active col-lg-auto">
                                                <div className="btn-label absolute-center">Rechazado</div>
                                            </div>
                                }
                                {
                                    !checked && 
                                    <React.Fragment>
                                                <div className="btn-aprove col-lg-auto" onClick={ (()=> {this.updateDataState(1)})}>
                                                    <div className="btn-label absolute-center">Certificar</div>
                                                </div>
                                                <div className="col-lg-2"></div>
                                                <div className="btn-deny col-lg-auto" onClick={ (()=> {this.updateDataState(0)})}>
                                                    <div className="btn-label absolute-center">Rechazar</div>
                                                </div>
                                    </React.Fragment>
                                }
                            </div>
                            <div className="back-container">
                                <div className="btn-back" onClick={this.backToNews}>
                                    <div className="btn-label absolute-center">Volver</div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }else if (this.state.form === undefined && this.state.status=== 'success'){
                    return(
                        <React.Fragment>
                        <h1> no hay Formularios con este id</h1>
                        </React.Fragment>
                    )
            }else{
                    return(
                        <React.Fragment>
                            <h1> Cargando espera mientras carga</h1>
                        </React.Fragment>
                    )
            }
        }else{
            if(this.state.form.id !== undefined && this.state.form.id !== null){
                var state = null;
                var checked = true;
                var requestType = this.state.form.request_type === 1 ? true : false;
                if(this.state.form.state === 1){
                    state=true;
                }else if( this.state.form.state === 0){
                    state = false;
                }else{
                    checked = false
                }
                return(
                    <React.Fragment>
                    <div className={checked ? "item-detail-container rejected" :  "item-detail-container" }>
                        <div className="row external container-top no-gutters justify-content-center">
                            <div className="item-detail col-lg-6">
                                <div className="row content-user-data no-gutters">
                                    <div className="col-lg-12 h-100 align-items-center">
                                        <div className="row h-10 align-items-center  justify-content-center">
                                            <div className="title-label-form">Información del formulario</div>
                                        </div>
                                        <div className="row h-40 align-items-center  justify-content-center">
                                            <div className="item-container col-lg-12">
                                                <div className="item-label">Nombre</div>
                                                <div className="item-data">
                                                    <div className="input-text absolute-center">
                                                        {this.state.form.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-container col-lg-12">
                                                <div className="item-label">Correo</div>
                                                <div className="item-data">
                                                    <div className="input-text absolute-center">
                                                        {this.state.form.email}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-container col-lg-12">
                                                <div className="item-label">identification</div>
                                                <div className="item-data">
                                                    <div className="input-text absolute-center">
                                                        {this.state.form.identification}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-container col-lg-12">
                                                <div className="item-label">telephone</div>
                                                <div className="item-data">
                                                    <div className="input-text absolute-center">
                                                        
                                                        {this.state.form.telephone}
                                                    </div>
                                                </div>
                                        </div>
                                        </div>
                                        <div className="row h-50 align-items-center  justify-content-center">
                                            <div className="item-container area col-lg-12">
                                                <div className="item-label">Contenido</div>
                                                <div className="item-data">
                                                    <div className="input-text absolute-center">
                                                        {this.state.form.content}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-container col-lg-12">
                                                <div className="item-label">PDF</div>
                                                <div className="btn-pdf" onClick={() => this.setState({showPdf:true})}>
                                                    <div className="btn-label absolute-center">ver estampilla</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-data-container col-lg-6">
                                {
                                    requestType ? (
                                        <React.Fragment>
                                            <div className="content-payroll-data">
                                                <PayrollData
                                                    payrollId = {this.state.form.identification}
                                                    ref = {this.userData}
                                                />
                                            </div>
                                        </React.Fragment>
                                    ):(
                                        <React.Fragment>
                                            <div className="content-contractor-data">
                                                <ContractorData
                                                    contractorId = {this.state.form.identification}
                                                    pdfData = {this.addContract}
                                                    addedContract = {this.state.addedContract}
                                                    ref = {this.contractorRef}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            </div>
                        
                        </div>
                        <div className="row options-buttons align-items-center justify-content-center">
                        {
                            state && checked && 
                                    <div className="btn-aprove disabled active col-lg-auto">
                                        <div className="btn-label absolute-center">Certificado</div>
                                    </div>
                        }
                        {
                            !state && checked && 
                                    <div className="btn-deny disabled active col-lg-auto">
                                        <div className="btn-label absolute-center">Rechazado</div>
                                    </div>
                        }
                        {
                            !checked && 
                            <div className="btn-aprove disabled active col-lg-auto">
                                <div className="btn-label absolute-center">En revision</div>
                            </div>
                        }
                    
                    </div>
                    </div>
                </React.Fragment>
                )
            }else if (this.state.form === undefined && this.state.status=== 'success'){
                return(
                    <React.Fragment>
                    <h1> no hay Formularios con este id</h1>
                    </React.Fragment>
                )
            }else{
                    return(
                        <React.Fragment>
                            <h1> Cargando espera mientras carga</h1>
                        </React.Fragment>
                    )
            }
        }

       
    }
}
export default NewDetails;