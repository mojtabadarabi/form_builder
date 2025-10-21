import FormBuilder from "@/FormBuilder";
import useForms from "@/hooks/useForms";
import { useParams } from "react-router-dom";

export default function EditForm() {
    const params = useParams()

    const { getForm, loading } = useForms()
    if (loading) return null
    return (
        <div>
            <FormBuilder
                //@ts-ignore
                initialForm={params?.id ? getForm(params?.id) : null}
            />
        </div>
    )
}
