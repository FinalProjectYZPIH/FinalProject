const getVisitors = () => {
    let clients = io.sockets.clients().connected;
    let sockets = Object.values(clients);
    let users = sockets.map(s => s.user);
    return users;
  };