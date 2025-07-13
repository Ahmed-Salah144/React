import BookSubmissionForm from "../../sections/product/Form";
import { Container} from '@mui/material';
export default function BookPostPage() {
    return (
        <Container maxWidth="lg">
            <h1>Book Post Page</h1>
            <BookSubmissionForm />
        </Container>
    )
}