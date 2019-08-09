export default res => {
    const { token } = res.data
    console.log(token)
    localStorage.setItem('chat_token', token)
}