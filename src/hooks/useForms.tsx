import { PALETTE } from "@/FormBuilder/Palette";
import type { FormField, FormSchema } from "@/types";
import { useEffect, useState } from "react";

const STORAGE_KEY = "FormFields";

export default function useForms() {
    const [forms, setForms] = useState<FormSchema[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localData = localStorage.getItem(STORAGE_KEY);
        if (localData) {
            setForms(JSON.parse(localData));
            setLoading(false);
        } else {
            fetch("/forms.json")
                .then((res) => res.json())
                .then((data) => {
                    const initialForms = data.forms || [];
                    setForms(initialForms);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialForms));
                })
                .catch((err) => console.error("Failed to load forms.json", err))
                .finally(() => setLoading(false));
        }
    }, []);

    const saveForms = (updatedForms:FormSchema[]) => {
        setForms(updatedForms);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    };

    const addForm = (form:FormSchema) => {
        saveForms([...forms, { ...form, id: String(Math.floor(Math.random() * 1000000000)) }]);
    };

    const getForm = (id:string) => {
        const foundedForm = forms.find((f) => f.id === id)
        if (!foundedForm) return null
        return {
            ...foundedForm,
            fields: foundedForm?.fields?.map((field) => {
                return {
                    ...field,
                    render: PALETTE.find((palette) => palette.type == field.type)?.render
                }
            })
        }
    };

    const updateForm = (formId:string, updatedForm:FormField) => {
        //@ts-ignore
        saveForms(forms.map((f) => (f.id === formId ? updatedForm : f)));
    };

    const deleteForm = (formId:string) => {
        saveForms(forms.filter((f) => f.id !== formId));
    };

    const getFormValues = (formId:string) => {
        const form = getForm(formId);
        //@ts-ignore
        if (!form || !form.validations) return {};
        //@ts-ignore
        return form.validations.reduce((acc, field) => {
            if (field.type === "text") acc[field.code] = field.value || "";
            else if (field.type === "checkbox") acc[field.code] = !!field.value;
            else acc[field.code] = field.value;
            return acc;
        }, {});
    };

    return {
        forms,
        loading,
        saveForms,
        addForm,
        getForm,
        updateForm,
        deleteForm,
        getFormValues,
    };
}
