import ProductsShowcase from "../components/interactive/ProductsShowcase";
import { useAppSelector } from "../hooks";

function HomePage() {
  const auth = useAppSelector((state) => state.auth);
  return <ProductsShowcase user={auth.user}></ProductsShowcase>;
}

export default HomePage;
