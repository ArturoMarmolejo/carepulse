"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import PhoneInput, { type Value as PhoneValue } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import {
    Controller,
    type Control,
    type ControllerRenderProps,
    type FieldValues,
    type Path,
} from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// A const object instead of an enum: same FormFieldType.INPUT usage, plain JavaScript output
export const FormFieldType = {
    INPUT: "input",
    TEXTAREA: "textarea",
    PHONE_INPUT: "phoneInput",
    CHECKBOX: "checkbox",
    DATE_PICKER: "datePicker",
    SELECT: "select",
    SKELETON: "skeleton",
} as const

export type FormFieldType = (typeof FormFieldType)[keyof typeof FormFieldType]

// Generic over the form's values, so `name` only accepts real field names of that form
interface CustomProps<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    fieldType: FormFieldType
    label?: string
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dateFormat?: string
    showTimeSelect?: boolean
    children?: ReactNode
    renderSkeleton?: (field: ControllerRenderProps<T, Path<T>>) => ReactNode
}

interface RenderInputProps<T extends FieldValues> {
    field: ControllerRenderProps<T, Path<T>>
    props: CustomProps<T>
    invalid: boolean
}

const RenderInput = <T extends FieldValues>({ field, props, invalid }: RenderInputProps<T>) => {
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}
                    <Input
                        {...field}
                        id={props.name}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        aria-invalid={invalid}
                        className="shad-input border-0"
                    />
                </div>
            )

        case FormFieldType.TEXTAREA:
            return (
                <Textarea
                    {...field}
                    id={props.name}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    aria-invalid={invalid}
                    className="shad-textArea"
                />
            )

        case FormFieldType.PHONE_INPUT:
            return (
                <PhoneInput
                    id={props.name}
                    defaultCountry="US"
                    international
                    withCountryCallingCode
                    placeholder={props.placeholder}
                    value={field.value as PhoneValue | undefined}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={invalid}
                    className="input-phone"
                />
            )

        case FormFieldType.CHECKBOX:
            return (
                <div className="flex items-center gap-4">
                    <Checkbox
                        id={props.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={invalid}
                    />
                    <label htmlFor={props.name} className="checkbox-label">
                        {props.label}
                    </label>
                </div>
            )

        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="calendar"
                        className="ml-2"
                    />
                    <DatePicker
                        id={props.name}
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect={props.showTimeSelect ?? false}
                        timeInputLabel="Time:"
                        dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                        wrapperClassName="date-picker"
                    />
                </div>
            )

        case FormFieldType.SELECT:
            return (
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id={props.name} aria-invalid={invalid} className="shad-select-trigger">
                        <SelectValue placeholder={props.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="shad-select-content">
                        {props.children}
                    </SelectContent>
                </Select>
            )

        case FormFieldType.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null

        default:
            return null
    }
}

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
    const { control, name, label, fieldType } = props

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FieldLabel htmlFor={name} className="shad-input-label">
                            {label}
                        </FieldLabel>
                    )}
                    <RenderInput field={field} props={props} invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="shad-error" />
                    )}
                </Field>
            )}
        />
    )
}

export default CustomFormField
