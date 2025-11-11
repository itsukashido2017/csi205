import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Carts = ({ carts, setCarts }) => {
  return (
    <div className="carts-container">
      <div className="carts-container-items">
        {carts.map((cart) => {
          return (
            <Card style={{ width: "18rem" }} key={cart.id}>
              <Card.Img variant="top" src='./image-alignment-150x150.jpg' />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b> ${cart.price.toFixed(2)}</b>
                </Card.Text>

                <Button
                  variant="outline-danger"
                  onClick={() =>
                    setCarts(carts.filter((c) => c.id !== cart.id))
                  }
                >
                  Remove from Carts
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4>
        Items: {carts.length} items - Total Price: $
        {carts.reduce((prev, cart) => {
          return prev + cart.price;
        }, 0).toFixed(2)}
      </h4>
      <Button variant="warning">Checkout&nbsp;<i className="bi bi-credit-card"></i></Button>
    </div>
  );
};

export default Carts;
