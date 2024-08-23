export const generarData = (obj) => {
  const fechaInicio = new Date(obj.FechaInicio);
  const fechaMeta = new Date(obj.FechaMeta);
  const tiempoTotal = fechaMeta - fechaInicio;
  const montoObjetivo = obj.MontoObjetivo;
  let montoAhorrado = obj.MontoAhorrado; // Se actualiza conforme se distribuye

  const unDia = 24 * 60 * 60 * 1000;
  const unaSemana = unDia * 7;
  const unMes = unDia * 30;

  let data = [];
  let numBarras;
  let incrementoAhorroEsperado;

  if (tiempoTotal >= unMes) {
    numBarras = Math.floor(tiempoTotal / unMes);
    incrementoAhorroEsperado = montoObjetivo / numBarras;

    for (let i = 0; i < numBarras; i++) {
      const nombreMes = new Date(fechaInicio.getTime() + unMes * i)
        .toLocaleString('es-ES', { month: 'long' })
        .charAt(0)
        .toUpperCase() + new Date(fechaInicio.getTime() + unMes * i)
        .toLocaleString('es-ES', { month: 'long' })
        .slice(1);

      const ahorro = Math.min(montoAhorrado, incrementoAhorroEsperado);
      montoAhorrado -= ahorro;

      data.push({
        name: nombreMes,
        ahorro: ahorro,
      });
    }
  } else if (tiempoTotal >= unaSemana) {
    numBarras = Math.floor(tiempoTotal / unaSemana);
    incrementoAhorroEsperado = montoObjetivo / numBarras;

    for (let i = 0; i < numBarras; i++) {
      const ahorro = Math.min(montoAhorrado, incrementoAhorroEsperado);
      montoAhorrado -= ahorro;

      data.push({
        name: `Semana ${i + 1}`,
        ahorro: ahorro,
      });
    }
  } else {
    numBarras = Math.floor(tiempoTotal / unDia);
    incrementoAhorroEsperado = montoObjetivo / numBarras;

    for (let i = 0; i < numBarras; i++) {
      const ahorro = Math.min(montoAhorrado, incrementoAhorroEsperado);
      montoAhorrado -= ahorro;

      data.push({
        name: `Día ${i + 1}`,
        ahorro: ahorro,
      });
    }
  }

  console.log(data);
  return data;
}
