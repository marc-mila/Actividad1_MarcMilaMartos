import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import PaymentFlight from "../components/PaymentComponents/PaymentFlight";

export const Payment = () => {

    return(
        <div>
            <Header />            
            <PaymentFlight />
            <Footer />
        </div>
    )
}