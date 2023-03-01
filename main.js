/**
 * Tipo de objeto - Operacion
 * @typedef {Object} Operacion
 * @property {string} id - d987d-as2a1-2fy32cv-dvsdv323
 * @property {string} descripcion - Coca-Cola
 * @property {string} monto - 750.5
 * @property {string} tipoOperacion - Gasto | Ganancia
 * @property {string} categoria - Alimentos
 * @property {string} fecha - 2023-02-15
 */

/**
 * @description
 * Lista de operaciones.
 * @type {Array<Operacion>}
 */
let operaciones = [];

/**
 * Tipo de objeto - Categoria
 * @typedef {Object} Categoria
 * @property {string} id - d987d-as2a1-2fy32cv-dvsdv323
 * @property {string} texto - Coca-Cola
 */

/**
 * @description
 * Lista de categoria de operaciones
 * @type {Array<Categoria>}
 */
let categoriaItem = [];


/**
 * Tipo de objeto - OperacionClasificada
 * @typedef {Object} OperacionClasificada
 * @property {string} id - d987d-as2a1-2fy32cv-dvsdv323
 * @property {string} descripcion - Coca-Cola
 * @property {string} monto - 750.5
 * @property {string} tipoOperacion - Gasto | Ganancia
 * @property {string} categoria - Alimentos
 * @property {string} fecha - 2023-02-15
 * @property {string} mes - 02
 * @property {string} anio - 2023
 */

/**
 * @description
 * Mapa de operaciones clasificadas por Anio y Mes.
 * Map<anio,Map<mes,OperacionClasificada>>
 * @type {Map<number,Map<number,OperacionClasificada>>}
 */
let operacionesMesAnio = new Map();

/**
 * Tipo de objeto - ResumenMes
 * @typedef {Object} ResumenMes
 * @property {number} ganancias - 500.0
 * @property {number} gastos - 500.0
 * @property {number} mes - 5
 * @property {number} anio - 2023
 */

/**
 * @description
 * Mapa de Ganancias y Gastos clasificados por Anio y Mes.
 * @type {Map<number,ResumenMes>}
 */
let totalMesAnio = new Map();


/**
 * @description
 * Obtener un elemento.
 * ej.
 * $('#contenedor') - Elemento por Id
 * @param {string} element 
 * @returns {HTMLElement}
 */
const $ = (element) => document.querySelector(element);

/**
 * @description
 * Obtener lista de elementos.
 * ej.
 * $('.parrafo') - Elementos por clase
 * @param {string} element 
 * @returns {Array<HTMLElement>}
 */
const $$ = (element) => document.querySelectorAll(element);

/**
 * @description
 * Meses del anio
 * @type {Map<number,string>}
 */
const Meses = new Map(Object.entries({
  0: 'Ninguno',
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre'
}));


/**
 * @description
 * Tiene el fin de ser un Helper para convertir
 * Map en JSON
 */
const replacer = (key, value) => {
 if(value instanceof Map) {
   return {
     dataType: 'Map',
     value: Array.from(value.entries()),
   };
 } else {
   return value;
 }
};

/**
 * @description
 * Tiene el fin de ser un Helper para convertir
 * JSON en Map
 */
const reviver = (key, value) => {
 if(typeof value === 'object' && value !== null) {
   if (value.dataType === 'Map') {
     return new Map(value.value);
   }
 }
 return value;
};


