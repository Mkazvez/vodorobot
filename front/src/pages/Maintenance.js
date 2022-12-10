import React, { Component } from 'react';
import MaintenanceDataGrid from '../components/Maintenance/index.js';

export default class MaintenanceGrid extends Component {
    render() {
        return (          
            <div>
                <h1>ТО</h1>
                <MaintenanceDataGrid/>
            </div>    
        )
    }
}
