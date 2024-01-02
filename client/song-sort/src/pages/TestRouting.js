import { Container } from 'react-bootstrap';

export default function TestRouting() {
    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}>
            <div>
                <p>Foo Bar</p>
            </div>
        </Container>
    )
}