window.addEventListener("load", (event) => {

  // #region 2) Asginar elementos HTML a variables
  const $bntBalance = $("#btn-balance");
  const $balanceContiner = $("#balance-continer");
  const $operacionescontenedor = $(".operaciones-contenedor");

  let $ganancias = $("#ganancias");
  let $gastos = $("#gastos");
  const $balance = $("#balance");
  const $sinOperaciones = $("#sin-operaciones");
  const $resultadosOperacion = $("#resultados-operacion");

  const $nuevaOperacion = $("#ver-operacion");
  const $conOperaciones = $("#con-operaciones");
  const $catergoriaSelect = $("#catergoria-select");
  const $operaciones = $("#operaciones");
  const $idParaCambiar = $("#idParaCambiar");
  const $editarOperacion = $("#editar-operacion");
  const $cancelarOperaciones = $("#cancelar-operacion");
  const $editarDescripcion = $("#editar-descripcion");
  const $editarMonto = $("#editar-monto");
  const $editarTipoOperacion = $("#editar-tipo-operacion");
  const $editarCategoriasSelect = $("#editar-categorias-select");
  const $editarFecha = $("#editar-fecha");
  const $botonCancelarEditarOperacion = $("#boton-cancelar-editar-operacion");
  const $botonEditarOperacion = $("#boton-editar-operacion");
  const $botonCancelarOperacion = $("#boton-cancelar-operacion");

  const $categoria = $("#categoria");
  const $btnCategorias = $("#btn-categorias");
  const $continerCategorias = $("#continer-categorias");
  const $inputCategoria = $("#input-categoria");
  const $categoriaInput = $("#categoria-input");
  const $btnAgregarCategoria = $("#btn-agregar-categoria");
  const $categorias = $("#categorias");
  const $editarCategoriaBoton = $(".editar-categoria-boton");
  const $editarCategoriaInput = $("#editar-categoria-input");
  const $IdParaCambiar = $("#IdParaCambiar");
  const $editarCategoria = $("#editar-categoria");

  const $nuevasOperaciones = $("#nuevas-operaciones");
  const $agregarOperacion = $("#agregar-operacion");
  const $descriptionInput = $("#description-input");
  const $monto = $("#monto");
  const $tipoOperacion = $("#tipo-operacion");
  const $selectCategoria = $("#catergoria-select");
  const $fecha = $("#fecha-input");
  const $btnCancelarOperacion = $("#cancelar-operacion");

  const $ocultarFiltros = $("#ocultar-filtros");
  let $filtros = $("#filtros");
  let $filtroTipo = $("#filtro-tipo");
  let $filtroCategoria = $("#filtro-categoria");
  let $filtroFecha = $("#filtro-fecha");
  let $filtroOrden = $("#filtro-orden");


  const $btnReportes = $("#btn-reportes");
  const $reportes = $("#reportes");
  const $sinReportes = $("#sin-reportes");
  const $conReportes = $("#con-reportes");
  const $categoriaMayorGanancia = $("#categoria-mayor-ganancia");
  const $categoriaMayorGananciaMonto = $("#categoria-mayor-ganancia-monto");
  const $categoriaMayorGasto = $("#categoria-mayor-gasto");
  const $categoriaMayorGastoMonto = $("#categoria-mayor-gasto-monto");

  const $mesMayorGanancia = $("#mes-mayor-ganancia");
  const $mesMayorGananciaMonto = $("#mes-mayor-ganancia-monto");
   
  const $mesMayorGasto = $("#mes-mayor-gasto");
  const $mesMayorGastoMonto = $("#mes-mayor-gasto-monto");
   
  const $totalesPorCategoria = $("#reporte-categorias");
  const $totalesPorMes = $("#reporte-mes");
   
  const $categoriaMayorBalance = $("#categoria-mayor-balance");
  const $categoriaMayorBalanceMonto = $("#categoria-mayor-balance-monto");

  // #endregion

  /**
 * Mediante una operacion obtiene los datos
 * de Anio y Mes en un array
 * es decir en 
 *  [0] obtenemos el Anio
 *  [1] obtenemos el Mes
 *  [2] obtenemos el Dia
 * @param {Operacion} operacion 
 * @returns {[int,int]}
 */
  const obtenerDatosFecha = (operacion) => {
    let _fechaArray = operacion.fecha.split('-');
    let _fecha = new Date(Number(_fechaArray[0]), Number(_fechaArray[1]), Number(_fechaArray[2]));
    let anio = _fecha.getFullYear();
    let mes = _fecha.getMonth();
    let dia = _fecha.getDay();
    return [anio, mes, dia];
  }

  /**
   * @description
   *  Cada vez que se realiza algun cambio en operaciones
   *  se almacenan los mismos objetos de operaciones
   *  por mes y por anio en un map anidado dentro de otro map
   */
  const refrescarOperacionesMesAnio = () => {

    operaciones.forEach(x => {

      //Desestructuracion
      const [anio, mes, dia] = obtenerDatosFecha(x);

      operacionesMesAnio = new Map();

      if (!operacionesMesAnio.get(anio))
        operacionesMesAnio.set(anio, new Map());

      if (!operacionesMesAnio.get(anio).get(mes))
        operacionesMesAnio.get(anio).set(mes, []);

      operacionesMesAnio.get(anio).get(mes).push(
        {
          ...x,
          anio,
          mes
        }
      );

      localStorage.setItem("keyOperacionesMesAnio", JSON.stringify({ operacionesMesAnio }, replacer));
    })
  };

  /**
   * @description
   * Cada vez que se realiza algun cambio en operaciones
   * Vuelve a generar un mapa que almacena un objeto
   * Si en ese mes y en ese anio hay una operacion
   * empieza a sumar los gastos o las ganancias segun corresponda
   */
  const refrescarTotalMesAnio = () => {
    totalMesAnio = new Map();

    operaciones.forEach(x => {

      //Desestructuracion
      const [anio, mes, dia] = obtenerDatosFecha(x);

      if (!totalMesAnio.get(anio)) totalMesAnio.set(anio, new Map());
      if (!totalMesAnio.get(anio).get(mes)) {
        totalMesAnio.get(anio).set(mes, {
          ganancias: 0.0,
          gastos: 0.0,
          anio,
          mes
        });
      }

      if (x.tipoOperacion === 'Gasto')
        totalMesAnio.get(anio).get(mes).gastos += Number(x.monto);
      else
        totalMesAnio.get(anio).get(mes).ganancias += Number(x.monto);
    });

    localStorage.setItem("keyTotalMesAnio", JSON.stringify({ totalMesAnio }, replacer));

  };


  /**
   * @description
   *  1) Buscar categorias en keyCategoria desde el localStorage y almacenarlo en categoriaItem Linea(1)
   *  2) No se encuentra keyCategoria entonces generarlo y almacenarlo en categoriaItem Linea(1)
  */
  const loadCategorias = () => {
    if (JSON.parse(localStorage.getItem("keyCategoria")))
      categoriaItem = JSON.parse(localStorage.getItem("keyCategoria")).categoriaItem;
    else {
      if (!localStorage.getItem("keyCategoria")) {
        categoriaItem = [
          { id: 1, texto: "Todos" },
          { id: 2, texto: "Servicios" },
          { id: 3, texto: "transporte" },
          { id: 4, texto: "Alimentos" },
          { id: 5, texto: "Educacion" },
          { id: 6, texto: "Trabajo" },
          { id: 7, texto: "Varios" }
        ];
        localStorage.setItem("keyCategoria", JSON.stringify({ categoriaItem }));
      }
    }
  
  }

  /**
   * @description
   * Buscar operaciones en keyOperaciones desde el localStorage y almacenarlo en operaciones.
   */
  const loadOperaciones = () => {
    if (JSON.parse(localStorage.getItem("keyOperaciones"))){
      operaciones = JSON.parse(localStorage.getItem("keyOperaciones")).operaciones;

    }
    if(operaciones.length > 0)
    $sinOperaciones.classList.add('is-hidden');
      else
    $sinOperaciones.classList.remove('is-hidden');
  }

  /**
   * @description
   * Buscar operacionesMesAnio en keyOperacionesMesAnio desde el localStorage y almacenarlo en operacionesMesAnio.
   */
  const loadOperacionesMesAnio = () => {
    if (JSON.parse(localStorage.getItem("keyOperacionesMesAnio"))) {
      operacionesMesAnio = new Map(Object.entries(JSON.parse(localStorage.getItem("keyOperacionesMesAnio"), reviver)))
      operacionesMesAnio = operacionesMesAnio.get('operacionesMesAnio');
    }
  }

  /**
   * @description
   * Buscar operacionesMesAnio en keyOperacionesMesAnio desde el localStorage y almacenarlo en operacionesMesAnio.
   */
  const loadTotalMesAnio = () => {
    if (JSON.parse(localStorage.getItem("keyTotalMesAnio"))) {
      totalMesAnio = new Map(Object.entries(JSON.parse(localStorage.getItem("keyTotalMesAnio"), reviver)))
      totalMesAnio = totalMesAnio.get('totalMesAnio');
    }
  }

  /**
 * @description
 * Este metodo calcula el total de Ganancias y Gastos
 * se puede visualizar en la esquina superior izquierda,
 * en la pagina principal.
 */
  const total = () => {
    let ganancia = 0;
    let gasto = 0;
    let total = 0;
    $ganancias.innerHTML = 0;
    $gastos.innerHTML = 0;
    $balance.innerHTML = 0;
    operaciones.forEach((element) => {
      if (element.tipoOperacion === "Ganancia") {
        ganancia = ganancia += Number(element.monto);
        $ganancias.innerHTML = `${ganancia}`;
      }
      if (element.tipoOperacion === "Gasto") {
        gasto = gasto += Number(element.monto);
        $gastos.innerHTML = `${gasto}`;
      }
      total = ganancia - gasto;
      $balance.innerHTML = `${total}`
    });
  };

  /**
   * @description
   * Generar reportes de:
   * 1) Categoría con mayor balance.
   * 2) Mes con mayor ganancia.
   * 3) Mes con mayor gasto.
   * 4) Totales por categorías.
   * 5) Totales por mes.
   */
  const generarAdicionalesReporte = () => {

    let _mMGanancia = ['Ninguno', 0.0];
    let _mMGasto = ['Ninguno',0.0];
    let _cMBalance = ['Ninguno',0.0];

    let _totalesPorMes = new Map();
    let _categoria = new Map();

    totalMesAnio.forEach((x1,y) => {
        x1.forEach((x2,m) => {

          let mNombre = '';
          x2.ganancias = Number(x2.ganancias);
          x2.gastos = Number(x2.gastos);
       
          Meses.forEach((v,k) => {
              if(k == m){
                mNombre = v;
              }
          })
          //Mes con Mayor Ganancia
          if(_mMGanancia[0] === 'Ninguno' && x2.ganancias != 0.0)
          {
              _mMGanancia[0] = mNombre;
              _mMGanancia[1] = x2.ganancias;
              _totalesPorMes.set(mNombre,_mMGanancia[1]);

          }else{
            if(_mMGanancia[1] < x2.ganancias ){
              _mMGanancia[0] = mNombre;
              _mMGanancia[1] = x2.ganancias;
            }
          }


          //Mes con Mayor Gasto
          if(_mMGasto[0] === 'Ninguno' && x2.gasto != 0.0)
          {
              _mMGasto[0] = mNombre;
              _mMGasto[1] = x2.gastos; 
          }else{
            if(_mMGasto[1] < x2.gastos){
              _mMGasto[0] = mNombre;
              _mMGasto[1] = x2.gastos;
            }
          }

          if(!_totalesPorMes.get(mNombre) && x2.ganancias != 0.0)
          _totalesPorMes.set(mNombre,+x2.ganancias);
          else if(x2.gastos != 0.0)
              _totalesPorMes.set(mNombre,_totalesPorMes.get(mNombre)+x2.ganancias);

          if(!_totalesPorMes.get(mNombre) && x2.gastos != 0.0)
            _totalesPorMes.set(mNombre,-x2.gastos);
          else if(x2.gastos != 0.0)
            _totalesPorMes.set(mNombre,_totalesPorMes.get(mNombre)-x2.gastos);
        });

    });

      //Totales por categorías
      operaciones.forEach(o => {
       if(!_categoria.get(o.categoria))
         _categoria.set(o.categoria, o.tipoOperacion === 'Ganancia' ? Number(o.monto) : -Number(o.monto));
       else
         _categoria.set(o.categoria,_categoria.get(o.categoria)+(o.tipoOperacion === 'Ganancia' ? Number(o.monto) : -Number(o.monto)));
      })

      //Categoria con Mayor Balance
      _categoria.forEach((v,k) => {
        if(_cMBalance[0] == 'Ninguno') _cMBalance = [k,v];
        else if(_cMBalance < v) _cMBalance = [k,v];
      });

    try{
      // > Ganancia
      $mesMayorGanancia.innerHTML = _mMGanancia[0];
      $mesMayorGananciaMonto.innerHTML = _mMGanancia[1];
      
      // > Gasto
      $mesMayorGasto.innerHTML = _mMGasto[0];
      $mesMayorGastoMonto.innerHTML = _mMGasto[1];
      
      //Totales Categoria
      let contentTotalPorCategoria = '';
      _categoria.forEach((k,v) => {
        contentTotalPorCategoria += `
          <div class="columns is-mobile">
            <div class="column is-1 has-text-right mr-2">
              <span class="tag is-primary is-light">${k}</span>
            </div>
            <div class='column is-1 has-text-weight-semibold has-text-right has-text-success'>${v}</div>
          </div>
        `
      });
      $totalesPorCategoria.innerHTML = contentTotalPorCategoria;
      //Totales por mes
      let contentTotalPorMes = '';
      _totalesPorMes.forEach((k,v) => {
        contentTotalPorMes += `
        <div class="columns is-mobile">
          <div class="column is-1 has-text-right mr-2">
            <span class="tag is-primary is-light">${k}</span>
          </div>
          <div class='column is-1 has-text-weight-semibold has-text-right has-text-success'>${v}</div>
        </div>
      `
      });
      $totalesPorMes.innerHTML = contentTotalPorMes;

      //Categoria con Mayor Balance
      $categoriaMayorBalance.innerHTML = _cMBalance[0];
      $categoriaMayorBalanceMonto.innerHTML = _cMBalance[1];

    }catch(e){

    }
  };

  /**
   * @description
   * Carga los siguientes contenidos:
   * 1) Categorias.
   * 2) Operaciones.
   * 3) Operaciones categorizadas por anio y mes.
   * 4) Total clasificado por anio y mes.
   * 5) Cargar ganancias - gastos - total en esquina superior izquierda.
   */
  const loadContent = () => {

    loadCategorias();
    loadOperaciones();
    loadOperacionesMesAnio();
    loadTotalMesAnio();
    total();
    event.preventDefault();
  }

  /**
   * @description
   * Metodo local
   * 1) Recarga los datos.
   * 2) Agrega los elementos en variables.
   * 3) Asigna eventos a los elementos.
   */
  const local = () => {

    loadContent();

    // #region 3) Asignar eventos a los elementos.
    $bntBalance.addEventListener("click", (e) => {
      e.preventDefault();
      
      if (!$categoria.classList.contains("is-hidden")) {
        $categoria.classList.toggle("is-hidden");
      }
      if ($balanceContiner.classList.contains("is-hidden")) {
        $balanceContiner.classList.remove("is-hidden");
      }

      if (!$reportes.classList.contains('is-hidden')) {
        $reportes.classList.toggle('is-hidden');
      }

      if(operaciones.length > 0)
        $sinOperaciones.classList.add('is-hidden');
      else
        $sinOperaciones.classList.remove('is-hidden');
    });

    $filtroCategoria.innerHTML = '';
    // seleccion categoria en filtro
    for (let i in categoriaItem) {
      $filtroCategoria.innerHTML += `<option <option value=${categoriaItem[i].texto}>${categoriaItem[i].texto}</option>`;
    }

    // Eventos de categoria
    $btnAgregarCategoria.addEventListener("click", (e) => {
      e.preventDefault();
      AgregarCategoria();
      pintarCategorias();
    });

    $editarCategoriaBoton.addEventListener("click", () => {
      let $IdParaCambiar = $("#IdParaCambiar");
      let valor = categoriaItem.filter((x) => x.id == $IdParaCambiar.value);
      valor[0].texto = $editarCategoriaInput.value;
      $categoria.classList.toggle("is-hidden");
      $editarCategoria.classList.toggle("is-hidden");
      localStorage.setItem("keyCategoria", JSON.stringify({ categoriaItem }));

      pintarCategorias();
    });

    $botonCancelarOperacion.addEventListener("click", (e) => {
      $balanceContiner.classList.toggle("is-hidden");
      $editarOperacion.classList.toggle("is-hidden");
      $operacionescontenedor.classList.toggle("is-hidden");
      $operaciones.innerHTML = "";
      operaciones.forEach((element) => {
        $operaciones.innerHTML += ` 
            <div class="columns is-multiline is-mobile is-vcentered">
              <div class="column is-3-tablet is-6-mobile">${element.descripcion}</div>
              <div class="column is-3-tablet is-6-mobile has-text-right-mobile">${element.categoria}</div>
              <div class="column is-2-tablet has-text-grey is-hidden-mobile has-text-right-tablet">${element.fecha}</div>
              <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile has-text-danger">${element.monto}</div>
              <div class="column is-2-tablet is-6-mobile has-text-right">
                <p class="is-fullwidth">
                  <a href="#" class="mr-3 is-size-7 edit-link btn-editar-operacion" id=${element.id}>Editar</a>
                  <a href="#" class="mr-3 is-size-7 delete-link btn-eliminar-operacion" id=${element.id}>Eliminar</a>
                </p>
              </div>
            </div>`;
      });

      EditarEliminarOperaciones();
    });

    $botonEditarOperacion.addEventListener("click", () => {
      let $idParaCambiar = $("#idParaCambiar");
      let result = operaciones.filter((x) => x.id == $idParaCambiar.value);
      result[0].descripcion = $editarDescripcion.value;
      result[0].monto = $editarMonto.value;
      result[0].tipoOperacion = $editarTipoOperacion.value;
      result[0].categoria = $editarCategoriasSelect.value;
      result[0].fecha = $editarFecha.value;
      $balanceContiner.classList.toggle("is-hidden");
      $editarOperacion.classList.toggle("is-hidden");
      $operacionescontenedor.classList.toggle("is-hidden");
      $operaciones.innerHTML = "";
      operaciones.forEach((element) => {
        $operaciones.innerHTML += ` 
            <div class="columns is-multiline is-mobile is-vcentered">
              <div class="column is-3-tablet is-6-mobile">${element.descripcion}</div>
              <div class="column is-3-tablet is-6-mobile has-text-right-mobile">${element.categoria}</div>
              <div class="column is-2-tablet has-text-grey is-hidden-mobile has-text-right-tablet">${element.fecha}</div>
              <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile has-text-danger">${element.monto}</div>
              <div class="column is-2-tablet is-6-mobile has-text-right">
                <p class="is-fullwidth">
                  <a href="#" class="mr-3 is-size-7 edit-link btn-editar-operacion" id=${element.id}>Editar</a>
                  <a href="#" class="mr-3 is-size-7 delete-link btn-eliminar-operacion" id=${element.id}>Eliminar</a>
                </p>
              </div>
            </div>`;

      });
      EditarEliminarOperaciones();
      localStorage.setItem("keyOperaciones", JSON.stringify({ operaciones }));
    });

    $btnCategorias.addEventListener("click", (e) => {
      e.preventDefault();
      if (!$balanceContiner.classList.contains("is-hidden")) {
        $balanceContiner.classList.toggle("is-hidden");
      }
      if ($categoria.classList.contains("is-hidden")) {
        $categoria.classList.toggle("is-hidden");
      }
      if (!$reportes.classList.contains('is-hidden')) {
        $reportes.classList.toggle('is-hidden');
      }
      if (!$nuevasOperaciones.classList.contains("is-hidden")) {
        $nuevasOperaciones.classList.toggle("is-hidden");
      }

      
      pintarCategorias();

    });

    $cancelarOperaciones.addEventListener("click", () => {
      
      //$nuevasOperaciones.classList.toggle("is-hidden");
      //$balanceContiner.classList.toggle("is-hidden");
      $bntBalance.click();
    });



    // Categoria

    /**
     * @description
     * Agrega una categoria
     */
    const AgregarCategoria = () => {
      categoriaItem.push({
        id: uuid.v1(),
        texto: $categoriaInput.value
      });
      localStorage.setItem("keyCategoria", JSON.stringify({ categoriaItem }));
    };

    /**
     * @description
     * Vuelve a recargar las categorias en el sitio web.
     */
    const pintarCategorias = () => {
      $categorias.innerHTML = "";
      categoriaItem.forEach((element) => {
        $categorias.innerHTML += `
          <div class="mt-6" id="categorias">
              <div class="mb-3">
                <div class="columns is-vcentered is-mobile">
                  <div class="column" <span class="tag is-info is-light">${element.texto}</span>
                  </div>
                  <div class="column is-narrow has-text">
                    <p><a class="mr-4 is-size-7 edit-link btn-editar-categoria" id=${element.id}>Editar</a>
                      <a href="#" class="is-size-7 delete-link btn-eliminar-categoria"
                        id=${element.id}>Eliminar</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `;
      });
      eventoBtn();
    };

    /**
     * @description
     * Configura los botones que realizan acciones en categoria
     * Como eliminar / editar una categoria.
     */
    const eventoBtn = () => {
      const $$btnEliminarCategoria = $$(".btn-eliminar-categoria");
      $$btnEliminarCategoria.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          let IdCategoria = e.target.id;
          categoriaItem = categoriaItem.filter(
            (operacion) => operacion.id !== IdCategoria
          );
          localStorage.setItem("keyCategoria", JSON.stringify({ categoriaItem }));
          pintarCategorias();
        });
      });

      const $$btnEditarCategoria = $$(".btn-editar-categoria");
      $$btnEditarCategoria.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          let idCategoria = e.target.id;
          let resultadoEditar = categoriaItem.filter(
            (element) => element.id == idCategoria
          );

          $editarCategoria.classList.remove("is-hidden");
          $categoria.classList.add("is-hidden");
          
          $IdParaCambiar.value = idCategoria;
          $editarCategoriaInput.value = resultadoEditar[0].texto;
          localStorage.setItem("keyCategoria", JSON.stringify({ categoriaItem }));

        });

        let $cancelarCategoriaBoton = $(".cancelar-categoria-boton");   
        $cancelarCategoriaBoton.addEventListener("click", (e) => {
          e.preventDefault();
      
          //$categoria.classList.toggle("is-hidden");
          $editarCategoria.classList.toggle("is-hidden");

          $btnCategorias.click();
        });

      });

      
    };

    //Operaciones
    $agregarOperacion.addEventListener("click", (e) => {
      e.preventDefault();
      $nuevasOperaciones.classList.toggle("is-hidden");
      $balanceContiner.classList.toggle("is-hidden");

      if ($conOperaciones.classList.contains("is-hidden"))
        $conOperaciones.classList.toggle("is-hidden");

      operaciones.push({
        id: uuid.v1(),
        descripcion: $descriptionInput.value,
        monto: $monto.value,
        tipoOperacion: $tipoOperacion.value,
        categoria: $selectCategoria.value,
        fecha: $fecha.value,
      });
        localStorage.setItem("keyOperaciones", JSON.stringify({ operaciones }));
      
        
        refrescarOperacionesMesAnio();
        refrescarTotalMesAnio();
        total();
        $bntBalance.click();
        $operaciones.innerHTML = "";
        pintarOperaciones();
    });



    /**
     * @description
     * Recarga las operaciones con los datos nuevos en la pantalla principal.
     */
    const pintarOperaciones = () => {

      $operaciones.innerHTML = '';

      operaciones.forEach((element) => {

        $operaciones.innerHTML += ` 
                      <div class="columns is-multiline is-mobile is-vcentered">
                        <div class="column is-3-tablet is-6-mobile">${element.descripcion}</div>
                        <div class="column is-3-tablet is-6-mobile has-text-right-mobile">${element.categoria}</div>
                        <div class="column is-2-tablet has-text-grey is-hidden-mobile has-text-right-tablet">${element.fecha}</div>
                        <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile has-text-danger">${element.monto}</div>
                        <div class="column is-2-tablet is-6-mobile has-text-right">
                          <p class="is-fullwidth">
                            <a href="#" class="mr-3 is-size-7 edit-link btn-editar-operacion" id=${element.id}>Editar</a>
                            <a href="#" class="mr-3 is-size-7 delete-link btn-eliminar-operacion" id=${element.id}>Eliminar</a>
                          </p>
                        </div>
                      </div>`;
      });

      EditarEliminarOperaciones();
    }

    // Agregar o cancelar operacion.
    $nuevaOperacion.addEventListener("click", (e) => {
      e.preventDefault();

      if (!$balanceContiner.classList.contains("is-hidden")) {
        $balanceContiner.classList.toggle("is-hidden");
      }
      if ($nuevasOperaciones.classList.contains("is-hidden")) {
        $nuevasOperaciones.classList.toggle("is-hidden");
      }
      if (!$conReportes.classList.contains("is-hidden")) {
        $conReportes.classList.toggle("is-hidden");
      }
      if (!$sinReportes.classList.contains("is-hidden")) {
        $sinReportes.classList.toggle("is-hidden");
      }

      $catergoriaSelect.innerHTML = '';

      for (let i in categoriaItem) {
        $catergoriaSelect.innerHTML += `<option value=${categoriaItem[i].texto}>${categoriaItem[i].texto}</option>`;
      }

    });

    $btnCancelarOperacion.addEventListener("click", () => {
      // $balanceContiner.classList.toggle("is-hidden");
      $nuevasOperaciones.classList.toggle("is-hidden");
    });


    /**
     * @description
     * Metodo para Eliminar o Agregar una Operacion
     */
    const EditarEliminarOperaciones = () => {
      const $$btnEditarOperacion = $$(".btn-editar-operacion");

      $$btnEditarOperacion.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          $balanceContiner.classList.toggle("is-hidden");
          $editarOperacion.classList.toggle("is-hidden");
          
          $editarCategoriasSelect.innerHTML = '';
          
          for (let i in categoriaItem) {
            $editarCategoriasSelect.innerHTML += `<option value=${categoriaItem[i].texto}>${categoriaItem[i].texto}</option>`;
          }
          let idOperacion = e.target.id;
          let resultadoEditarOperacion = operaciones.filter((element) => element.id == idOperacion);
          $operacionescontenedor.classList.toggle("is-hidden");
          $idParaCambiar.value = idOperacion;
          $editarDescripcion.value = resultadoEditarOperacion[0].descripcion;
          $editarMonto.value = resultadoEditarOperacion[0].monto;
          $editarTipoOperacion.value = resultadoEditarOperacion[0].tipoOperacion;
          $editarCategoriasSelect.value = resultadoEditarOperacion[0].categoria;
          $editarFecha.value = resultadoEditarOperacion[0].fecha;
        });
      });

      const $$btnEliminarOperacion = $$(".btn-eliminar-operacion");
      $$btnEliminarOperacion.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          let idOperacion = e.target.id;
          operaciones = operaciones.filter((operacion) => operacion.id !== idOperacion);    
          localStorage.setItem("keyOperaciones", JSON.stringify({ operaciones }));

          pintarOperaciones();
          if (!operaciones.length > 0) {
            $sinOperaciones.classList.remove("is-hidden");
          }

        });


      });
      refrescarOperacionesMesAnio();
      refrescarTotalMesAnio();
      total();
    };

    if (operaciones !== null && operaciones.length > 0) {
      pintarOperaciones();
      //$sinOperaciones.classList.remove('is-hidden');
    }

    $ocultarFiltros.addEventListener("click", (e) => {

      e.preventDefault();
      if(!$filtros.classList.contains('is-hidden'))
        $filtros.classList.add("is-hidden");
      else
        $filtros.classList.remove("is-hidden");

    });

    /* Filtros */
    const ocultar = () => {
      $ocultarFiltros.click();
    };

    ocultar();

    const filtros = () => {
      operaciones = JSON.parse(localStorage.getItem("keyOperaciones"));
      operaciones = operaciones.operaciones;
      if ($filtroTipo.value !== "Todos") {
        operaciones = operaciones.filter(op => op.tipoOperacion === $filtroTipo.value);
      }
      if ($filtroCategoria.value !== "Todos") {
        operaciones = operaciones.filter((op) => op.categoria === $filtroCategoria.value);
      }
      if ($filtroOrden.value === "MAS_RECIENTE") {
        operaciones = operaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      }
      if ($filtroOrden.value === "MENOS_RECIENTE") {
        operaciones = operaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      }
      if ($filtroOrden.value === "MAYOR_MONTO") {
        operaciones = operaciones.sort((a, b) => Number(b.monto) - Number(a.monto));
      }
      if ($filtroOrden.value === "MENOR_MONTO") {
        operaciones = operaciones.sort((a, b) => Number(a.monto) - Number(b.monto));
      }
      if ($filtroOrden.value === "a-z") {
        operaciones = operaciones.sort((a, b) => {
          if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
            return -1;
          }
        });
      }
      if ($filtroFecha.value != '') {
        operaciones = operaciones.filter(x => new Date(x.fecha) >= new Date($filtroFecha.value))
      }
      if ($filtroOrden.value !== "Más reciente") {
        if ($filtroOrden.value == 'A/Z') {
          operaciones = operaciones.sort((a, b) => {
            if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
              return -1;
            }
          });
        }
      }
      $operaciones.innerHTML = "";
      refrescarOperacionesMesAnio();
      refrescarTotalMesAnio();
      pintarOperaciones();
    };

    $filtroTipo.addEventListener("change", filtros);
    $filtroCategoria.addEventListener("change", filtros);
    $filtroOrden.addEventListener("change", filtros);
    $filtroFecha.addEventListener("change", filtros);

    $btnReportes.addEventListener("click", (e) => {
      e.preventDefault();

      if (!$balanceContiner.classList.contains("is-hidden")) {
        $balanceContiner.classList.toggle("is-hidden");
      }
      if (!$categoria.classList.contains("is-hidden")) {
        $categoria.classList.toggle("is-hidden");
      }
      if ($reportes.classList.contains('is-hidden')) {
        $reportes.classList.toggle('is-hidden');
      }
      if (!$nuevasOperaciones.classList.contains("is-hidden")) {
        $nuevasOperaciones.classList.toggle("is-hidden");
      }

      if (operaciones !== null && operaciones.length > 0) {
        reporte()
      } else {
        if ($sinReportes.classList.contains("is-hidden")) {
          $sinReportes.classList.toggle("is-hidden");
        }
        if (!$conReportes.classList.contains("is-hidden")) {
          $conReportes.classList.toggle("is-hidden");
        }
      }
     
    });

    /**
     * @description
     * Metodo que genera reportes en su respectiva seccion.
     * 
     */
    const reporte = () => {
      if ($conReportes.classList.contains("is-hidden")) {
        $conReportes.classList.toggle("is-hidden");
      }

      if (!$sinReportes.classList.contains("is-hidden")) {
        $sinReportes.classList.toggle("is-hidden");
      }

      local();
      if (operaciones != null) {
        let mayorGanancia = operaciones.filter((op) => op.tipoOperacion === "Ganancia");    
        mayorGanancia = mayorGanancia.sort((a, b) => Number(b.monto) - Number(a.monto));

        $categoriaMayorGanancia.innerHTML = 'Ninguna';
        $categoriaMayorGananciaMonto.innerHTML = 0.0;

        if(mayorGanancia.length > 0){
          let valor = mayorGanancia[0].monto
          let cate = mayorGanancia[0].descripcion
          $categoriaMayorGanancia.innerHTML = `${cate}`;
          $categoriaMayorGananciaMonto.innerHTML = `${valor}`;
        }
      }

      if (operaciones != null) {
        let mayorGasto = operaciones.filter((op) => op.tipoOperacion === "Gasto");
        mayorGasto = mayorGasto.sort((a, b) => Number(b.monto) - Number(a.monto));

        $categoriaMayorGasto.innerHTML = 'Ninguna';
        $categoriaMayorGastoMonto.innerHTML = 0.0;

        if(mayorGasto.length > 0){
          let gasto = mayorGasto[0].monto
          let cateGasto = mayorGasto[0].descripcion
          $categoriaMayorGasto.innerHTML = `${cateGasto}`;
          $categoriaMayorGastoMonto.innerHTML = `${gasto}`;
        }
      }
        generarAdicionalesReporte();
      

    };

    // #endregion  
  }
  local();
});






