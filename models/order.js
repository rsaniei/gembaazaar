import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	orderItems: [
		{
			title: { type: String, required: true },
			price: { type: Number, required: true },
			qty: { type: Number, required: true },
		},
	],
	shippingData: {
		deliveryOption: { type: String, required: true },
		firstname: {
			type: String,
			required: function () {
				return this.shippingData.deliveryOption === "Home delivery";
			},
		},
		lastname: {
			type: String,
			required: function () {
				return this.shippingData.deliveryOption === "Home delivery";
			},
		},
		address: {
			type: String,
			required: function () {
				return this.shippingData.deliveryOption === "Home delivery";
			},
		},
		addressExtra: {
			type: String,
			required: function () {
				return this.shippingData.deliveryOption === "Home delivery";
			},
		},
		city: {
			type: String,
			required: function () {
				return this.shippingData.deliveryOption === "Home delivery";
			},
		},
		postalCode: {
			type: String,
			required: function () {
				return this.shippingData.deliveryOption === "Home delivery";
			},
		},
		phone: {
			type: String,
			required: false,
		},
	},
	paymentMethod: { type: String, required: true },
	totalPrice: { type: Number, required: true },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
