// Instrucciones:
// Estás desarrollando un middleware para Soluciones Alegra que debe limpiar los datos (payloads) enviados por los usuarios antes de guardarlos en la base de datos.
// Tu función recibirá dos argumentos: un objeto con los datos ingresados (payload) y un array de strings con las llaves que son obligatorias (requiredKeys).
// La función debe cumplir tres condiciones:
// 1. Verificar que todas las llaves obligatorias existan en el objeto y que su valor no sea un string vacío "" ni sea null.
// 2. Eliminar cualquier propiedad del objeto original cuyo valor sea undefined (las propiedades con valor 0 o false sí son válidas y deben conservarse).
// 3. Retornar un nuevo objeto con las propiedades limpias. Si falta alguna llave obligatoria o alguna es inválida (vacía/null), la función debe retornar el string "INVALID_PAYLOAD".

function validateAndCleanPayload(payload, requiredKeys) {
  // # 1 Verificar las llaves obligatorias existan  y que su valor no sea un string vacío ni sea null.
  for (const key of requiredKeys) {
    if (
      payload[key] === null ||
      payload[key] === "" ||
      payload[key] === undefined
    ) {
      return "INVALID_PAYLOAD";
    }
  }
  // punto 2 y 3
  for (const key in payload) {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  }
  return { ...payload };
}

// ------------------------------------------------------------------------------------

const datos = {
  id: 101,
  name: "Factura A",
  description: undefined,
  active: false,
};
const requeridos = ["id", "name"];

console.log(validateAndCleanPayload(datos, requeridos));
// Debería retornar: { id: 101, name: "Factura A", active: false }
// (Eliminó 'description' porque era undefined, pero mantuvo 'active' en false)

// ------------------------------------------------------------------------------------

const datos2 = { id: 102, name: "" };
const requeridos2 = ["id", "name"];

console.log(validateAndCleanPayload(datos2, requeridos2));
// Debería retornar: "INVALID_PAYLOAD" (porque 'name' está vacío)

// ------------------------------------------------------------------------------------

const datos3 = { name: "Recibo de caja", total: 500 };
const requeridos3 = ["id", "name"];

console.log(validateAndCleanPayload(datos3, requeridos3));
// Debería retornar: "INVALID_PAYLOAD" (porque falta la propiedad 'id')

// ------------------------------------------------------------------------------------
