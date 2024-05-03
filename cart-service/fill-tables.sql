INSERT INTO carts (user_id) VALUES
	('b3209f52-9fc6-416e-81d7-f786c447f11f');

CREATE OR REPLACE FUNCTION get_last_order_id()
	RETURNS UUID
	LANGUAGE plpgsql
AS
$$
DECLARE
	new_cart_id UUID;
BEGIN
	SELECT id INTO new_cart_id FROM carts ORDER BY created_at ASC LIMIT 1;

	RETURN new_cart_id;
END;
$$;

INSERT INTO cart_items (cart_id, product_id, count) VALUES
	(get_last_order_id(), 'e9b00195-4b40-4a7e-8d40-99d68eb1e725', 1),
	(get_last_order_id(), '57bcf595-9c7c-4d68-ba90-d7a7631952ef', 2);

SELECT * FROM carts as ca JOIN cart_items as ci ON ca.id = ci.cart_id;
