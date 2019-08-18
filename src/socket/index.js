export const socketEmit = (event, socket, data) => socket.emit(event, data)

export const socketOn = (event, socket, user, cb) => {
    socket.on(event, data => {
        return cb(data, user)
    })
}