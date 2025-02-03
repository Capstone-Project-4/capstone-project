import { Typography } from '@mui/material'
import React from 'react'

function HomePage() {
    return (
    <div className="container">
        <Typography variant='h3' className="fade-in">Welcome to Smart Fund Allocation</Typography>
        <p className="fade-in delay-1">
            We provide <span className="highlight">lower interest rates</span> compared to traditional banks, ensuring financial growth and security for everyone.
        </p>

        <div className="comparison-box fade-in delay-2">
            <h2>Interest Rate Comparison</h2>
            <div className="comparison">
                <div>🏦 Traditional Banks: <span className="old-rate">10-15%</span></div>
                <div>🚀 Our Platform: <span className="new-rate">5-7%</span></div>
            </div>
        </div>

        <button className="cta-button">Get Started</button>
    </div>
        
    )
}

export default HomePage

