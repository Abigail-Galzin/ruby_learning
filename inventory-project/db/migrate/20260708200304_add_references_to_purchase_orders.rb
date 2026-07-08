class AddReferencesToPurchaseOrders < ActiveRecord::Migration[8.1]
  def change
    add_reference :purchase_orders, :product, null: false, foreign_key: true
    add_reference :purchase_orders, :provider, null: false, foreign_key: true
  end
end
