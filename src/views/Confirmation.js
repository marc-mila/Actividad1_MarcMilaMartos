import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import ConfirmationFlight from "../components/ConfirmationComponents/ConfirmationFlight";

export const Confirmation = () => {

    return(
        <div>
            <Header />            
            <ConfirmationFlight />
            <Footer />
        </div>
    )
}