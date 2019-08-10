export default res => {
    const { token } = res.data
    localStorage.setItem('chat_token', token)
}