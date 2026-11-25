"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import CustomFormField, { FormFieldType } from "@/components/CustomFormField"
import SubmitButton from "@/components/SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import {createUser} from "@/lib/actions/patient.actions";
import {useRouter} from "next/navigation";

type UserFormValues = z.infer<typeof UserFormValidation>

const PatientForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // 1. Define your form: the schema drives both validation and the field types
    const form = useForm<UserFormValues>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler
    const onSubmit = async (values: UserFormValues) => {
        setIsLoading(true)

        try {
            // Next tutorial step: create the user in Appwrite, then redirect
            const newUser = await createUser(values)
            if (newUser) router.push(`/patients/${newUser.$id}/register`)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
            <section className="mb-12 space-y-4">
                <h1 className="header">Hi there 👋</h1>
                <p className="text-dark-700">Get started with appointments.</p>
            </section>

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Full name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
            />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
            />

            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="(555) 123-4567"
            />

            <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
    )
}

export default PatientForm
