// Objeto con las propiedades de la calculadora
let p = {
    teclas: document.querySelectorAll('#calculadora #teclas'),
    item: null,
    operaciones: document.querySelector('#calculadora #operaciones'),
    digito: null,
    cantidadSigno: 0,
    cantidadDecimal: false,
    resultado: false,
    borrar: document.querySelector('#borrar')
}
// Objeto con los métodos de la calculadora
let m = {
    inicioCalculadora: function(){
        for(let i = 0; i < p.teclas.length; i++){
            p.teclas[i].addEventListener('click', m.clickTecla);
        }
        p.borrar.addEventListener('click', m.borrarNumeros);
        m.teclado();
    },
    teclado: function(){
        document.addEventListener('keydown', m.oprimirTecla);
    },
    oprimirTecla: function(tecla){
        if(tecla.key == 0 || tecla.key == 1 || tecla.key == 2 || tecla.key == 3 || tecla.key == 4 || tecla.key == 5 || tecla.key == 6 || tecla.key == 7 || tecla.key == 8 || tecla.key == 9 ){
            p.cantidadSigno = 0; 
            if(p.operaciones.innerHTML == '0'){
                p.operaciones.innerHTML = tecla.key;
            } else{
                if(p.resultado){
                    p.operaciones.innerHTML = tecla.key;
                    p.resultado = false;
                }else{
                    p.operaciones.innerHTML += tecla.key;
                }
            }
        } else if (tecla.key == '+' || tecla.key == '-' || tecla.key == '*' || tecla.key == '/'){
            p.cantidadSigno++;
                if(p.cantidadSigno == 1){
                    if(p.operaciones.innerHTML == '0'){
                        p.operaciones.innerHTML = '0';
                    }else{
                        p.operaciones.innerHTML += tecla.key;
                        p.cantidadDecimal = false;
                        p.resultado = false;
                    }
                }
        } else if(tecla.key == '.'){
            if(!p.cantidadDecimal){
                if(p.operaciones.innerHTML == '0'){
                    p.operaciones.innerHTML = tecla.key;
                } else{
                    p.operaciones.innerHTML += tecla.key;
                } 
                p.cantidadDecimal = true;
            }
        } else if(tecla.key == 'Enter'){
            p.operaciones.innerHTML = eval(p.operaciones.innerHTML);
                p.resultado = true;
        } else if(tecla.key == 'Backspace'){
            m.borrarNumeros();
        }
    },
    clickTecla: function(item){
        p.item = item.target.getAttribute('class');
        p.digito = item.target.innerHTML;
        m.calculadora(p.item, p.digito);
    },
    calculadora: function(item, digito){
        switch(item){
            case 'numero':
                p.cantidadSigno = 0;
                if(p.operaciones.innerHTML == '0'){
                    p.operaciones.innerHTML = digito;
                } else{
                    if(p.resultado){
                        p.operaciones.innerHTML = digito;
                    } else{
                        p.operaciones.innerHTML += digito;
                        p.resultado = false;
                    }
                    
                }
                break;

            case 'signo':
                p.cantidadSigno++;
                if(p.cantidadSigno == 1){
                    if(p.operaciones.innerHTML == '0'){
                        p.operaciones.innerHTML = '0';
                    }else{
                        p.operaciones.innerHTML += digito;
                        p.cantidadDecimal = false;
                        p.resultado = false;
                    }
                }
                break;
            
            case 'decimal':
                if(!p.cantidadDecimal){
                    if(p.operaciones.innerHTML == '0'){
                        p.operaciones.innerHTML = digito;
                    } else{
                        p.operaciones.innerHTML += digito;
                    } 
                    p.cantidadDecimal = true;
                }
                break;

            case 'igual':
                p.operaciones.innerHTML = eval(p.operaciones.innerHTML);
                p.resultado = true;
                break;
        }
    },
    borrarNumeros: function(){
        p.operaciones.innerHTML = 0;
        p.cantidadDecimal = false;
        p.cantidadSigno = 0;
        p.resultado = false;
    }
   
}

m.inicioCalculadora();