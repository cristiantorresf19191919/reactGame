import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import SweetAlert from 'sweetalert2-react';

function Cuadrado (props){
    return (
        <button className="cuadrado" onClick={props.onClick}>
            {props.valor}
        </button>
    )
}
/* class Cuadrado extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button onClick={() => { this.props.onClick() }} className="cuadrado">{this.props.valor}</button>
        )
    }
} */
class Tablero extends React.Component {
    renderizeCuadrado(arg) {
        return <Cuadrado
        valor={this.props.listaCuadrado[arg]} 
        onClick={() => { this.props.guardeValor(arg)}}
       />
    }   
    render() {       
        return (
            <div>
                <div className="fila">
                    {this.renderizeCuadrado(0)}
                    {this.renderizeCuadrado(1)}
                    {this.renderizeCuadrado(2)}
                </div>
                <div className="fila">
                    {this.renderizeCuadrado(3)}
                    {this.renderizeCuadrado(4)}
                    {this.renderizeCuadrado(5)}
                </div>
                <div className="fila">
                    {this.renderizeCuadrado(6)}
                    {this.renderizeCuadrado(7)}
                    {this.renderizeCuadrado(8)}
                </div>
            </div>
        )
    }  
}

class Juego extends React.Component {
 
    guardeDatos(numeroDeCuadrado) {
        console.log('dispara funcion click');
        console.log('numero de cuadrado es '+numeroDeCuadrado);
        const historia = this.state.historia.splice(0,this.state.stepNumber + 1);
        const actual = historia[historia.length -1];
        const cuadrados = actual.squares.slice();
        if (quienGano(cuadrados) || cuadrados[numeroDeCuadrado]){
            return;
            } 
        cuadrados[numeroDeCuadrado] = this.state.xEsSiguiente ? 'X' : 'O';
        this.setState({ 
            historia: historia.concat([{squares:cuadrados}]) ,
            stepNumber : historia.length,
            xEsSiguiente: !this.state.xEsSiguiente });
        
    }

    salta(paso){
        this.setState({
            stepNumber: paso,
            xEsSiguiente : (paso % 2) === 0
        });

    }


    // como es la estructura de historia
  /*   this.render.historia = [
         {squares:[null,null,null,null,null,null,null,null,null,]},
         {squares:[null,null,null,null,null,null,null,null,null,]},
         {squares:[null,null,null,null,null,null,null,null,null,]},
         {squares:[null,null,null,null,null,null,null,null,null,]},
         {squares:[null,null,null,null,null,null,null,null,null,]}
        ]; */
    constructor(props){
        super(props);
        this.state={
            historia:[{squares:Array(9).fill(null)}],
            xEsSiguiente: true,
            stepNumber: 0,
            alguienGano:false
        }
 
    }
    render() {
        const historia = this.state.historia;
        const actual = historia[this.state.stepNumber];
        const ganador = quienGano(actual.squares);
        let contadorx;
        let contadory;
        let estado;
        let alguiengano;
        const movimientos = historia.map((step,move) => {
            const desc = move ? 
            "Ir al movimiento #" + move:
            "PRINCIPIO";
            return (
                <li key={move}>
                    <button className="desc" onClick={()=> this.salta(move)}>
                        {desc}
                    </button>                  
                </li>
            );
        });   

        console.log('historia');
        console.log(historia);
        console.log('actual');
        console.log(actual);
        console.log('ganador');
        console.log(ganador);
        console.log('estado');
        console.log(estado);
        if (ganador){
            estado = 'El ganador victorioso es '+ganador;
            
            alguiengano = true;
        } else {
            estado = 'El siguiente jugador es '+ (this.state.xEsSiguiente ? 'X' : 'O');            
        }
        return (
            <div className="juego">                
                <Tablero
                    listaCuadrado = {actual.squares}
                    guardeValor = {(i)=>this.guardeDatos(i)}                
                />
                <div className="informacion-juego">
                    <div>{estado}</div>
                    <ol>{movimientos}</ol>
                </div>
                <SweetAlert
                        show={alguiengano}
                        title="GAME OVER"
                        text={estado}
                        onConfirm={() => {window.location.reload()} }
                        />
            </div>
        )
    }

   
}
 // ===============================================================
 ReactDOM.render(
     <Juego />,
     document.getElementById('root')
     )
     
// ===============================================================
function quienGano(listaCompleta){
    const posiblesGanadores = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [2,5,8],
        [1,4,7],
        [6,4,2],
        [0,4,8],    
        [0,4,7],
        [1,5,7],
        [0,1,3,4]        
    ];
    for (let i=0; i<posiblesGanadores.length;i++){
        const [a,b,c] = posiblesGanadores[i];
        if (listaCompleta[a] && listaCompleta[a] === listaCompleta[b] && listaCompleta[a] === listaCompleta[c]){
            return listaCompleta[a];
        }            
    }
    return null;
} 