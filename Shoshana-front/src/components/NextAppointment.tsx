import React, { useEffect, useState } from "react";
import { getAppointments } from "../services/appointmentService"
import { AppointmentDatasType } from "./calendar/AppointmentDetails";
import { Appointment } from "../types";
import Login from "./auth/Login";

// todo style the component


const NextAppointment = () => {
    const [appointments, setAppointments]= useState([])
    useEffect(()=>{
        const fetchAppointments = async () => {
            // need token to return the value
            const fetchedAppointments = await getAppointments()   
            setAppointments(fetchedAppointments);
            
        }
        fetchAppointments()
    },[])
    
    
    
    const sortedAppointments = appointments.sort((a:any, b:any)=> a.date - b.date)
    
    return (
        <div>
            {sortedAppointments.map((appointment: any , index) => ( 
                <div key={index}>
                    <h2>Appointment Name: {appointment.title}</h2>
                    <p>Date: {`${appointment.date.day.toString().padStart(2, "0")} / ${appointment.date.month.toString().padStart(2, "0")} `}</p>
                    <p>Time: {`${appointment.date.hour.toString().padStart(2, "0")} : ${appointment.date.minute.toString().padStart(2, "0")}`}</p>
                    <p>Location: undefine</p>
                    <p>Description: {appointment.description}</p>
                    {/* br tag temporary until we style the div*/}
                    <br />
                </div> 
            ))}

        </div>
    )
}
export default NextAppointment