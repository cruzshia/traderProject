var socket;
const SOCKET_URL = 'wss://ws.cobinhood.com/v2/ws';
const SOCKET_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
}

function getSocket() {
    if (!socket || socket.readyState === SOCKET_STATE.CLOSED) {
        socket = new WebSocket(SOCKET_URL);
    } else if (socket.readyState === SOCKET_STATE.CLOSING) {
        socket = socket.close();
        socket = new WebSocket(SOCKET_URL);
    }
    return socket;
}

export {
    getSocket
}