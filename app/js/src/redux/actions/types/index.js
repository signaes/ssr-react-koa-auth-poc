const types = {};
const registerTypes = array => array.forEach(type => types[type] = type);

// Profile
registerTypes(['UPDATE_NAME', 'UPDATE_PASSWORD', 'UPDATE_EMAIL']);

// Todos
registerTypes(['UPDATE_TODO', 'ADD_TODO', 'COMPLETE_TODO', 'REMOVE_TODO']);

// Authentication
registerTypes(['LOGIN', 'LOGOUT', 'NOT_AUTHORIZED', 'NOT_FOUND']);

// Async
registerTypes(['IS_LOADING', 'IS_NOT_LOADING']);

export default types;
