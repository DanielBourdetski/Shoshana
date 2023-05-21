import React, { FormEvent, useState } from 'react'
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import toaster from "../../helpers/toaster";


// ? ask where the check functions will be (in submit or before submitting)

const AddAppointment: React.FC<{

}> = ({

}) => {
        const israeliPhoneNumberRegex =
            /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

        const [appointmentData, setAppointmentData] = useState({
            title: "",
            description: "",
            client: "",
            appointmentType: "",
            notes: "",
            contactNumber: ""
        });



        const updateFieldInState = (value: string, field: "title" | "description" | "client" | "appointmentType" | "notes" | "contactNumber") => {
            setAppointmentData((appointment) => {
                return { ...appointment, [field]: value }
            })



        }

        const onAddAppointment = async (e: FormEvent) => {
            e.preventDefault()
            if (!appointmentData.client || appointmentData.client.length >= 10) {
               return toaster.authError("client valid");

            }
            if (!appointmentData.title || appointmentData.title.length >= 10) {
               return toaster.authError("title is not valid");

            }
            if (!appointmentData.description || appointmentData.description.length >= 100) {
                return toaster.authError("description is not valid");

            }
            if (!appointmentData.contactNumber || appointmentData.contactNumber.length != 10) {
                return toaster.authError("number is not valid")
            }
            if(!israeliPhoneNumberRegex.test(appointmentData.contactNumber)){
               return toaster.authError("israeli phone is not valid");
                
            }

            toaster.success("success");

        }



        return (
            <form
                onSubmit={onAddAppointment}
            >
                <div>
                    <span>Add appointment</span>

                    <Input
                        label='title'
                        onChange={(value: string) => { updateFieldInState(value, "title") }}
                        value={appointmentData.title}
                    />

                    <TextArea
                        label='description'
                        onChange={(value: string) => { updateFieldInState(value, "description") }}
                        value={appointmentData.description}
                    />

                    <Input
                        label='client'
                        onChange={(value: string) => { updateFieldInState(value, "client") }}
                        value={appointmentData.client}
                    />

                    <Input
                        label='Appointment type'
                        onChange={(value: string) => { updateFieldInState(value, "appointmentType") }}
                        value={appointmentData.appointmentType}
                    />

                    <Input
                        label='notes'
                        onChange={(value: string) => { updateFieldInState(value, "notes") }}
                        value={appointmentData.notes}
                    />

                    <Input
                        label='contactNumber'
                        type='number'
                        onChange={(value: string) => {updateFieldInState(value, "contactNumber")}}
                        value={appointmentData.contactNumber}
                    />

                    <Button
                        title='Create appointment'
                        submit
                    />
                </div>
            </form>
        )
    }
export default AddAppointment;