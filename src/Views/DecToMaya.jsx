import * as React from "react";

export default function DecToMaya() {
  const [number, setNumber] = React.useState(0);

  const [niveles, setNiveles] = React.useState([]);

  const convertToMaya = () => {
    let nivel = 0;
    const newNiveles = [];
    while (number / Math.pow(20, nivel) >= 1) {
      nivel++;
    }
    for (let i = 0; i < nivel; i++) {
      newNiveles.push([[], []]);
    }

    //a partir de aquí llenaré todos los arrays
    let cantidad = number;
    for (let i = newNiveles.length - 1; i >= 0; i--) {
      console.log("NIVEL =>", i);
      const dividendo = Math.pow(20, i);
      console.log("DIVIDENDO =>", dividendo);
      const quintuple = dividendo * 5;
      console.log("CANTIDAD =>", cantidad);
      const cincos = Math.floor(cantidad / quintuple);
      cantidad -= cincos * quintuple;
      console.log("CINCOS =>", cincos);
      const unos = Math.floor(cantidad / dividendo);
      console.log("UNOS =>", unos);
      newNiveles[i][0] = rellenarArray(cincos);
      newNiveles[i][1] = rellenarArray(unos);
      cantidad -= unos * dividendo;
    }

    setNiveles(newNiveles);
  };

  const rellenarArray = (cantidad) => {
    const array = [];
    for (let i = 0; i < cantidad; i++) {
      array.push(1);
    }
    return array;
  };

  const onChangeNumber = (e) => {
    const isNumber = e.target.validity.valid;
    if (isNumber) {
      setNumber(e.target.value);
    } else {
      number === "" ? setNumber(0) : setNumber(number);
    }
  };

  const verifiedCeros = (item) => {
    if (item[0].length === 0 && item[1].length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="input-container">
        <input
          pattern="[0-9]*"
          onInput={onChangeNumber}
          value={number}
          type="number"
        />
        <button onClick={convertToMaya}>Convertir</button>
      </div>
      <div className="contenedor-maya">
        {niveles.map((item, idx) => {
          return (
            <div className="tablero-maya">
              {verifiedCeros(item) && <div className="cero" />}
              {item[1].map(() => {
                return <div key={idx} className="uno" />;
              })}
              {item[0].map(() => {
                return <div key={idx} className="cinco" />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}