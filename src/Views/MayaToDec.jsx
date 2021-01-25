import * as React from "react";

export default function MayaToDec() {
  const [number, setNumber] = React.useState(0);
  const [niveles, setNiveles] = React.useState([[[], []]]);

  const verifiedCeros = (item) => {
    if (item[0].length === 0 && item[1].length === 0) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
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
    if (number !== 0) {
      convertToMaya();
    }
  }, [number]);

  const addNumber = (cant, level) => {
    let newNumber = number;
    const dividendo = Math.pow(20, level);
    const suma = dividendo * cant;
    newNumber += suma;
    console.log(newNumber);
    setNumber(newNumber);
  };

  return (
    <div className="tabla">
      <div className="contenedor-maya">
        {niveles.map((item, idx) => {
          return (
            <div className="opciones-maya">
              <div className="tablero-maya">
                {verifiedCeros(item) && <div className="cero" />}
                {item[1].map(() => {
                  return <div key={idx} className="uno" />;
                })}
                {item[0].map(() => {
                  return <div key={idx} className="cinco" />;
                })}
              </div>
              <div onClick={() => addNumber(1, idx)} className="add-maya">
                <div className="uno" />
              </div>
              <div onClick={() => addNumber(5, idx)} className="add-maya">
                <div className="cinco" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="bigNumber">{`Cantidad: ${number}`}</div>
    </div>
  );
}