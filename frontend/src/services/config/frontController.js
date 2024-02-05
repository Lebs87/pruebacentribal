//import { getArticlesFromDB } from "./dbMockController";

//Por cuestiones de tiempo no pude completar todas las conexiones, sin embargo esta sería la lógica para poder implementar los cambios en la Base de Datos y la gestión de solicitudes.
//Due to time reasons I was not able to complete all the connections, however this would be the logic to be able to implement the Database changes and request management.

// Solo llegué a implementarlo en la vista de artículos.
//I only got around to implementing it in the articles view.

import { getArticlesFromDB, getOrdersFromDB, deleteOrderFromDB } from "./dbController";

export const getArticles = async () => {
    const data = await getArticlesFromDB();
    return data;
}

export const getOrders = async () => {
    const data = await getOrdersFromDB();
    return data;
}

export const deleteOrder = async (orderId) => {
    const data = await deleteOrderFromDB(orderId);
    return data;
}

