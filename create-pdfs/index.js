module.exports =(data) =>{
    var user=data.pdfInfo.user;
    var observations=`<div class="fullWidthText">
                        <div class="boldC">
                            Observaciones:
                        </div>
                        <div class="justifyP">
                            ${user.observations}
                                    </div>
                        </div>
                        <div class="fullWidthText">
                            <div class="justifyP">
                            Cordialmente,

                            </div>
                        </div> `;
    
    var ejecuta=` `;
    var suscribio=` `;
    
    if(data.pdfInfo.data===1){
        observations=data.observations!==''? observations :'';

        return `
        <!doctype html>
        <html style="zoom: 0.45;">
           <head>
              <meta charset="utf-8">
              <title>PDF Certificado Metrolinea</title>
              <style>
              
                .image-container{
                    height: 70px;
                    width: 150px;
                    position: relative;
                    background:red;
                    overflow:hidden;
                }
                .image {
                    width: 100%;
                    max-width: 150px;
                    height: 250px;
                    top:-80px;
                    background-size: contain;
                    position:absolute;
                }
                html {
                    height: 100%;
                    width: 100%;
                }
                body {
                    padding:20px 50px 100px 50px;
                    width:100%;
                    height: 100%;
                    position:relative;
                    box-sizing: border-box;           
                    margin: 0;
                }
                .header{
                    height: 120px;
                    border-bottom: 2px solid yellow;
                    width: calc(100% - 50px);
                    position:absolute;
                    top:80px;
                    left:25px;
                }
                .body{
                    height:auto;
                    width:100%;
                    padding: 30px 50px;
                    box-sizing: border-box;
                }
                .footer {
                    height: 100%;
                    width: calc(100% - 50px);
                    position: absolute;
                    bottom: 110px;
                    left: 25px;
                }
                
                .section {
                    margin: 10;
                    padding: 10;
                    flex-grow: 1
                }
                .metrolineaImage{
                    width:120px;
                    height:100px;
                    background-size:100%
                }
                .footerContent{
                    position:absolute;
                    height:60px;
                    width:100%;
                    bottom:0;
                    left:0;
                    border-top: 1px solid yellow;
                    padding-top:10px
                }
                .left{
                    margin: 10px;
                    padding: 10px;
                    width:50%;
                    height:100%;
                    float:left;
                }
                .rigth{
                    margin: 10px;
                    padding: 10px;
                    width:40%;
                    height:100%;
                    float:left;                
                    position: relative;
                }
                .text2{
                    font-size:20px;
                    font-family:'Roboto-Bold'
                }
                .fo {
                    text-align: right;
                    font-size: 22px;
                    width: 200px;
                    height: 20px;
                    font-weight: bold;
                    right: 50px;
                    top: 30px;
                    position: absolute;
                }
                .text1 {
                    font-size: 14px;
                }
             
                .title{
                    text-align:center;
                    padding:10px 0;
                    text-transform:uppercase;
                    font-weight:bold;
                    font-size:30px

                }
                .justifyP{
                    text-align:justify;
                    font-size:28px;
                    margin-bottom:10px
                }
                .boldP{
                    display:inline-block;
                    font-family:'Roboto';
                    font-weight:bold;
                    font-size:28px;
                    float:left;
                    text-align:justify
                }
                .flexRow{
                    width:100%;
                    font-size:22px;
                    height:28px;
                    margin-bottom:15px;
                    margin-top: 5px
                }
                .col1{
                    width: 46%;
                    font-size:28px;
                    font-family:'Roboto-Bold';
                    float:left;
                }
                .col2{
                    width: 50%;
                    font-size:28px;
                    text-align:justify;
                    float:left;
                }
                .fullWidthText{
                    margin-bottom:30px;
                    margin-top: 30px;
                    width:100%;
                    text-align:justify;
                    padding: 0 30px;
                    box-sizing: border-box
                }
                .contractTitle{
                    margin-top: 10px;
                }
                .footerText{
                    text-align:center;
                    font-size:16px;
                }
                .footerTextContainer{
                    height: 16px;
                    flex-grow: 1;
                    position:relative
                }
                a.footerText {
                    position: absolute;
                    transform: translate(-50%,-50%);
                    left: 50%;
                    top: 50%;
                }
                .contractData{
                    margin-bottom:'10px'
                }
                .boldC{
                    display:inline-block;
                    font-size: 28px;
                    text-align:justify;
                    font-weight:bold
                }
              </style>
           </head>
           <body>
                <header id="pageHeader" class="header" style="zoom: 0.45;">
                    <div class="left">
                        <div class="image-container">
                            <img class="image" src="http://104.248.54.46:3900/static/media/logo-blanco.jpg" >
                        </div>
                        <div class="text1">Nit.830.507.387-3</div>
                    </div>
                    <div class="rigth">
                        <div class="fo">
                            <div class="text2">20-23.1.1.F0</div>
                        </div>
                    </div>
                </header>
                <div class="body">
                    <div class="mainTitle">
                        <div class="title">Constancia</div>
                    </div>
                    <div class="fullWidthText">
                        <div class="justifyP">
                            La suscrita Profesional Universitario I Talento Humano, de la Sociedad Metrolinea
                            S. A. hace constar que:
                        </div>
                    </div>
                    <div class="fullWidthText">
                        <div><span class="boldP">${user.name} ${user.first_surname} ${user.second_surname}, </span>
                        <span class="justifyP"> identificado con la cédula de ciudadanía No. ${user.identification} expedida en ${user.expedition_place},
                        labora en esta empresa desde el día  ${user.fecha.dayCalendarString} (${user.fecha.calendarDay}) de ${user.fecha.monthString} de ${user.fecha.year}, mediante contrato a término ${user.contract_name}, en el cargo de ${user.job_name}, de la Sociedad Metrolinea S. A. </span>
                        </div>
                    </div>
                    <div class="contractData">
                        <div class="flexRow">
                            <div class="col1">
                                SUELDO BÁSICO:  
                            </div>
                            <div class="col2">$ ${user.salary}
                            </div>
                        </div>
                        
                    </div>
                    <div class="fullWidthText">
                        <div class="justifyP">
                            Se expide a solicitud del interesado, en la ciudad de Bucaramanga a ${user.today.dayCalendarString} (${user.today.calendarDay}) día(s) del mes de ${user.today.monthString} de ${user.today.year}. Se adhiere y anula el recibo de 
                            compra de estampilla Pro Hospitales por valor de tres mil pesos m/cte. ($3.000) y 
                            Ordenanza por valor de Trescientos pesos mcte ($300).

                        </div>
                    </div>
                    ${observations}
                </div>
                <footer id="pageFooter" class="footer" style="zoom: 0.45;">
                    <div class="footerContent">
                        <div class="footerTextContainer">
                            <div class="footerText">Autopista Floridablanca N° 86-30, Estación Provenza Occidental, Barrio Diamante II</div>
                        </div>
                        <div class="footerTextContainer">
                            <div class="footerText">Teléfono: 6929824 Bucaramanga.</div>
                        </div>
                        <div class="footerTextContainer">
                            <div class="footerText">
                                <a src='www.metrolinea.gov.co'>
                                    www.metrolinea.gov.co
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            
           </body>
        </html>
        `;
    }else if(data.pdfInfo.data===0){
        if(data.pdfInfo.contracts !==undefined){
            var contractArrayEjecuta= data.pdfInfo.contracts.ejecuta;
            var contractArraySuscribio= data.pdfInfo.contracts.suscribio;
            if(contractArrayEjecuta.length>=1){
                contractArrayEjecuta=contractArrayEjecuta.map((contract,i)=>{
                    var detalles;
                    if(contract.details!==undefined){
                            detalles=`<div class="flexRow2">
                            <div class="col1">
                                DETALLES:  
                            </div>
                            <div class="col2">
                                ${contract.details}
                            </div>
                        </div>`;
                    }else{
                        detalles='';
                    }
                    return(
                        `<div  class="contractData">
                            <div class="contractTitle">
                                <div class="boldP">Contrato de Prestación de Servicios No. ${contract.contract_number} de ${contract.year}
                                </div>
                            </div>
                            <div class="boldP">OBJETO: 
                            </div>
                            
                            <div class="justifyP">${contract.object}
                            </div>
                            
                            <div class="flexRow2">
                                <div class="col1">
                                    VALOR DEL CONTRATO:  
                                </div>
                                <div class="col2">
                                    (${contract.value})
        
                                </div>
                            </div>
                            <div class="flexRow2">
                                <div class="col1">
                                    PLAZO DE CONTRATO:  
                                </div>
                                <div class="col2">
                                    ${contract.execution_time}
        
                                </div>
                            </div>
                            <div class="flexRow2">
                                <div class="col1">
                                    INTERVENTOR:  
                                </div>
                                <div class="col2">
                                    ${contract.supervisor}
        
                                </div>
                            </div>
                            <div class="flexRow2">
                                <div class="col1">
                                    FECHA DE INICIO:  
                                </div>
                                <div class="col2">
                                    ${contract.date}
        
                                </div>
                            </div>
                            <div class="flexRow2">
                                <div class="col1">
                                    FECHA DE TERMINACIÓN:  
                                </div>
                                <div class="col2">
                                    ${contract.finish_date}
        
                                </div>
                            </div>
                            
                            ${detalles}
                        </div>`
                    );
                });
                
            ejecuta=` <div>
                    <div class="fullWidthText">
                        <div class="styleboldP"><span class="boldP">${user.name}</span><span class="justifyP">, identificado con la cédula de ciudadanía No. ${user.identification} expedida en Pamplona (N. de Santander), ejecuta con Metrolínea S.A., el(los) siguiente(s) CONTRATO(S) DE PRESTACION DE SERVICIOS:</span>
                        </div>
                    </div>
                    <div>${contractArrayEjecuta}</div>
            </div>`;
            }
            if(contractArraySuscribio.length>=1){
    
                contractArraySuscribio=contractArraySuscribio.map((contract,i)=>{
                    var detalles;
                    if(contract.details!==undefined){
                            detalles=`<div class="flexRow2">
                            <div class="col1">
                                DETALLES:  
                            </div>
                            <div class="col2">
                                ${contract.details}
                            </div>
                        </div>`;
                    }else{
                        detalles='';
                    }
                    return(
                        `<div  class="contractData">
                        <div class="contractTitle">
                            <div class="boldP">Contrato de Prestación de Servicios No. ${contract.contract_number} de ${contract.year}
                            </div>
                        </div>
                        <div class="boldP">OBJETO: 
                        </div>
                        
                        <div class="justifyP">${contract.object}
                        </div>
                        
                        <div class="flexRow2">
                            <div class="col1">
                                VALOR DEL CONTRATO:  
                            </div>
                            <div class="col2">
                                (${contract.value})
    
                            </div>
                        </div>
                        <div class="flexRow2">
                            <div class="col1">
                                PLAZO DE CONTRATO:  
                            </div>
                            <div class="col2">
                                ${contract.execution_time}
    
                            </div>
                        </div>
                        <div class="flexRow2">
                            <div class="col1">
                                INTERVENTOR:  
                            </div>
                            <div class="col2">
                                ${contract.supervisor}
    
                            </div>
                        </div>
                        <div class="flexRow2">
                            <div class="col1">
                                FECHA DE INICIO:  
                            </div>
                            <div class="col2">
                                ${contract.date}
    
                            </div>
                        </div>
                        <div class="flexRow2">
                            <div class="col1">
                                FECHA DE TERMINACIÓN:  
                            </div>
                            <div class="col2">
                                ${contract.finish_date}
    
                            </div>
                        </div>
                            ${detalles}
                        </div>`
                    );
                });
                suscribio=` <div>
                        <div class="fullWidthText">
                            <div class="styleboldP"><span class="boldP">${user.name}</span><span class="justifyP">, identificado con la cédula de ciudadanía No. ${user.identification} expedida en Pamplona (N. de Santander), suscribió con Metrolínea S.A., el(los) siguiente(s) CONTRATO(S) DE PRESTACION DE SERVICIOS:</span>
                            </div>
                        </div>
                        <div>${contractArraySuscribio}</div>
                    </div>`;
                }
        }else{
            ejecuta=` `;
    
            suscribio=``;
        }
        var user=user=data.pdfInfo.user;
        return `
        <!doctype html>
        <html>
           <head>
              <meta charset="utf-8">
              <title>PDF Certificado Metrolinea</title>
              <style>
              
              .image-container{
                height: 80px;
                width: 250px;
                position: relative;
                background:red;
                overflow:hidden;
            }
            .image {
                width: 100%;
                max-width: 250px;
                height: 270px;
                top:-90px;
                background-size: contain;
                position:absolute;
            }
                html {
                    height: 100%;
                    width: 100%;
                }
                body {
                    padding:20px 50px 100px 50px;
                    width:100%;
                    height: 100%;
                    position:relative;
                    box-sizing: border-box;           
                    margin: 0;
                }
                .header{
                    height: 120px;
                    border-bottom: 2px solid yellow;
                    width:100%;
                    position:absolute;
                    top:-40px;
                }
                .body{
                    height:auto;
                    width:100%;
                    padding: 30px 50px;
                    box-sizing: border-box;
                }
                .footer {
                    height: 100%;
                    width: calc(100% - 50px);
                    position: absolute;
                    bottom: 20px;
                    left: 25px;
                }
                
                .section {
                    margin: 10;
                    padding: 10;
                    flex-grow: 1
                }
                .metrolineaImage{
                    width:120px;
                    height:100px;
                    background-size:100%
                }
                .footerContent{
                    position:absolute;
                    height:60px;
                    width:100%;
                    bottom:0;
                    left:0;
                    border-top: 1px solid yellow;
                    padding-top:10px
                }
                .left{
                    margin: 10px;
                    padding: 10px;
                    width:50%;
                    height:100%;
                    float:left;
                }
                .rigth{
                    margin: 10px;
                    padding: 10px;
                    width:40%;
                    height:100%;
                    float:left;                
                    position: relative;
                }
                .text2{
                    font-size:20px;
                    font-family:'Roboto-Bold'
                }
                .fo {
                    text-align: right;
                    font-size: 22px;
                    width: 200px;
                    height: 20px;
                    font-weight: bold;
                    right: 50px;
                    top: 30px;
                    position: absolute;
                }
                .text1 {
                    font-size: 14px;
                }
             
                .title{
                    text-align:center;
                    padding:10px 0;
                    text-transform:uppercase;
                    font-weight:bold;
                    font-size:30px

                }
                .justifyP{
                    text-align:justify;
                    font-size:28px;
                    margin-bottom:10px
                }
                .boldP{
                    display:inline-block;
                    font-family:'Roboto';
                    font-weight:bold;
                    font-size:28px;
                    float:left;
                    text-align:justify
                }
                .flexRow{
                    width:100%;
                    font-size:22px;
                    height:28px;
                    margin-top: 20px
                }
                .flexRow2{
                    width:100%;
                    font-size:28px;
                    height:28px;
                    margin-top: 10px
                }
                .col1{
                    width: 46%;
                    font-size:28px;
                    font-weight:bold;
                    float:left;
                }
                .col2{
                    width: 50%;
                    font-size:28px;
                    text-align:justify;
                    float:left;
                }
                .fullWidthText{
                    margin-bottom:30px;
                    margin-top: 30px;
                    width:100%;
                    text-align:justify;
                    padding: 0 30px;
                    box-sizing: border-box
                }
                .fullWidthText2{
                    margin-bottom:30px;
                    margin-top: 30px;
                    width:100%;
                    text-align:justify;
                    padding: 0 30px;
                    box-sizing: border-box;
                    display:block;

                }
                .contractTitle{
                    margin-top: 20px;
                    margin-bottom: 10px;
                    width:100%;
                    display: block;
                    float:left;
                }
                .footerText{
                    text-align:center;
                    font-size:16px;
                }
                .footerTextContainer{
                    height: 16px;
                    flex-grow: 1;
                    position:relative
                }
                a.footerText {
                    position: absolute;
                    transform: translate(-50%,-50%);
                    left: 50%;
                    top: 50%;
                }
                .contractData{
                    margin-bottom:30px;
                    margin-top: 30px;
                    width:100%;
                    text-align:justify;
                    padding: 0 30px;
                    box-sizing: border-box
                }
                .boldC{
                    display:inline-block;
                    font-size: 28px;
                    text-align:justify;
                    font-weight:bold
                }
              </style>
           </head>
           <body>
                <header id="pageHeader" class="header">
                    <div class="left">
                        <div class="image-container">
                            <img class="image" src="https://scontent.fclo7-1.fna.fbcdn.net/v/t39.30808-6/216680881_4256083404453053_4237819903162822370_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=973b4a&_nc_ohc=UUnU1C7QgeYAX-SPbfn&_nc_ht=scontent.fclo7-1.fna&oh=c190b10b23598ec6da21e03a7e354026&oe=6122905E" >
                        </div>
                        <div class="text1">Nit.830.507.387-3</div>
                    </div>
                    <div class="rigth">
                        <div class="fo">
                            <div class="text2">20-23.1.1.F0</div>
                        </div>
                    </div>
                </header>
                <div class="body">
                    <div class="mainTitle">
                        <div class="title">Constancia</div>
                    </div>
                    <div class="fullWidthText">
                        <div class="justifyP">
                            La suscrita Profesional Universitario I Talento Humano, de la Sociedad Metrolinea
                            S. A. hace constar que:
                        </div>
                    </div>
                   ${ejecuta}
                   ${suscribio}
                </div>
                <footer id="pageFooter" class="footer">
                    <div class="footerContent">
                        <div class="footerTextContainer">
                            <div class="footerText">Autopista Floridablanca N° 86-30, Estación Provenza Occidental, Barrio Diamante II</div>
                        </div>
                        <div class="footerTextContainer">
                            <div class="footerText">Teléfono: 6929824 Bucaramanga.</div>
                        </div>
                        <div class="footerTextContainer">
                            <div class="footerText">
                                <a src='www.metrolinea.gov.co'>
                                    www.metrolinea.gov.co
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            
           </body>
        </html>
        `;
    }
}