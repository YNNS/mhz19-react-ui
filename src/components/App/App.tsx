import {useEffect, useState} from 'react'
import {Gauge} from '../Gauge/Gauge'
import './App.css'

type AppProps = {}

export const App = (props: AppProps) => {

    const [value, setValue] = useState<number>(0)
    useEffect(() => {
        let interval = setInterval(() => {
            fetch(`http://192.168.0.239:3500/api/v1/co2`)
                .then((response) => response.json()).then((response) => setValue(response?.co2 ?? 0)).catch(() => setValue(0));
        }, 1000)
        return () => clearInterval(interval);
    }, [value])

    return (
        <div className='app'>
            <div className='app-card'>
                <h1 className='app-title'>Air Quality</h1>
                <div className='app-body'>
                    <Gauge value={Math.min(value, 1400)}></Gauge>
                </div>
                {value === 0 && <div className='app-loading'>Connecting to backend...</div>}
            </div>
        </div>
    )
}
