class UI{
    
    constructor(){
        this.markers=new L.LayerGroup();
        this.mapa=this.inicializarMapa();
    }
    inicializarMapa(){
        const map=L.map('mapa').setView([19.390519,-99.3739778], 9);

        const enlaceMapa='<a href="http://openstreetmap.org">OpenStreetMap</a>';

        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                attribution: '&copy'+enlaceMapa+'Contributors',
                maxZoom:18
            }).addTo(map);
            return map;
    }

     mostrarEstablecimientos(){
        apis.obtenerDatos().then(datos=>{
            const resultado=datos.respuestaJSON.results;

            this.mostrarPines(resultado);
        });
    }
    mostrarPines(datos){
        //limpiar markers
        this.markers.clearLayers();

        //recorrer establecimientos:
        datos.forEach(dato => {
            //destructuring:
            const{latitude,longitude,calle,regular,premium}=dato;

            const opcionesPopup=L.popup()
            .setContent(`
            <p>Calle: ${calle}</p>
            <p><b>Regular: </b>${regular}</p>
            <p><b>Premium: </b>${premium}</p>
            `);
            //agrego pin:
            const marker=new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopup);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }
    obtenerSugerencias(busqueda){
        apis.obtenerDatos()
        .then(datos=>{
            const resultados=datos.respuestaJSON.results;

            this.filtrarSugerencias(resultados,busqueda);
        })
    }
    //filtra
    filtrarSugerencias(resultado,busqueda){
        //filtra
            const filtro=resultado.filter(filtro=>filtro.calle.indexOf(busqueda)!==-1)
                console.log(filtro);
                this.mostrarPines(filtro);
        //muestra
    }
}