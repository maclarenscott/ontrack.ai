//return hello world
export default (req, res) => {
    res.status(200).json({ name: 'Hello World' })
}
