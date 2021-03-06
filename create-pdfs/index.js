
module.exports =(data,logoRaw,logoRaw2) =>{
    var user=data.pdfInfo.user;
    var qr= data.qr;
    var logo= 'data:image/JPG;base64,'+logoRaw;
    var logoFirma= 'data:image/JPG;base64,'+logoRaw2;
    var style= `<style>
              
    .image-container{
        height: 42px;
        width: 300px;
        position: relative;
     }
     .image-container3{
        height: 200px;
        width: 200px;
        position: relative;
     }
     .image {
        width: 300px;
        height: 42px;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .image-firma {
        width: 200px;
        height: 200px;
        background-size: contain;
        background-repeat: no-repeat;
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
        height: 160px;
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
        text-align:justify
    }
    .boldD{
        display:inline-block;
        font-family:'Roboto';
        font-weight:bold;
        font-size:28px;
        text-align:justify;
        text-transform:uppercase;
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
        position:relative;
        box-sizing: border-box;
    }
    .col2{
        width: 54%;
        float: left;
        font-size:28px;
        position:relative;
        box-sizing: border-box;
        overflow:hidden;
    }
    .fullWidthText{
        margin-bottom:30px;
        margin-top:30px;
        width:100%;
        text-align:justify;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .fullWidthText2{
        margin-bottom:30px;
        margin-top:30px;
        width:100%;
        text-align:justify;
        padding: 20px 30px;
        box-sizing: border-box;
    }
    .contractTitle{
        margin-top: 10px;
        width:100%;
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
        margin-bottom:10px;
        width:100%;
    }
    .boldC{
        display:inline-block;
        font-size: 28px;
        text-align:justify;
    }
    .containerInfo{
        width:100%;
        height:auto;
        box-sizing: border-box;
    }
    .emptyDetail{
        height:40px;
        width:100%;
    }
    .qrContainer:{
        position: relative;
        height:200px;
        width:100%
    }
    .image-container2{
        width:100%;
        max-width:120px;
        margin: 0 auto;
        height:120px;
        position: relative;
    }
    .metrolineaQR:{
        width:120px;
        height:120px;
        background-size:100%;
    }
  </style>`;
    var observations=`<div class="fullWidthText">
                        <div class="boldC">
                            Observaciones:
                        </div>
                        <div class="justifyP">
                            ${user.observations}
                                    </div>
                        </div>`;
    
    var ejecuta=` `;
    var suscribio=` `;
    if(data.pdfInfo.data===1){
        observations=user.observations!==''? observations :'';

        return `
        <!doctype html>
        <html style="zoom: 0.45;">
           <head>
              <meta charset="utf-8">
              <title>PDF Certificado Metrolinea</title>
             ${style}
           </head>
           <body>
                <header id="pageHeader" class="header" style="zoom: 0.45;">
                    <div class="left">
                        <div class="image-container">
                            <img class="image" src=${logo}>
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
                        <span class="justifyP"> identificado con la c??dula de ciudadan??a No. ${user.identification} expedida en ${user.expedition_place},
                        labora en esta empresa desde el d??a  ${user.fecha.dayCalendarString} (${user.fecha.calendarDay}) de ${user.fecha.monthString} de ${user.fecha.year}, mediante contrato a t??rmino ${user.contract_name}, en el cargo de ${user.job_name}, de la Sociedad Metrolinea S. A. </span>
                        </div>
                    </div>
                    <div class="contractData">
                        <div class="flexRow">
                            <div class="col1">
                                SUELDO B??SICO:  
                            </div>
                            <div class="col2">$ ${user.salary}
                            </div>
                        </div>
                        
                    </div>
                    <div class="fullWidthText">
                        <div class="justifyP">
                            Se expide a solicitud del interesado, en la ciudad de Bucaramanga a ${user.today.dayCalendarString} (${user.today.calendarDay}) d??a(s) del mes de ${user.today.monthString} de ${user.today.year}. Se adhiere y anula el recibo de 
                            compra de estampilla Pro Hospitales por valor de tres mil pesos m/cte. ($3.000) y 
                            Ordenanza por valor de Trescientos pesos mcte ($300).

                        </div>
                    </div>
                    ${observations}
                    
                    <div class="fullWidthText">
                        <div class="justifyP">
                        Cordialmente,

                        </div>
                    </div>
                    <div class="image-container3">
                        <img class="image-firma" src=${logoFirma}>
                    </div>
                    <div class="fullWidthText">
                        <div><span class="boldP">LUZ MARINA PE??A QUINTAN </span><br><span class="boldP">PUI Talento Humano</span>
                        </div>
                    </div> 
                    <div class="qrContainer">
                        <div class="mainTitle">
                            <div class="title">QR DEL CERTIFICADO:</div>
                        </div>
                        <div class="image-container2">
                            <img class="metrolineaQr" src=${data.qr}>
                        </div>
                    </div>
                </div>
                <footer id="pageFooter" class="footer" style="zoom: 0.45;">
                    <div class="footerContent">
                        <div class="footerTextContainer">
                            <div class="footerText">Autopista Floridablanca N?? 86-30, Estaci??n Provenza Occidental, Barrio Diamante II</div>
                        </div>
                        <div class="footerTextContainer">
                            <div class="footerText">Tel??fono: 6929824 Bucaramanga.</div>
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
                    var bDate,fDate;
                    bDate= new Date(contract.date);
                    fDate= new Date(contract.finish_date);
                    bDate = bDate.getDate() + "-" + (bDate.getMonth() +1) + "-" + bDate.getFullYear();
                    fDate = fDate.getDate() + "-" + (fDate.getMonth() +1) + "-" + fDate.getFullYear();
                    contractArrayEjecuta[i].fDate=fDate;
                    contractArrayEjecuta[i].bDate=bDate;
                    if(contract.details!==''){
                        detalles=`<div class="fullWidthText">
                            <div class="col1">
                                <span class="boldP">DETALLES:  </span>
                            </div>
                            <div class="col2">
                                <div class="justifyP">${contract.details}</div>
                            </div>
                        </div>`;
                    }else{
                        detalles=`<div class="emptyDetail"></div>`;
                    }
                    return(
                        `<div class="containerInfo">
                            <div class="fullWidthText">
                                <span class="boldP"><br>${contract.contract_name} No. ${contract.contract_number} de ${contract.year}</span>
                            </div>
                            <div class="fullWidthText">
                            <br><span class="boldP">OBJETO: '</span><span class="justifyP">${contract.object}'</span>
                            </div>
                            
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">VALOR DEL CONTRATO: </span> 
                                </div>
                                <div class="col2">
                                    <div class="justifyP">${contract.value_string} $(${contract.value})</div>

                                </div>
                            </div>
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">PLAZO DE CONTRATO: </span> 
                                </div>
                                <div class="col2">
                                    ${contract.execution_time}

                                </div>
                            </div>
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">INTERVENTOR:  </span> 
                                </div>
                                <div class="col2">
                                    ${contract.supervisor_name}

                                </div>
                            </div>
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">FECHA DE INICIO:  </span>
                                </div>
                                <div class="col2">
                                    ${contract.bDate}

                                </div>
                            </div>
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">FECHA DE TERMINACI??N:  </span>
                                </div>
                                <div class="col2">
                                    ${contract.fDate}
                                </div>
                            </div>
                            ${detalles}
                        </div>`);
                });
                
            ejecuta=`
                    <div class="fullWidthText2">
                        <div class="styleboldP"><span class="boldP">${user.name}</span><span class="justifyP">, identificado con la c??dula de ciudadan??a No. ${user.identification}, <span class="boldD">ejecuta</span> con Metrol??nea S.A., el(los) siguiente(s) CONTRATO(S) DE PRESTACION DE SERVICIOS PROFESIONALES:</span>
                        </div>
                    </div>
                    ${contractArrayEjecuta}
           `;
            }
            if(contractArraySuscribio.length>=1){
    
                contractArraySuscribio=contractArraySuscribio.map((contract,i)=>{
                    var bDate,fDate;
                    bDate= new Date(contract.date);
                    fDate= new Date(contract.finish_date);
                    bDate = bDate.getDate() + "-" + (bDate.getMonth() +1) + "-" + bDate.getFullYear();
                    fDate = fDate.getDate() + "-" + (fDate.getMonth() +1) + "-" + fDate.getFullYear();
                    contractArraySuscribio[i].fDate=fDate;
                    contractArraySuscribio[i].bDate=bDate;
                    var detalles;
                    if(contract.details!==''){
                        detalles=`<div class="fullWidthText">
                            <div class="col1">
                                <span class="boldP">DETALLES:  </span>
                            </div>
                            <div class="col2">
                                <div class="justifyP">${contract.details}</div>
                            </div>
                        </div>`;
                    }else{
                        detalles=`<div class="emptyDetail"></div>`;
                    }
                    return(
                        `<div class="containerInfo">
                            <div class="fullWidthText">
                                <span class="boldP"><br>${contract.contract_name}  No. ${contract.contract_number} de ${contract.year}</span>
                            </div>
                            <div class="fullWidthText">
                                <br><span class="boldP">OBJETO: '</span><span class="justifyP"> ${contract.object}'</span>
                            </div>
                            
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">VALOR DEL CONTRATO: </span> 
                                </div>
                                <div class="col2">
                                    <div class="justifyP">${contract.value_string} $(${contract.value})</div>
                                </div>
                            </div>
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">PLAZO DE CONTRATO: </span> 
                                </div>
                                <div class="col2">
                                    ${contract.execution_time}

                                </div>
                            </div>
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">INTERVENTOR:  </span> 
                                </div>
                                <div class="col2">
                                    ${contract.supervisor_name}
                                </div>
                            </div>
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">FECHA DE INICIO:  </span>
                                </div>
                                <div class="col2">
                                    ${contract.bDate}
                                </div>
                            </div>
                            <div class="fullWidthText">
                                <div class="col1">
                                    <span class="boldP">FECHA DE TERMINACI??N:  </span>
                                </div>
                                <div class="col2">
                                    ${contract.fDate}
                                </div>
                            </div>
                            ${detalles}
                        </div>`);
                });
            suscribio=`
                <div class="fullWidthText2">
                    <div class="styleboldP"><span class="boldP"><br>${user.name}</span><span class="justifyP">, identificado con la c??dula de ciudadan??a No. ${user.identification}, <span class="boldD">suscribi??</span> con Metrol??nea S.A., el(los) siguiente(s) CONTRATO(S) DE PRESTACION DE SERVICIOS PROFESIONALES:</span>
                    </div>
                </div>
                ${contractArraySuscribio}
            `;
            }
        }else{
            ejecuta=` `;
    
            suscribio=``;
        }
        var user=user=data.pdfInfo.user;
        return `
        <!doctype html>
        <html  style="zoom: 0.45;">
           <head>
              <meta charset="utf-8">
              <title>PDF Certificado Metrolinea</title>
              ${style}
           </head>
           <body>
                <header id="pageHeader" class="header" style="zoom: 0.45;">
                    <div class="left">
                        <div class="image-container">
                            <img class="image" src=${logo}>
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
                    <div class="fullWidthText">
                        <div class="justifyP">
                        Cordialmente,

                        </div>
                    </div>
                    <div class="image-container3">
                        <img class="image-firma" src=${logoFirma}>
                    </div>
                    <div class="fullWidthText">
                        <div><span class="boldP">LUZ MARINA PE??A QUINTAN </span><br><span class="boldP">PUI Talento Humano</span>
                        </div>
                    </div> 
                    <div class="qrContainer">
                        <div class="mainTitle">
                            <div class="title">QR DEL CERTIFICADO:</div>
                        </div>
                        
                        <div class="image-container2">
                            <img class="metrolineaQr" src=${data.qr}>
                        </div>
                    </div>
                </div>
                <footer id="pageFooter" class="footer" style="zoom: 0.45;">
                    <div class="footerContent">
                        <div class="footerTextContainer">
                            <div class="footerText">Autopista Floridablanca N?? 86-30, Estaci??n Provenza Occidental, Barrio Diamante II</div>
                        </div>
                        <div class="footerTextContainer">
                            <div class="footerText">Tel??fono: 6929824 Bucaramanga.</div>
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