const Cart = require("../models/Cart");

exports.addToCart = (req, res) => {
  // console.log(req.body);
  req.body.user = req.profile;

  Cart.findOne({ user: req.body.user._id }).exec((err, cart) => {
    console.log(cart);
    if (err) {
      return res.status(400).json({
        error: "11 error saving Product In Cart " + err,
      });
    }
    if (!cart) {
      const cart = new Cart(req.body);
      cart.save((err, cart) => {
        if (err) {
          return res.status(400).json({
            error: "19 error saving Product In Cart " + err,
          });
        }
        console.log("success");
        return res.json(cart);
      });
    } else {
      console.log(cart.products);

      req.body.products.map((prod) => {
        console.log(prod);
        cart.products.push({
          product: prod.product,
          size: prod.size,
          quantity: prod.quantity,
        });
      });
      //   console.log(prod);
      //   cart.products.push({ product: prod });
      // });
      cart.save((err, cart) => {
        if (err) {
          return res.status(400).json({
            error: "33 error saving Product In Cart " + err,
          });
        }
        console.log("success");
        return res.json(cart);
      });
    }
  });
};
exports.removeFromCart = (req, res) => {
  const id = req.params.productid;
  req.body.user = req.profile;

  Cart.findOneAndUpdate(
    { user: req.body.user },
    { $pull: { products: { _id: id } } },
    (err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "61 error deleting Product In Cart " + err,
        });
      }
      return res.json(cart);
    }
  );
};

exports.getCart = (req, res) => {
  const id = req.profile._id;
  Cart.findOne({ user: id })
    .populate("products.product")
    .exec((err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "Your Cart is Empty" + err,
        });
      }
      res.json(cart);
    });
};

exports.updateQuantity = (req, res) => {};
