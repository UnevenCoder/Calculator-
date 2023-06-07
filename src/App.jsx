import { createRoot } from 'react-dom'

const App = () => {
    return (
        <h1>Rendered baba</h1>
    )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
