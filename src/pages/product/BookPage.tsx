import { useParams } from "react-router-dom";

export default function BookPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Book Page {id}</h1>
        </div>
    )
}