import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = ({ products, carts, setCarts }) => {
  return (
    <div className="products-container">
      <div className="products-container-items">
        {products.map((product) => {
          return (
            <Card style={{ width: "18rem" }} key={product.id}>
              <Card.Img variant="top" src='./image-alignment-150x150.jpg' />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <b> ${product.price.toFixed(2)}</b>
                </Card.Text>
                {carts.find((cart) => cart.id === product.id) ? (
                  <span className="badge bg-secondary">Added</span>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setCarts([...carts, product]);
                    }}
                  >
                    Add to Carts
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
